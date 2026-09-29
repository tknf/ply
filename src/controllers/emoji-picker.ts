import { Controller } from "@hotwired/stimulus";

/**
 * 絵文字の板。打った言葉で絵文字を絞り、格子の中を矢印で移り、押すかEnterで選ぶ。
 * 格子へTabで入る所は一か所だけにし（roving tabindex）、選ぶとemoji-picker:pickを出す。
 */
export class EmojiPickerController extends Controller<HTMLElement> {
  static targets = ["input", "group", "emoji", "empty"];
  declare readonly inputTarget: HTMLInputElement;
  declare readonly groupTargets: HTMLElement[];
  declare readonly emojiTargets: HTMLButtonElement[];
  declare readonly emptyTarget: HTMLElement;

  private visible = () => this.emojiTargets.filter((emoji) => !emoji.hidden);

  private focus = (emoji: HTMLButtonElement | undefined) => {
    if (!emoji) return;
    for (const other of this.emojiTargets) other.tabIndex = other === emoji ? 0 : -1;
    emoji.focus();
  };

  /** 一行に並ぶ数。格子の列の数を実際の位置から数え、狭い場所で列が減っても上下の移りを合わせる。 */
  private columns = (visible: HTMLButtonElement[]) => {
    const top = visible[0]?.offsetTop;
    const count = visible.findIndex((emoji) => emoji.offsetTop !== top);
    return count > 0 ? count : visible.length;
  };

  filter = () => {
    const query = this.inputTarget.value.trim().toLocaleLowerCase();
    for (const emoji of this.emojiTargets)
      emoji.hidden = query !== "" && !(emoji.dataset.search ?? "").includes(query);
    for (const group of this.groupTargets)
      group.hidden = !group.querySelector("[data-emoji-picker-target='emoji']:not([hidden])");
    const visible = this.visible();
    this.emptyTarget.hidden = visible.length > 0;
    const first = visible[0];
    for (const emoji of this.emojiTargets) emoji.tabIndex = emoji === first ? 0 : -1;
  };

  move = (event: KeyboardEvent) => {
    const current = event.target;
    if (!(current instanceof HTMLButtonElement)) return;
    const visible = this.visible();
    const index = visible.indexOf(current);
    if (index < 0) return;
    const rtl = getComputedStyle(this.element).direction === "rtl";
    const columns = this.columns(visible);
    const step: Record<string, number> = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
      ArrowDown: columns,
      ArrowUp: -columns,
    };
    if (event.key in step) {
      event.preventDefault();
      const next = Math.min(Math.max(index + (step[event.key] ?? 0), 0), visible.length - 1);
      this.focus(visible[next]);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      this.focus(event.key === "Home" ? visible[0] : visible.at(-1));
    }
  };

  pick = (event: Event) => {
    const emoji = event.currentTarget;
    if (!(emoji instanceof HTMLButtonElement)) return;
    this.dispatch("pick", {
      detail: { emoji: emoji.dataset.emoji, name: emoji.getAttribute("aria-label") },
    });
  };
}
