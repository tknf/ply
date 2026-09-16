import { classes, type ElementProps } from "./types";

export type StatisticProps = ElementProps<"dl"> & {
  label: string;
  value: string;
  unit?: string;
  note?: string;
};
export const Statistic = ({
  label,
  value,
  unit,
  note,
  class: className,
  ...attributes
}: StatisticProps) => (
  <dl {...attributes} class={classes("ply-statistic", className)}>
    <dt>{label}</dt>
    <dd class="value">
      {value}
      {unit && <small>{unit}</small>}
    </dd>
    {note && <dd class="note">{note}</dd>}
  </dl>
);
