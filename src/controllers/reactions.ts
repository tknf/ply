import { Controller } from "@hotwired/stimulus";

const readBy = (value: string | undefined): string[] => {
  const parsed: unknown = JSON.parse(value ?? "[]");
  return Array.isArray(parsed) ? parsed.filter((name) => typeof name === "string") : [];
};

/**
 * 反応の付け外し。札を押すと自分の反応を付けるか外し、数と付けた人を書き換える。
 * EmojiPickerで選んだ絵文字や書いた言葉は、同じ札があればそこへ自分を足し、なければ新しい札を作る。
 * どちらもreactions:toggleで内容と付けたかどうかを知らせる。数が0になった札は消す。
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

  private set = (chip: HTMLButtonElement, mine: boolean) => {
    const others = readBy(chip.dataset.by).filter((name) => name !== this.meValue);
    const by = mine ? [...others, this.meValue] : others;
    this.dispatch("toggle", { detail: { content: chip.dataset.content, selected: mine } });
    if (by.length === 0) {
      const item = chip.closest("li");
      const next = item?.nextElementSibling?.querySelector("button") ?? this.trigger();
      item?.remove();
      next?.focus();
      return;
    }
    this.render(chip, by, mine);
  };

  private trigger = () =>
    this.element.querySelector<HTMLButtonElement>(".ply-popover > .ply-button");

  private chips = () => [...this.listTarget.querySelectorAll<HTMLButtonElement>("button.reaction")];

  toggle = (event: Event) => {
    const chip = event.currentTarget;
    if (chip instanceof HTMLButtonElement) this.set(chip, chip.dataset.mine !== "true");
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
    if (found) {
      if (found.dataset.mine !== "true") this.set(found, true);
      found.focus();
      return;
    }
    const chip = this.create(content, name);
    this.set(chip, true);
    chip.focus();
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
