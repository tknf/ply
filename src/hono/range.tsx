import { useId } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type RangeProps = Omit<ElementProps<"input">, "type" | "value" | "children"> & {
  label: string;
  min: number;
  max: number;
  value?: number | readonly [number, number];
  unit?: string;
};

const isInterval = (value: RangeProps["value"]): value is readonly [number, number] =>
  Array.isArray(value);

export const Range = ({
  id,
  label,
  min,
  max,
  value,
  unit = "",
  name,
  disabled,
  class: className,
  ...attributes
}: RangeProps) => {
  const generatedId = useId();
  const rangeId = id ?? `ply-range-${generatedId}`;
  const labelId = `${rangeId}-label`;
  const interval = isInterval(value);
  const entries = interval
    ? [
        { id: `${rangeId}-start`, bound: "start", label: "下限", value: value[0] },
        { id: `${rangeId}-end`, bound: "end", label: "上限", value: value[1] },
      ]
    : [{ id: rangeId, bound: "value", label, value }];
  const root = {
    class: classes("ply-range", className),
    "data-controller": "range",
    "data-mode": interval ? "interval" : "single",
  };
  const controls = (
    <div class="ply-range-controls">
      {entries.map((entry) => (
        <div class="ply-range-native">
          {interval && (
            <label class="ply-range-track-label" id={`${entry.id}-label`} for={entry.id}>
              {entry.label}
            </label>
          )}
          <input
            {...attributes}
            id={entry.id}
            class="ply-range-input"
            type="range"
            min={min}
            max={max}
            name={name ? (interval ? `${name}-${entry.bound}` : name) : undefined}
            value={entry.value}
            disabled={disabled}
            aria-labelledby={interval ? `${labelId} ${entry.id}-label` : labelId}
            data-range-target="input"
          />
        </div>
      ))}
    </div>
  );
  const limits = (
    <div class="ply-range-limits" aria-hidden="true">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  );

  if (interval) {
    return (
      <fieldset {...root} disabled={disabled} dir={attributes.dir}>
        <legend class="ply-field-label" id={labelId}>
          {label}
        </legend>
        {controls}
        {limits}
        <div class="ply-range-values" hidden>
          {entries.map((entry) => (
            <label class="ply-field" for={`${entry.id}-number`}>
              <span class="ply-field-label" id={`${entry.id}-number-label`}>
                {entry.label}
              </span>
              <input
                class="ply-input"
                type="number"
                id={`${entry.id}-number`}
                aria-labelledby={`${labelId} ${entry.id}-number-label`}
                min={min}
                max={max}
                step={attributes.step}
                value={entry.value}
                form={attributes.form}
                disabled={disabled}
                data-range-bound={entry.bound}
              />
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <div {...root} dir={attributes.dir}>
      <div class="ply-range-heading">
        <label class="ply-field-label" for={rangeId} id={labelId}>
          {label}
        </label>
        <output
          class="ply-range-value"
          for={rangeId}
          data-range-unit={unit}
          aria-live="off"
          hidden
        />
      </div>
      {controls}
      {limits}
    </div>
  );
};
