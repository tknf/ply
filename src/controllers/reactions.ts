import { Controller } from "@hotwired/stimulus";

const readBy = (value: string | undefined): string[] => {
  const parsed: unknown = JSON.parse(value ?? "[]");
  return Array.isArray(parsed) ? parsed.filter((name) => typeof name === "string") : [];
};

/** reactions:beforetoggle・reactions:toggleのdetail。 */
type ToggleDetail = { content: string; name: string; selected: boolean };

/**
 * 反応の付け外し。札を押すと自分の反応を付けるか外し、数と付けた人を書き換える。
 * EmojiPickerで選んだ絵文字や書いた言葉は、同じ札があればそこへ自分を足し、なければ新しい札を作る。
 * どちらも書き換える前にreactions:beforetoggle（取り消せる）、書き換えた後にreactions:toggleで知らせる。
 * 数が0になった札は消す。保存は利用側が持ち、失敗した時はsetReactionで札を戻す。
 */
export class ReactionsController extends Controller<HTMLElement> {
  static targets = ["list", "text"];
  static values = { me: String };
  declare readonly listTarget: HTMLUListElement;
  declare readonly textTarget: HTMLInputElement;
  declare readonly hasTextTarget: boolean;
  declare readonly meValue: string;

  private render = (chip: HTMLButtonElement, by: string[], mine: boolean) => {
    const names = by.join("、");
    const content = chip.dataset.content ?? "";
    chip.dataset.by = JSON.stringify(by);
    chip.setAttribute("aria-pressed", mine ? "true" : "false");
    chip.dataset.mine = mine ? "true" : "false";
    chip.setAttribute("aria-label", `${chip.dataset.name ?? content}：${names}`);
    chip.title = names;
    const count = chip.querySelector(".count");
    if (count) count.textContent = String(by.length);
  };

  /**
   * 札に自分を足すか引く。札が無ければ作り、数が0になれば消す。消した札にフォーカスがあった時か、
   * 利用者の操作の時（focusNext）は、次の札か追加の操作へフォーカスを移す。
   */
  private apply = (
    content: string,
    name: string,
    mine: boolean,
    focusNext: boolean,
  ): HTMLButtonElement | null => {
    const found = this.chips().find((chip) => chip.dataset.content === content);
    if (!found && !mine) return null;
    const chip = found ?? this.create(content, name);
    const others = readBy(chip.dataset.by).filter((person) => person !== this.meValue);
    const by = mine ? [...others, this.meValue] : others;
    if (by.length === 0) {
      const item = chip.closest("li");
      const focused = focusNext || chip === document.activeElement;
      const next = item?.nextElementSibling?.querySelector("button") ?? this.trigger();
      item?.remove();
      if (focused) next?.focus();
      return null;
    }
    this.render(chip, by, mine);
    return chip;
  };

  /** 利用者の操作を知らせる。beforetoggleが取り消されたらfalseを返し、何も変えない。 */
  private request = (detail: ToggleDetail) =>
    !this.dispatch("beforetoggle", { detail, cancelable: true }).defaultPrevented;

  private trigger = () =>
    this.element.querySelector<HTMLButtonElement>(".ply-popover > .ply-button");

  private chips = () => [...this.listTarget.querySelectorAll<HTMLButtonElement>("button.reaction")];

  /**
   * 自分の反応を、イベントを出さずに付ける（selected: true）か外す。保存に失敗した時に、
   * reactions:toggleのdetail（content・name・selectedの逆）で札を元に戻すために使う。
   */
  setReaction = (content: string, selected: boolean, name = content) => {
    if (content !== "") this.apply(content, name, selected, false);
  };

  toggle = (event: Event) => {
    const chip = event.currentTarget;
    if (!(chip instanceof HTMLButtonElement)) return;
    const content = chip.dataset.content ?? "";
    const detail = {
      content,
      name: chip.dataset.name ?? content,
      selected: chip.dataset.mine !== "true",
    };
    if (!this.request(detail)) return;
    this.apply(detail.content, detail.name, detail.selected, true);
    this.dispatch("toggle", { detail });
  };

  pick = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const detail: unknown = event.detail;
    if (typeof detail !== "object" || detail === null || !("emoji" in detail)) return;
    const content = typeof detail.emoji === "string" ? detail.emoji : "";
    const name = "name" in detail && typeof detail.name === "string" ? detail.name : content;
    this.react(content, name, event.target);
  };

  /** 短い言葉の反応。空なら何もしない。日本語入力の確定のEnterでは追加しない。 */
  addText = (event: Event) => {
    if (!this.hasTextTarget) return;
    if (event instanceof KeyboardEvent) {
      if (event.isComposing) return;
      event.preventDefault();
    }
    const content = this.textTarget.value.trim();
    this.react(content, content, event.target);
    if (content !== "") this.textTarget.value = "";
  };

  private react = (content: string, name: string, source: EventTarget | null) => {
    if (content === "") return;
    if (source instanceof Element) source.closest<HTMLElement>("[popover]")?.hidePopover();
    const found = this.chips().find((chip) => chip.dataset.content === content);
    if (found?.dataset.mine === "true") {
      found.focus();
      return;
    }
    const detail = { content, name: found?.dataset.name ?? name, selected: true };
    if (!this.request(detail)) return;
    const chip = this.apply(content, detail.name, true, false);
    this.dispatch("toggle", { detail });
    chip?.focus();
  };

  /** 新しい札。サーバーが出す札と同じ形をここで組み、一覧の終わりに追加する。 */
  private create = (content: string, name: string) => {
    const item = document.createElement("li");
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "reaction";
    chip.dataset.content = content;
    chip.dataset.name = name;
    chip.dataset.by = "[]";
    chip.dataset.action = "reactions#toggle";
    const part = (className: string, text: string) => {
      const span = document.createElement("span");
      span.className = className;
      span.setAttribute("aria-hidden", "true");
      span.textContent = text;
      return span;
    };
    chip.append(part("content", content), part("count", "0"));
    item.append(chip);
    this.listTarget.append(item);
    return chip;
  };
}
