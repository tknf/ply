import { useId } from "hono/jsx";
import { Field, Input } from "./field";
import { Icon } from "./icon";
import type { ElementProps } from "./types";

export type SuggestionProps = Omit<ElementProps<"input">, "list" | "type" | "role" | "children"> & {
  label: string;
  options: readonly string[];
  help?: string;
  error?: string;
};

export const Suggestion = ({
  id,
  label,
  options,
  help,
  error,
  "aria-describedby": describedBy,
  ...attributes
}: SuggestionProps) => {
  const generatedId = useId();
  const inputId = id ?? `ply-suggestion-${generatedId}`;
  const candidates = [...new Set(options.filter((option) => option.trim() !== ""))];
  return (
    <Field id={inputId} label={label} help={help} error={error} describedBy={describedBy}>
      {(field) => (
        <div class="ply-combobox ply-suggestion" data-controller="suggestion" dir={attributes.dir}>
          <Input
            {...attributes}
            {...field}
            aria-invalid={field["aria-invalid"] ?? attributes["aria-invalid"]}
            data-invalid={field["data-invalid"] ?? attributes["data-invalid"]}
            type="text"
            autocomplete="off"
            list={`${inputId}-options`}
            data-suggestion-target="input"
          />
          <button
            class="ply-field-toggle"
            type="button"
            aria-label={`${label}の候補を開閉`}
            aria-haspopup="listbox"
            aria-controls={`${inputId}-listbox`}
            disabled={attributes.disabled || attributes.readonly}
            hidden
          >
            <Icon name="caret" />
          </button>
          <ul
            class="ply-combobox-options"
            id={`${inputId}-listbox`}
            role="listbox"
            aria-label={`${label}の候補`}
            data-suggestion-target="listbox"
            hidden
          >
            {candidates.map((option, index) => (
              <li
                id={`${inputId}-option-${index}`}
                role="option"
                aria-selected="false"
                data-suggestion-target="option"
                data-combobox-value={option}
              >
                {option}
              </li>
            ))}
          </ul>
          <p class="ply-suggestion-note" role="status" />
          <datalist id={`${inputId}-options`}>
            {candidates.map((option) => (
              <option value={option} />
            ))}
          </datalist>
        </div>
      )}
    </Field>
  );
};
