import { DateField } from "./date-field";
import { Icon } from "./icon";
import { Switch } from "./switch";
import { TimeField } from "./time-field";
import { classes, type ElementProps } from "./types";

type Point = { date?: string; time?: string };
export type DateTimeRangeProps = ElementProps<"fieldset"> & {
  legend: string;
  /** 送る名前の頭。`${name}[start_date]`・`[start_time]`・`[end_date]`・`[end_time]`・`[all_day]`で送る。 */
  name: string;
  start?: Point;
  end?: Point;
  allDay?: boolean;
  /** 渡すと、終わりの側に地球の印とタイムゾーンを添える。 */
  timezone?: string;
  startLabel?: string;
  endLabel?: string;
  allDayLabel?: string;
};

/**
 * HEYの予定と同じく、開始と終了の日付と時刻を矢印でつないで一つの枠に並べる。
 * 終日にすると時刻の欄を隠す。日付と時刻の欄は共通のDateField・TimeField。
 */
export const DateTimeRange = ({
  legend,
  name,
  start = {},
  end = {},
  allDay = false,
  timezone,
  startLabel = "開始",
  endLabel = "終了",
  allDayLabel = "終日",
  id,
  class: className,
  ...attributes
}: DateTimeRangeProps) => {
  const base = id ?? name.replace(/[^\w-]/g, "-");
  return (
    <fieldset {...attributes} id={id} class={classes("ply-date-time-range", className)}>
      <legend>{legend}</legend>
      <div class="range">
        <div class="point">
          <span class="caption" id={`${base}-start`}>
            {startLabel}
          </span>
          <DateField
            name={`${name}[start_date]`}
            value={start.date}
            aria-label={`${startLabel}の日付`}
          />
          <span class="time">
            <TimeField
              name={`${name}[start_time]`}
              value={start.time}
              aria-label={`${startLabel}の時刻`}
            />
          </span>
        </div>
        <span class="arrow" aria-hidden="true">
          <Icon name="arrow" />
        </span>
        <div class="point">
          <span class="caption" id={`${base}-end`}>
            {endLabel}
          </span>
          <DateField name={`${name}[end_date]`} value={end.date} aria-label={`${endLabel}の日付`} />
          <span class="time">
            <TimeField
              name={`${name}[end_time]`}
              value={end.time}
              aria-label={`${endLabel}の時刻`}
            />
          </span>
        </div>
      </div>
      <div class="options">
        <span class="all-day">
          <Switch label={allDayLabel} name={`${name}[all_day]`} value="1" checked={allDay} />
        </span>
        {timezone && (
          <span class="timezone">
            <Icon name="globe" />
            {timezone}
          </span>
        )}
      </div>
    </fieldset>
  );
};
