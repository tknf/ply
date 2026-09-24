import { Input } from "./field";
import { Icon } from "./icon";
import type { ElementProps } from "./types";

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type ComboboxProps = Omit<ElementProps<"input">, "type" | "role"> & {
  id: string;
  options: readonly ComboboxOption[];
  toggleLabel?: string;
  listLabel?: string;
};

export const Combobox = ({
  id,
  options,
  toggleLabel = "候補を開閉",
  listLabel = "候補",
  ...attributes
}: ComboboxProps) => (
  <div
    class="ply-combobox"
    data-controller="combobox"
    data-combobox-autocomplete-value="none"
    data-action="combobox:change->combobox#hide"
  >
    <Input
      {...attributes}
      id={id}
      type="text"
      role="combobox"
      aria-expanded="false"
      aria-controls={`${id}-options`}
      aria-autocomplete="none"
      autocomplete="off"
      data-combobox-target="input"
      data-action="click->combobox#show"
    />
    <button
      class="toggle"
      type="button"
      aria-label={toggleLabel}
      aria-haspopup="listbox"
      aria-controls={`${id}-options`}
      data-action="click->combobox#toggle"
      disabled={attributes.disabled || attributes.readonly}
    >
      <Icon name="caret" />
    </button>
    <ul
      class="options"
      id={`${id}-options`}
      role="listbox"
      aria-label={listLabel}
      hidden
      data-combobox-target="listbox"
    >
      {options.map((option, index) => (
        <li
          id={`${id}-option-${index}`}
          role="option"
          aria-selected="false"
          aria-disabled={option.disabled ? "true" : undefined}
          data-combobox-target="option"
          data-combobox-value={option.value}
        >
          {option.label}
        </li>
      ))}
    </ul>
  </div>
);
