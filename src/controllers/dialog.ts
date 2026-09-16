import { DialogController as BaseDialogController } from "@tknf/stimulus-ui";

/** closedby未対応環境にだけ、native backdropのクリックで閉じる処理を補う。 */
export class DialogController extends BaseDialogController {
  private backdropStart: HTMLDialogElement | null = null;

  constructor(...args: ConstructorParameters<typeof BaseDialogController>) {
    super(...args);
    const connectDialog = this.connect;
    const disconnectDialog = this.disconnect;
    this.connect = () => {
      connectDialog();
      this.element.addEventListener("pointerdown", this.startBackdrop);
      this.element.addEventListener("pointercancel", this.resetBackdrop);
      this.element.addEventListener("click", this.closeFromBackdrop);
    };
    this.disconnect = () => {
      this.element.removeEventListener("pointerdown", this.startBackdrop);
      this.element.removeEventListener("pointercancel", this.resetBackdrop);
      this.element.removeEventListener("click", this.closeFromBackdrop);
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
}
