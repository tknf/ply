import { classes, type ElementProps } from "./types";
import { getProgressState } from "../internal/progress";

export type ProgressProps = ElementProps<"label"> & { label: string; value?: number; max?: number };
export const Progress = ({
  label,
  value,
  max = 100,
  class: className,
  ...attributes
}: ProgressProps) => {
  const {
    limit,
    current,
    percentage,
    complete,
    label: percentageLabel,
  } = getProgressState(value, max);
  return (
    <label {...attributes} class={classes("ply-progress", className)}>
      <span class="heading">
        <span>{label}</span>
        {percentageLabel !== undefined && (
          <span class="value" aria-hidden="true">
            {percentageLabel}
          </span>
        )}
      </span>
      <span
        class="track"
        data-state={
          percentage === undefined ? "indeterminate" : complete ? "complete" : "determinate"
        }
        aria-hidden="true"
      >
        <span
          class="fill"
          style={percentage === undefined ? undefined : `inline-size: ${percentage}%`}
        />
      </span>
      <progress class="ply-visually-hidden" value={current} max={limit}>
        {percentageLabel ?? "処理中"}
      </progress>
    </label>
  );
};
