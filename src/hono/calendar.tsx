import type { Child } from "hono/jsx";
import { ActionLink, Button } from "./button";
import { DataList } from "./data-list";
import { FilterBar, type FilterBarItem } from "./filter-bar";
import { Icon } from "./icon";
import { Tag, TagGroup } from "./tag";
import { classes, type Accent, type ElementProps } from "./types";

export type CalendarEvent = { label: string; href: string; time?: string; accent?: Accent };
export type CalendarDay = {
  day: number;
  date: string;
  label?: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
  outside?: boolean;
  events?: readonly CalendarEvent[];
};
export type CalendarSelection =
  | { mode: "single"; value?: string }
  | { mode: "range"; start?: string; end?: string };
export type CalendarPeriodLink = { label: string; href: string };
export type CalendarMonth = {
  label: string;
  href?: string;
  weeks: readonly (readonly (CalendarDay | null)[])[];
};
type CalendarBaseProps = Omit<ElementProps<"div">, "children"> & {
  label: string;
  previous?: CalendarPeriodLink;
  next?: CalendarPeriodLink;
  today?: CalendarPeriodLink;
  views?: readonly FilterBarItem[];
  actions?: Child;
  emptyLabel?: string;
};
export type CalendarProps = CalendarBaseProps &
  (
    | {
        view?: "month" | "week";
        weeks: readonly (readonly (CalendarDay | null)[])[];
        months?: never;
        selection?: CalendarSelection;
      }
    | {
        view: "year";
        months: readonly CalendarMonth[];
        weeks?: never;
        selection?: never;
      }
    | {
        view: "agenda";
        weeks: readonly (readonly (CalendarDay | null)[])[];
        months?: never;
        selection?: never;
      }
  );
const weekdays = ["月", "火", "水", "木", "金", "土", "日"] as const;

const DayMarker = ({ day, selection }: { day: CalendarDay; selection?: CalendarSelection }) => {
  const label = day.label ?? day.date;
  const selected =
    selection?.mode === "single"
      ? selection.value === day.date
      : selection?.start === day.date || selection?.end === day.date;
  const rangeState =
    selection?.mode === "range"
      ? day.date === selection.start
        ? "range-start"
        : day.date === selection.end
          ? "range-end"
          : selection.start &&
              selection.end &&
              day.date > selection.start &&
              day.date < selection.end
            ? "in-range"
            : undefined
      : undefined;
  return selection ? (
    <Button
      class="day"
      size="compact"
      data-calendar-target="day"
      data-calendar-value={day.date}
      data-state={selection.mode === "single" ? (selected ? "selected" : undefined) : rangeState}
      aria-pressed={selected ? "true" : "false"}
      aria-current={day.current ? "date" : undefined}
      data-current={day.current ? "true" : undefined}
      aria-label={label}
      disabled={day.disabled}
    >
      {day.day}
    </Button>
  ) : day.href && !day.disabled ? (
    <ActionLink
      class="day"
      size="compact"
      href={day.href}
      aria-current={day.current ? "date" : undefined}
      data-current={day.current ? "true" : undefined}
      aria-label={label}
    >
      {day.day}
    </ActionLink>
  ) : (
    <time
      class="day"
      datetime={day.date}
      aria-current={day.current ? "date" : undefined}
      data-current={day.current ? "true" : undefined}
    >
      {day.day}
    </time>
  );
};

const DayEvents = ({ events, label }: { events?: readonly CalendarEvent[]; label: string }) =>
  events && events.length > 0 ? (
    <TagGroup label={`${label}の予定`}>
      {events.map((event) => (
        <Tag
          label={event.time ? `${event.time} ${event.label}` : event.label}
          href={event.href}
          accent={event.accent}
        />
      ))}
    </TagGroup>
  ) : null;

const CalendarGrid = ({
  label,
  weeks,
  selection,
}: {
  label: string;
  weeks: readonly (readonly (CalendarDay | null)[])[];
  selection?: CalendarSelection;
}) => (
  <table>
    <caption>{label}</caption>
    <thead>
      <tr>
        {weekdays.map((weekday) => (
          <th scope="col">{weekday}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {weeks.map((week) => (
        <tr>
          {Array.from({ length: 7 }, (_, index) => {
            const day = week[index];
            return (
              <td
                data-current={day?.current ? "true" : undefined}
                data-outside={day?.outside ? "true" : undefined}
                data-events={day?.events?.length ? "true" : undefined}
                data-selected={
                  day && selection?.mode === "single" && selection.value === day.date
                    ? "true"
                    : undefined
                }
              >
                {day && (
                  <>
                    <span class="weekday" aria-hidden="true">
                      {weekdays[index]}
                    </span>
                    <DayMarker day={day} selection={selection} />
                    <DayEvents events={day.events} label={day.label ?? day.date} />
                  </>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

const CalendarYear = ({ label, months }: { label: string; months: readonly CalendarMonth[] }) => {
  const dates = months
    .flatMap((month) =>
      month.weeks.flat().filter((day): day is CalendarDay => Boolean(day && !day.outside)),
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((day, index, ordered) => index === 0 || day.date !== ordered[index - 1]?.date);
  const monthStarts = new Map(
    months.flatMap((month) => {
      const start = month.weeks.flat().find((day) => day && !day.outside);
      return start ? [[start.date, month] as const] : [];
    }),
  );
  return (
    <div class="year-overview" role="group" aria-label={`${label}の日付一覧`}>
      <div class="year-grid">
        {dates.map((day, index) => {
          const month = monthStarts.get(day.date);
          const calendarDate = new Date(`${day.date}T00:00:00Z`);
          const weekday = (calendarDate.getUTCDay() + 6) % 7;
          const previousDate = dates[index - 1];
          const missingDays = previousDate
            ? Math.max(
                0,
                Math.round(
                  (calendarDate.getTime() - new Date(`${previousDate.date}T00:00:00Z`).getTime()) /
                    86_400_000,
                ) - 1,
              )
            : weekday;
          const dateLabel = day.events?.length
            ? `${day.label ?? day.date}、${day.events.length}件の予定：${day.events.map((event) => event.label).join("、")}`
            : (day.label ?? day.date);
          const dateHref = day.href && !day.disabled && !month?.href ? day.href : undefined;
          const date = (
            <time
              datetime={day.date}
              aria-label={dateLabel}
              aria-current={day.current && !dateHref ? "date" : undefined}
            >
              <span class="weekday" aria-hidden="true">
                {weekdays[weekday]}
              </span>
              <span class="number" aria-hidden="true">
                {day.day}
              </span>
            </time>
          );
          return (
            <>
              {Array.from({ length: missingDays }, () => (
                <span class="lead" aria-hidden="true" />
              ))}
              <div
                class="year-day"
                data-weekend={weekday >= 5 ? "true" : undefined}
                data-month-start={month ? "true" : undefined}
                data-current={day.current ? "true" : undefined}
                data-events={day.events?.length ? "true" : undefined}
              >
                {month &&
                  (month.href ? (
                    <a class="month-link" href={month.href} aria-label={`${month.label}を表示`}>
                      <span class="month-label" aria-hidden="true">
                        {month.label}
                      </span>
                    </a>
                  ) : (
                    <span class="month-label">{month.label}</span>
                  ))}
                {dateHref ? (
                  <a
                    class="date-link"
                    href={dateHref}
                    aria-label={dateLabel}
                    aria-current={day.current ? "date" : undefined}
                  >
                    {date}
                  </a>
                ) : (
                  date
                )}
                {day.events && day.events.length > 0 && (
                  <span class="event-mark" aria-hidden="true" />
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const CalendarAgenda = ({
  days,
  previewLabel,
}: {
  days: readonly CalendarDay[];
  previewLabel?: string;
}) => (
  <div class={classes("agenda", previewLabel && "period-agenda")}>
    {previewLabel && <p class="agenda-heading">{previewLabel}</p>}
    {days.map((day) => (
      <section class="agenda-group">
        <h3>
          <time datetime={day.date}>{day.label ?? day.date}</time>
        </h3>
        <DataList
          aria-label={`${day.label ?? day.date}の予定`}
          items={(day.events ?? []).map((event) => ({
            title: event.label,
            href: event.href,
            start: event.time ? <time datetime={event.time}>{event.time}</time> : undefined,
          }))}
        />
      </section>
    ))}
  </div>
);

export const Calendar = ({
  label,
  weeks,
  months,
  view = "month",
  previous,
  next,
  today,
  views,
  actions,
  selection,
  emptyLabel = "この期間に予定はありません",
  class: className,
  ...attributes
}: CalendarProps) => {
  const eventDays = (weeks ?? [])
    .flat()
    .filter((day): day is CalendarDay =>
      Boolean(day && (view === "week" || !day.outside) && day.events && day.events.length > 0),
    );
  return (
    <div
      {...attributes}
      class={classes("ply-calendar", className)}
      data-view={view}
      data-controller={selection ? "calendar" : undefined}
      data-calendar-mode-value={selection?.mode}
      data-calendar-value-value={selection?.mode === "single" ? selection.value : undefined}
      data-calendar-start-value={selection?.mode === "range" ? selection.start : undefined}
      data-calendar-end-value={selection?.mode === "range" ? selection.end : undefined}
      role="region"
      aria-label={label}
    >
      <div class="controls">
        <h2>{label}</h2>
        {(previous || today || next) && (
          <nav class="period" aria-label="表示期間">
            {previous && (
              <ActionLink
                href={previous.href}
                size="compact"
                data-icon-only="true"
                aria-label={previous.label}
                title={previous.label}
              >
                <span class="previous-icon">
                  <Icon name="arrow" />
                </span>
              </ActionLink>
            )}
            {today && (
              <ActionLink href={today.href} size="compact">
                {today.label}
              </ActionLink>
            )}
            {next && (
              <ActionLink
                href={next.href}
                size="compact"
                data-icon-only="true"
                aria-label={next.label}
                title={next.label}
              >
                <Icon name="arrow" />
              </ActionLink>
            )}
          </nav>
        )}
        {views && views.length > 0 && <FilterBar label="予定の表示形式" items={views} />}
        {actions != null && actions !== false && <div class="actions">{actions}</div>}
      </div>
      {view === "year" ? (
        months && months.length > 0 ? (
          <CalendarYear label={label} months={months} />
        ) : (
          <p class="empty">{emptyLabel}</p>
        )
      ) : view === "agenda" ? (
        eventDays.length > 0 ? (
          <CalendarAgenda days={eventDays} />
        ) : (
          <p class="empty">{emptyLabel}</p>
        )
      ) : weeks && weeks.length > 0 ? (
        <>
          <div class="viewport" tabindex={0} role="group" aria-label={`${label}の日付グリッド`}>
            <CalendarGrid label={label} weeks={weeks} selection={selection} />
          </div>
          {eventDays.length > 0 && (
            <CalendarAgenda
              days={eventDays}
              previewLabel={view === "week" ? "この週の予定" : "この月の予定"}
            />
          )}
        </>
      ) : (
        <p class="empty">{emptyLabel}</p>
      )}
    </div>
  );
};
