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
  private savedTask: number | undefined;

  connect = () => {
    this.form = this.inputTarget.form;
    this.form?.addEventListener("reset", this.afterReset);
  };

  disconnect = () => {
    this.form?.removeEventListener("reset", this.afterReset);
    window.clearTimeout(this.resetTask);
    window.clearTimeout(this.savedTask);
    delete this.element.dataset.saved;
    this.form = null;
  };

  /** 確定した値を表示へ移し、書き終えた印をしばらく出す。 */
  commit = () => {
    this.sync();
    window.clearTimeout(this.savedTask);
    delete this.element.dataset.saved;
    // 続けて確定した時も印を描き直すため、属性を外した状態を一度描画させる。
    void this.element.offsetWidth;
    this.element.dataset.saved = "true";
    this.savedTask = window.setTimeout(() => delete this.element.dataset.saved, 1600);
  };

  sync = () => {
    this.valueTarget.textContent = this.inputTarget.value || this.emptyValue;
    if (this.inputTarget.value) delete this.valueTarget.dataset.empty;
    else this.valueTarget.dataset.empty = "true";
  };

  private afterReset = (event: Event) => {
    window.clearTimeout(this.resetTask);
    this.resetTask = window.setTimeout(() => {
      if (!event.defaultPrevented) this.sync();
    }, 0);
  };
}
