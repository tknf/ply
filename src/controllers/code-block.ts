import { Controller } from "@hotwired/stimulus";
import { ToastController } from "@tknf/stimulus-ui";

/** コピー自体はstimulus-uiに任せ、利用可否と結果の表示を受け持つ。 */
export class CodeBlockController extends Controller<HTMLElement> {
  private notification: HTMLElement | null = null;
  private timer: number | null = null;
  connect = () => {
    const button = this.element.querySelector('[data-code-block-target="copy"]');
    if (button instanceof HTMLButtonElement) button.hidden = !navigator.clipboard?.writeText;
    this.notification = this.element.querySelector<HTMLElement>(":scope > .ply-toast");
    this.notification?.addEventListener("beforetoggle", this.toggled);
    this.element.addEventListener("clipboard:copy", this.copied);
    this.element.addEventListener("keydown", this.dismiss);
    document.addEventListener("turbo:before-cache", this.hide);
  };
  disconnect = () => {
    this.hide();
    this.notification?.removeEventListener("beforetoggle", this.toggled);
    this.element.removeEventListener("clipboard:copy", this.copied);
    this.element.removeEventListener("keydown", this.dismiss);
    document.removeEventListener("turbo:before-cache", this.hide);
  };
  private clearTimer = () => {
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = null;
  };
  private toast = () => {
    if (!this.notification) return null;
    const controller = this.application.getControllerForElementAndIdentifier(
      this.notification,
      "toast",
    );
    return controller instanceof ToastController ? controller : null;
  };
  private hide = () => {
    this.clearTimer();
    if (!this.notification?.matches(":popover-open")) return;
    const toast = this.toast();
    if (toast) toast.hide();
    else this.notification.hidePopover();
  };
  private toggled = (event: Event) => {
    if (!(event instanceof ToggleEvent) || event.newState !== "closed") return;
    this.clearTimer();
    if (this.notification?.contains(document.activeElement))
      this.element
        .querySelector<HTMLButtonElement>('[data-code-block-target="copy"]')
        ?.focus({ preventScroll: true });
  };
  private dismiss = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || event.isComposing || !this.notification?.matches(":popover-open"))
      return;
    event.preventDefault();
    this.hide();
  };
  private scheduleHide = () => {
    this.clearTimer();
    this.timer = window.setTimeout(() => {
      if (this.notification?.matches(":hover, :focus-within")) this.scheduleHide();
      else this.hide();
    }, 4000);
  };
  private copied = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const detail: unknown = event.detail;
    if (
      !detail ||
      typeof detail !== "object" ||
      !("ok" in detail) ||
      typeof detail.ok !== "boolean"
    )
      return;
    const status = this.element.querySelector('[data-code-block-target="status"]');
    if (!status || !this.notification) return;
    this.clearTimer();
    for (const other of document.querySelectorAll<HTMLElement>(
      ".ply-code-block > .ply-toast:popover-open",
    )) {
      if (other === this.notification) continue;
      const controller = this.application.getControllerForElementAndIdentifier(other, "toast");
      if (controller instanceof ToastController) controller.hide();
      else other.hidePopover();
    }
    const label = this.element.querySelector("figcaption > .label")?.textContent ?? "コード";
    status.textContent = detail.ok
      ? `${label}をコピーしました`
      : "コピーできませんでした。コードを選択してコピーしてください。";
    if (!this.notification.matches(":popover-open")) {
      const toast = this.toast();
      if (toast) toast.show();
      else this.notification.showPopover();
    }
    if (detail.ok) this.scheduleHide();
  };
}
