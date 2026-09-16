import { Input } from "./field";
import { Icon } from "./icon";
import type { ElementProps } from "./types";

export type PasswordFieldProps = Omit<ElementProps<"input">, "type"> & {
  id: string;
  showLabel?: string;
  hideLabel?: string;
};

export const PasswordField = ({
  id,
  showLabel = "パスワードを表示",
  hideLabel = "パスワードを隠す",
  ...attributes
}: PasswordFieldProps) => (
  <div
    class="ply-password"
    data-controller="password-field"
    data-password-field-show-label-value={showLabel}
    data-password-field-hide-label-value={hideLabel}
  >
    <Input {...attributes} id={id} type="password" data-password-field-target="input" />
    <button
      class="toggle"
      type="button"
      disabled={attributes.disabled}
      data-password-field-target="toggle"
      data-state="hidden"
      aria-controls={id}
    >
      <span class="show">
        <Icon name="eye" />
      </span>
      <span class="hide">
        <Icon name="eye-slash" />
      </span>
    </button>
  </div>
);
