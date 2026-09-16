import { classes, type ElementProps } from "./types";

export type ProgressProps = ElementProps<"label"> & { label: string; value?: number; max?: number };
export const Progress = ({
  label,
  value,
  max = 100,
  class: className,
  ...attributes
}: ProgressProps) => {
  // native progressの範囲に揃え、表示文言とブラウザの値を一致させる。
  const limit = Number.isFinite(max) && max > 0 ? max : 1;
  const current =
    value !== undefined && Number.isFinite(value) ? Math.min(limit, Math.max(0, value)) : undefined;
  const percentage = current === undefined ? undefined : Math.round((current / limit) * 100);
  return (
    <label {...attributes} class={classes("ply-progress", className)}>
      <span class="heading">
        <span>{label}</span>
        {percentage !== undefined && (
          <span class="value" aria-hidden="true">
            {percentage}%
          </span>
        )}
      </span>
      <progress value={current} max={limit}>
        {percentage === undefined ? "処理中" : `${percentage}%`}
      </progress>
    </label>
  );
};
