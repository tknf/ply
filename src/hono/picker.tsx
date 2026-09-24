import { useId } from "hono/jsx";
import { Icon } from "./icon";
import { Input, Select } from "./field";
import { Button } from "./button";
import { Tag } from "./tag";

export type PickerOption = { value: string; label: string; disabled?: boolean };
export type PickerProps = {
  id?: string;
  label: string;
  name: string;
  options: readonly PickerOption[];
  value?: string | readonly string[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  help?: string;
  error?: string;
  placeholder?: string;
  form?: string;
};

/** 選択値は標準selectが送信し、検索欄は選択のためだけに使う。 */
export const Picker = ({
  id,
  label,
  name,
  options,
  value,
  multiple = false,
  required,
  disabled,
  help,
  error,
  placeholder = "候補を検索",
  form,
}: PickerProps) => {
  const generatedId = useId();
  const controlId = id ?? `ply-picker-${generatedId}`;
  const selectedValues = new Set(typeof value === "string" ? [value] : (value ?? []));
  const seen = new Set<string>();
  const candidates = options.filter((option) => {
    if (option.value.trim() === "" || seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
  const describedBy = [help ? `${controlId}-help` : "", error ? `${controlId}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      class="ply-combobox ply-picker"
      data-controller="combobox picker"
      data-combobox-multiple-value="true"
      data-combobox-selected-value={JSON.stringify([...selectedValues])}
      data-picker-multiple-value={multiple}
      data-action="combobox:change->picker#selectionChanged"
    >
      <label
        class="label"
        id={`${controlId}-label`}
        for={`${controlId}-native`}
        data-picker-target="label"
      >
        {label}
      </label>
      <Select
        id={`${controlId}-native`}
        class="native"
        name={name}
        form={form}
        multiple={multiple}
        required={required}
        disabled={disabled}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? "true" : undefined}
        data-invalid={error ? "true" : undefined}
        data-picker-target="native"
      >
        {!multiple && <option value="">選択してください</option>}
        {candidates.map((option) => (
          <option
            value={option.value}
            selected={selectedValues.has(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </Select>
      <Input
        id={`${controlId}-search`}
        class="search"
        type="search"
        role="combobox"
        aria-labelledby={`${controlId}-label`}
        aria-controls={`${controlId}-options`}
        aria-expanded="false"
        aria-autocomplete="list"
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? "true" : undefined}
        data-invalid={error ? "true" : undefined}
        autocomplete="off"
        placeholder={placeholder}
        disabled={disabled}
        data-combobox-target="input"
        data-picker-target="search"
        hidden
      />
      <ul class="values" data-picker-target="values" aria-label="選択中" hidden />
      <template data-picker-target="template">
        <li>
          <Tag
            label=""
            removeButton={
              <Button
                class="remove"
                variant="link"
                size="tag"
                data-icon-only="true"
                aria-label="選択を解除"
              />
            }
          />
        </li>
      </template>
      <ul
        class="options"
        id={`${controlId}-options`}
        role="listbox"
        aria-label={`${label}の候補`}
        data-combobox-target="listbox"
        data-picker-target="listbox"
        hidden
      >
        {candidates.map((option, index) => (
          <li
            id={`${controlId}-option-${index}`}
            role="option"
            aria-selected={selectedValues.has(option.value) ? "true" : "false"}
            aria-disabled={option.disabled ? "true" : undefined}
            data-combobox-target="option"
            data-picker-target="option"
            data-combobox-value={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <p class="note" data-picker-target="note" role="status" hidden>
        一致する候補はありません。
      </p>
      {(help || error) && (
        <div class="messages">
          {help && (
            <p class="help" id={`${controlId}-help`}>
              {help}
            </p>
          )}
          {error && (
            <p class="error" id={`${controlId}-error`}>
              <Icon name="x-circle" />
              <span>{error}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
