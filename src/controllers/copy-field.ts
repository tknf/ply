import { Controller } from "@hotwired/stimulus";

/** 写す動きはClipboardControllerに任せ、写した時の印の切り替えと読み上げを受け持つ。 */
export class CopyFieldController extends Controller<HTMLElement> {
  static targets = ["trigger", "status"];
  static values = { copied: String };
  declare readonly triggerTarget: HTMLButtonElement;
  declare readonly statusTarget: HTMLElement;
  declare readonly copiedValue: string;
  private timer: number | null = null;

  connect = () => {
    this.triggerTarget.hidden = !navigator.clipboard?.writeText;
    this.element.addEventListener("clipboard:copy", this.copied);
  };
  disconnect = () => {
    this.element.removeEventListener("clipboard:copy", this.copied);
    if (this.timer !== null) window.clearTimeout(this.timer);
  };
  /** 欄にフォーカスしたら値を全て選び、キーボードでも写せるようにする。 */
  select = (event: Event) => {
    if (event.target instanceof HTMLInputElement) event.target.select();
  };
  private copied = (event: Event) => {
    if (!(event instanceof CustomEvent) || !event.detail?.ok) return;
    this.element.dataset.copied = "true";
    this.statusTarget.textContent = this.copiedValue;
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      delete this.element.dataset.copied;
      this.statusTarget.textContent = "";
    }, 1800);
  };
}
