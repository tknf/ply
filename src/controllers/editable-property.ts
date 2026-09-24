import { Controller } from "@hotwired/stimulus";

/** 上流Editableの確定値を表示へ反映する。 */
export class EditablePropertyController extends Controller<HTMLElement> {
  static targets = ["input", "value"];
  static values = { empty: String };

  declare readonly inputTarget: HTMLInputElement;
  declare readonly valueTarget: HTMLElement;
  declare readonly emptyValue: string;

  private form: HTMLFormElement | null = null;
  private resetTask: number | undefined;

  connect = () => {
    this.form = this.inputTarget.form;
    this.form?.addEventListener("reset", this.afterReset);
  };

  disconnect = () => {
    this.form?.removeEventListener("reset", this.afterReset);
    window.clearTimeout(this.resetTask);
    this.form = null;
  };

  sync = () => {
    this.valueTarget.textContent = this.inputTarget.value || this.emptyValue;
  };

  private afterReset = (event: Event) => {
    window.clearTimeout(this.resetTask);
    this.resetTask = window.setTimeout(() => {
      if (!event.defaultPrevented) this.sync();
    }, 0);
  };
}
