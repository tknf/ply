import { ComboboxController as BaseComboboxController } from "@tknf/stimulus-ui";

/** 閲覧専用入力の候補操作だけを上流のComboboxから遮断する。 */
export class ComboboxController extends BaseComboboxController {
  constructor(...args: ConstructorParameters<typeof BaseComboboxController>) {
    super(...args);
    const connectBase = this.connect;
    const disconnectBase = this.disconnect;
    this.connect = () => {
      connectBase();
      this.element.addEventListener("click", this.guardReadonly, true);
      this.element.addEventListener("keydown", this.guardReadonly, true);
    };
    this.disconnect = () => {
      this.element.removeEventListener("click", this.guardReadonly, true);
      this.element.removeEventListener("keydown", this.guardReadonly, true);
      disconnectBase();
    };
  }

  private guardReadonly = (event: Event) => {
    const input = this.inputTargets[0];
    if (input && !input.matches(":disabled") && !input.readOnly) return;
    this.open = false;
    event.stopImmediatePropagation();
  };
}
