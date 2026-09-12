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
}: CheckboxGroupProps) => (
  <fieldset
    {...attributes}
    class={classes("ply-choice-group", className)}
    data-controller="checkbox-group"
  >
    <legend>{legend}</legend>
    <div class="ply-choice-list">
      <Choice label={allLabel} data-checkbox-group-target="all" />
      {options.map(({ value, label, description, disabled }) => (
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
  </fieldset>
);
