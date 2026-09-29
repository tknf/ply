import { Controller } from "@hotwired/stimulus";

/** 写す動きはClipboardControllerに任せ、写した時の印の切り替えと読み上げを受け持つ。 */
export class CopyFieldController extends Controller<HTMLElement> {
  static targets = ["trigger", "status", "failure"];
  static values = { copied: String };
  declare readonly triggerTarget: HTMLButtonElement;
  declare readonly statusTarget: HTMLElement;
  declare readonly failureTarget: HTMLElement;
  declare readonly hasFailureTarget: boolean;
  declare readonly copiedValue: string;
  private timer: number | null = null;

  // 写す印はJavaScriptが無いと押しても何も起きないので、接続してから出す。
  connect = () => {
    this.triggerTarget.hidden = !navigator.clipboard?.writeText;
    this.element.addEventListener("clipboard:beforecopy", this.clearFailure);
    this.element.addEventListener("clipboard:copy", this.copied);
  };
  disconnect = () => {
    this.element.removeEventListener("clipboard:beforecopy", this.clearFailure);
    this.element.removeEventListener("clipboard:copy", this.copied);
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = null;
    delete this.element.dataset.copied;
    this.clearFailure();
    this.triggerTarget.hidden = true;
  };
  /** 欄にフォーカスしたら値を全て選び、キーボードでも写せるようにする。 */
  select = (event: Event) => {
    if (event.target instanceof HTMLInputElement) event.target.select();
  };
  private clearFailure = () => {
    if (this.hasFailureTarget) this.failureTarget.hidden = true;
    this.statusTarget.textContent = "";
  };
  private copied = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    if (!event.detail?.ok) {
      // 写せなかった時は、印を変えずに欄の下へ理由と写す方法を出し、読み上げる。
      if (this.timer !== null) window.clearTimeout(this.timer);
      this.timer = null;
      delete this.element.dataset.copied;
      if (!this.hasFailureTarget) return;
      this.failureTarget.hidden = false;
      this.statusTarget.textContent = this.failureTarget.textContent?.trim() ?? "";
      return;
    }
    this.clearFailure();
    this.element.dataset.copied = "true";
    this.statusTarget.textContent = this.copiedValue;
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      delete this.element.dataset.copied;
      this.statusTarget.textContent = "";
    }, 1800);
  };
}
