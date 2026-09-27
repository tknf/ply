import { DialogController as BaseDialogController } from "@tknf/stimulus-ui";

type Swipe = { pointerId: number; startY: number; startTime: number; offset: number };

/**
 * closedby未対応環境にだけ、native backdropのクリックで閉じる処理を補う。
 * 画面の下に付くシート（CSSの--ply-dialog-sheet）では、ハンドルと見出しを下へ引いて閉じられるようにする。
 */
export class DialogController extends BaseDialogController {
  private backdropStart: HTMLDialogElement | null = null;
  private swipe: Swipe | null = null;

  constructor(...args: ConstructorParameters<typeof BaseDialogController>) {
    super(...args);
    const connectDialog = this.connect;
    const disconnectDialog = this.disconnect;
    this.connect = () => {
      connectDialog();
      this.element.addEventListener("pointerdown", this.startBackdrop);
      this.element.addEventListener("pointercancel", this.resetBackdrop);
      this.element.addEventListener("click", this.closeFromBackdrop);
      this.element.addEventListener("pointerdown", this.startSwipe);
      this.element.addEventListener("pointermove", this.moveSwipe);
      this.element.addEventListener("pointerup", this.endSwipe);
      this.element.addEventListener("pointercancel", this.cancelSwipe);
    };
    this.disconnect = () => {
      this.element.removeEventListener("pointerdown", this.startBackdrop);
      this.element.removeEventListener("pointercancel", this.resetBackdrop);
      this.element.removeEventListener("click", this.closeFromBackdrop);
      this.element.removeEventListener("pointerdown", this.startSwipe);
      this.element.removeEventListener("pointermove", this.moveSwipe);
      this.element.removeEventListener("pointerup", this.endSwipe);
      this.element.removeEventListener("pointercancel", this.cancelSwipe);
      this.cancelSwipe();
      this.resetBackdrop();
      disconnectDialog();
    };
  }

  private backdropDialog = (event: MouseEvent) => {
    const dialog = this.element.querySelector<HTMLDialogElement>('[data-dialog-target="dialog"]');
    if (
      !dialog ||
      Reflect.has(dialog, "closedBy") ||
      !dialog.open ||
      !dialog.matches(":modal") ||
      dialog.getAttribute("closedby") !== "any" ||
      event.target !== dialog
    )
      return null;
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
      ? dialog
      : null;
  };

  private startBackdrop = (event: PointerEvent) => {
    this.backdropStart = event.button === 0 ? this.backdropDialog(event) : null;
  };
  private resetBackdrop = () => {
    this.backdropStart = null;
  };
  private closeFromBackdrop = (event: MouseEvent) => {
    const start = this.backdropStart;
    this.resetBackdrop();
    if (event.defaultPrevented || !start || this.backdropDialog(event) !== start) return;
    const detail = { reason: "pointer", returnValue: "" };
    if (
      !this.element.dispatchEvent(
        new CustomEvent("dialog:beforeclose", {
          bubbles: true,
          cancelable: true,
          detail,
        }),
      ) ||
      !start.open
    )
      return;
    this.close();
    this.element.dispatchEvent(new CustomEvent("dialog:close", { bubbles: true, detail }));
  };

  private sheet = () => {
    const dialog = this.element.querySelector<HTMLDialogElement>('[data-dialog-target="dialog"]');
    if (!dialog?.open) return null;
    return getComputedStyle(dialog).getPropertyValue("--ply-dialog-sheet").trim() === "1"
      ? dialog
      : null;
  };

  /** ハンドルのある上端と見出しから引き始めた時だけ扱う。本文のスクロールと操作は妨げない。 */
  private startSwipe = (event: PointerEvent) => {
    const dialog = this.sheet();
    const target = event.target;
    if (!dialog || event.button !== 0 || !(target instanceof Element)) return;
    const fromHandle = target === dialog && event.clientY < dialog.getBoundingClientRect().top + 32;
    const fromHeading =
      target.closest(".heading") !== null &&
      target.closest("button, a, input, select, textarea") === null;
    if (!fromHandle && !fromHeading) return;
    this.swipe = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTime: event.timeStamp,
      offset: 0,
    };
    dialog.setPointerCapture(event.pointerId);
    dialog.dataset.dragging = "true";
  };

  private moveSwipe = (event: PointerEvent) => {
    const dialog = this.sheet();
    if (!dialog || !this.swipe || event.pointerId !== this.swipe.pointerId) return;
    this.swipe.offset = Math.max(0, event.clientY - this.swipe.startY);
    dialog.style.translate = `0 ${this.swipe.offset}px`;
  };

  private endSwipe = (event: PointerEvent) => {
    const swipe = this.swipe;
    const dialog = this.sheet();
    if (!swipe || event.pointerId !== swipe.pointerId) return;
    this.cancelSwipe();
    if (!dialog) return;
    const velocity = swipe.offset / Math.max(1, event.timeStamp - swipe.startTime);
    const far = swipe.offset > Math.min(160, dialog.offsetHeight * 0.3);
    // 触れただけや少しの揺れでは閉じない。
    if (swipe.offset < 24 || (!far && velocity < 0.6)) return;
    const detail = { reason: "swipe", returnValue: "" };
    if (
      !this.element.dispatchEvent(
        new CustomEvent("dialog:beforeclose", { bubbles: true, cancelable: true, detail }),
      )
    )
      return;
    this.close();
    this.element.dispatchEvent(new CustomEvent("dialog:close", { bubbles: true, detail }));
  };

  /** 引いた位置の指定を外すと、閉じる時は下へ、戻す時は元の位置へ、CSSの動きで続く。 */
  private cancelSwipe = () => {
    const dialog = this.element.querySelector<HTMLDialogElement>('[data-dialog-target="dialog"]');
    this.swipe = null;
    if (!dialog) return;
    delete dialog.dataset.dragging;
    dialog.style.removeProperty("translate");
  };
}
