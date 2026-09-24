import { Choice } from "./field";
import { classes, type ElementProps } from "./types";

export type CheckboxGroupOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};
export type CheckboxGroupProps = ElementProps<"fieldset"> & {
  legend: string;
  name: string;
  options: readonly CheckboxGroupOption[];
  selected?: readonly string[];
  allLabel?: string;
};

export const CheckboxGroup = ({
  legend,
  name,
  options,
  selected = [],
  allLabel = "すべて選択",
  class: className,
  ...attributes
}: CheckboxGroupProps) => {
  const seen = new Set<string>();
  const choices = options.filter(({ value }) => {
    if (!value.trim() || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
  return (
    <fieldset
      {...attributes}
      class={classes("ply-choice-group", className)}
      data-controller={choices.length ? "checkbox-group" : undefined}
    >
      <legend>{legend}</legend>
      {choices.length ? (
        <div class="list">
          <Choice label={allLabel} data-checkbox-group-target="all" />
          {choices.map(({ value, label, description, disabled }) => (
            <Choice
              name={name}
              value={value}
              label={label}
              description={description}
              disabled={disabled}
              checked={selected.includes(value)}
              data-checkbox-group-target="item"
              data-checkbox-group-value={value}
            />
          ))}
        </div>
      ) : (
        <p>選択肢はありません。</p>
      )}
    </fieldset>
  );
};
