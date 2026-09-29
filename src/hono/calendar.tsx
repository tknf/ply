import type { Child } from "hono/jsx";
import { ActionLink, Button } from "./button";
import { FilterBar, type FilterBarItem } from "./filter-bar";
import { Icon } from "./icon";
import { OverlayClose, OverlayContent, overlayAnchorName } from "./overlay-content";
import { classes, type Accent, type ElementProps } from "./types";
import {
  eventRange,
  isAllDay,
  layoutDay,
  minutesOf,
  sortEvents,
} from "../internal/calendar-layout";
import {
  columnOf,
  isWeekend,
  rowWeekNumber,
  weekdayLabel,
  weekdayLabels,
  type WeekStart,
} from "../internal/calendar-date";

export type { WeekStart } from "../internal/calendar-date";

export type CalendarEvent = {
  label: string;
  /** 予定のページ。detailsを渡す時は省略でき、札は詳細の紙を開く操作になる。 */
  href?: string;
  /**
   * 札を押すとPopoverと同じ紙で開く、予定の詳細（場所・参加者・メモなど）。idは紙のidで、画面の中で一意にする。
   * 開閉と位置決めはPopoverと同じ（PopoverControllerをpopoverとして登録する）。
   */
  details?: { id: string; content: Child };
  /** 開始時刻（HH:MM）。省略すると終日の予定。 */
  start?: string;
  /** 終了時刻（HH:MM）。省略すると開始から1時間。 */
  end?: string;
  accent?: Accent;
  /** 仮の予定。破線の縁と斜線で、まだ確定していないことを示す。 */
  tentative?: boolean;
};
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
  /** 時間割の稼働時間（時）。外側を淡く塗り、今日が含まれない時は開始時刻へスクロールする。 */
  hours?: { start: number; end: number };
  /** currentの日に引く現在時刻（HH:MM）。時間割は開いた時にこの時刻を表示する。 */
  now?: string;
  /** 週の開始曜日。weeksの各行もこの曜日から並べる。 */
  weekStart?: WeekStart;
  /** 月の各行と週の見出しにISO週番号を表示する。 */
  weekNumbers?: boolean;
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
        /** weekは先頭の一行を時間割で表示する。1日なら日、5日なら稼働日の表示になる。 */
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
    <a
      class="day"
      href={day.href}
      aria-current={day.current ? "date" : undefined}
      data-current={day.current ? "true" : undefined}
      aria-label={label}
    >
      {day.day}
    </a>
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

/** 月の初日だけ、日付の前に月を添えて月の切り替わりを示す。 */
const MonthStart = ({ day }: { day: CalendarDay }) =>
  day.day === 1 ? (
    <span class="month-start" aria-hidden="true">
      {Number(day.date.slice(5, 7))}月
    </span>
  ) : null;

const clock = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, "0")}`;

/** 時刻は表示用に正規化し、datetimeには入力どおりのHH:MMを残す。 */
const EventTime = ({
  event,
  withEnd,
  allDayLabel,
}: {
  event: CalendarEvent;
  withEnd?: boolean;
  allDayLabel?: boolean;
}) => {
  if (isAllDay(event)) return allDayLabel ? <span class="time">終日</span> : null;
  const range = eventRange(event);
  return (
    <span class="time">
      <time datetime={event.start}>{clock(range.start)}</time>
      {withEnd && (
        <>
          –<time datetime={event.end}>{clock(range.end)}</time>
        </>
      )}
    </span>
  );
};

/** 今日より前の日の予定と、今日のうち現在時刻までに終わった予定を過去として淡くする。 */
type Clock = { today?: string; now: number | null };
const isPast = (day: CalendarDay, event: CalendarEvent, clockState: Clock) => {
  if (!clockState.today) return false;
  if (day.date < clockState.today) return true;
  return (
    day.date === clockState.today &&
    clockState.now !== null &&
    !isAllDay(event) &&
    eventRange(event).end <= clockState.now
  );
};

const EventLink = ({
  event,
  withEnd,
  allDayLabel,
  past,
}: {
  event: CalendarEvent;
  withEnd?: boolean;
  allDayLabel?: boolean;
  past: boolean;
}) => {
  const state = {
    "data-accent": event.accent,
    "data-all-day": isAllDay(event) ? "true" : undefined,
    "data-past": past ? "true" : undefined,
    "data-tentative": event.tentative ? "true" : undefined,
  };
  const content = (
    <>
      <span class="bar" aria-hidden="true" />
      <EventTime event={event} withEnd={withEnd} allDayLabel={allDayLabel} />
      <span class="label">{event.label}</span>
    </>
  );
  if (!event.details)
    return (
      <a {...state} class="event" href={event.href}>
        {content}
      </a>
    );
  const { id, content: details } = event.details;
  const anchor = overlayAnchorName("popover", id);
  // 札と詳細の紙は兄弟に置く。開閉のcontroller（popover）は札を包むliが持つ（eventControllerを参照）。
  return (
    <>
      <button
        {...state}
        type="button"
        class="event"
        popovertarget={id}
        style={`anchor-name: ${anchor}`}
        aria-haspopup="dialog"
        aria-controls={id}
        data-popover-target="trigger"
      >
        {content}
      </button>
      <div
        id={id}
        popover="auto"
        class="event-details ply-overlay"
        data-placement="anchor"
        data-size="compact"
        style={`--ply-overlay-anchor: ${anchor}`}
        role="dialog"
        aria-labelledby={`${id}-title`}
        data-popover-target="panel"
      >
        <OverlayContent
          title={
            <h3 id={`${id}-title`} tabindex={-1} autofocus>
              {event.label}
            </h3>
          }
          description={
            <p>
              <EventTime event={event} withEnd allDayLabel />
            </p>
          }
          close={<OverlayClose label="閉じる" popovertarget={id} popovertargetaction="hide" />}
        >
          {details}
          {event.href && (
            <p>
              <ActionLink href={event.href} variant="link">
                詳しく見る
              </ActionLink>
            </p>
          )}
        </OverlayContent>
      </div>
    </>
  );
};

/** 詳細を持つ予定の札を包むliは、Popoverと同じ開閉のcontrollerを持つ。 */
const eventController = (event: CalendarEvent) => (event.details ? "popover" : undefined);

const DayEvents = ({ day, clockState }: { day: CalendarDay; clockState: Clock }) =>
  day.events && day.events.length > 0 ? (
    <ul class="events" aria-label={`${day.label ?? day.date}の予定`}>
      {sortEvents(day.events).map((event) => (
        <li data-controller={eventController(event)}>
          <EventLink event={event} past={isPast(day, event, clockState)} />
        </li>
      ))}
    </ul>
  ) : null;

const hourLabel = (hour: number) => `${hour.toString().padStart(2, "0")}:00`;

const CalendarWeek = ({
  label,
  week,
  selection,
  hours,
  clockState,
}: {
  label: string;
  week: readonly (CalendarDay | null)[];
  selection?: CalendarSelection;
  hours: { start: number; end: number };
  clockState: Clock;
}) => {
  const nowMinutes = clockState.now;
  const showsToday = week.some((day) => day?.current);
  const nowVisible = showsToday && nowMinutes !== null;
  // 開いた時は現在時刻、今日を含まない週は稼働時間の始まりを、少し手前から表示する。
  const target = Math.max(0, (nowVisible ? nowMinutes : hours.start * 60) - 60);
  return (
    <div
      class="week"
      style={`--ply-calendar-days: ${week.length}; --ply-calendar-core-start: ${hours.start}; --ply-calendar-core-end: ${hours.end}`}
    >
      <span class="corner" aria-hidden="true" />
      <span class="all-day-label" aria-hidden="true">
        終日
      </span>
      <div class="hours" aria-hidden="true">
        {Array.from({ length: 24 }, (_, hour) => (
          <span style={`--ply-calendar-hour-index: ${hour}`}>{hourLabel(hour)}</span>
        ))}
        {nowVisible && (
          <span class="now-label" style={`--ply-calendar-now: ${nowMinutes}`}>
            {clock(nowMinutes)}
          </span>
        )}
      </div>
      <span class="scroll-target" style={`--ply-calendar-target: ${target}`} />
      {week.map((day) => {
        if (!day) return <div class="column" aria-hidden="true" />;
        const events = day.events ?? [];
        const allDay = sortEvents(events).filter(isAllDay);
        const timed = layoutDay(events);
        return (
          <div
            class="column"
            role="group"
            aria-label={day.label ?? day.date}
            data-current={day.current ? "true" : undefined}
            data-outside={day.outside ? "true" : undefined}
            data-weekend={isWeekend(day.date) ? "true" : undefined}
          >
            <div class="heading">
              {/* 曜日と日付を一つにまとめ、今日は両方をまとめて塗る。 */}
              <span class="date" data-current={day.current ? "true" : undefined}>
                <span class="weekday" aria-hidden="true">
                  {weekdayLabel(day.date)}
                </span>
                <DayMarker day={day} selection={selection} />
              </span>
            </div>
            <div class="all-day">
              {allDay.length > 0 && (
                <ul aria-label="終日の予定">
                  {allDay.map((event) => (
                    <li data-controller={eventController(event)}>
                      <EventLink event={event} past={isPast(day, event, clockState)} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div class="timed">
              {timed.length > 0 && (
                <ol aria-label={`${label}・${day.label ?? day.date}の時間の予定`}>
                  {timed.map((item) => (
                    <li
                      data-controller={eventController(item.event)}
                      style={`--ply-calendar-start: ${item.start}; --ply-calendar-end: ${item.end}; --ply-calendar-lane: ${item.lane}; --ply-calendar-lanes: ${item.lanes}`}
                      data-length={item.end - item.start < 45 ? "short" : undefined}
                    >
                      <EventLink
                        event={item.event}
                        withEnd
                        past={isPast(day, item.event, clockState)}
                      />
                    </li>
                  ))}
                </ol>
              )}
              {day.current && nowVisible && (
                <span
                  class="now"
                  style={`--ply-calendar-now: ${nowMinutes}`}
                  role="img"
                  aria-label={`現在時刻 ${clock(nowMinutes)}`}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const rowDates = (week: readonly (CalendarDay | null)[]) =>
  week.flatMap((day) => (day ? [day.date] : []));

const CalendarGrid = ({
  label,
  weeks,
  selection,
  clockState,
  weekStart,
  weekNumbers,
}: {
  label: string;
  weeks: readonly (readonly (CalendarDay | null)[])[];
  selection?: CalendarSelection;
  clockState: Clock;
  weekStart: WeekStart;
  weekNumbers: boolean;
}) => (
  <table data-week-numbers={weekNumbers ? "true" : undefined}>
    <caption>{label}</caption>
    <thead>
      <tr>
        {weekNumbers && (
          <th scope="col" class="week-number">
            週
          </th>
        )}
        {weekdayLabels(weekStart).map((weekday) => (
          <th scope="col">{weekday}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {weeks.map((week) => (
        <tr data-current={week.some((day) => day?.current) ? "true" : undefined}>
          {weekNumbers && (
            <th scope="row" class="week-number">
              {rowWeekNumber(rowDates(week), weekStart)}
            </th>
          )}
          {Array.from({ length: 7 }, (_, index) => {
            const day = week[index];
            return (
              <td
                data-current={day?.current ? "true" : undefined}
                data-outside={day?.outside ? "true" : undefined}
                data-disabled={day?.disabled ? "true" : undefined}
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
                      {weekdayLabel(day.date)}
                    </span>
                    <MonthStart day={day} />
                    <DayMarker day={day} selection={selection} />
                    <DayEvents day={day} clockState={clockState} />
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

const CalendarYear = ({
  label,
  months,
  weekStart,
}: {
  label: string;
  months: readonly CalendarMonth[];
  weekStart: WeekStart;
}) => {
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
          const column = columnOf(day.date, weekStart);
          const previousDate = dates[index - 1];
          const missingDays = previousDate
            ? Math.max(
                0,
                Math.round(
                  (calendarDate.getTime() - new Date(`${previousDate.date}T00:00:00Z`).getTime()) /
                    86_400_000,
                ) - 1,
              )
            : column;
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
                {weekdayLabel(day.date)}
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
                data-weekend={isWeekend(day.date) ? "true" : undefined}
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

/** 一覧は日付ごとのまとまり。日付は週の見出しと同じ数字と曜日、予定は月・週と同じ行で表す。 */
const CalendarAgenda = ({
  days,
  previewLabel,
  clockState,
}: {
  days: readonly CalendarDay[];
  previewLabel?: string;
  clockState: Clock;
}) => (
  <div class={classes("agenda", previewLabel && "period-agenda")}>
    {previewLabel && <p class="agenda-heading">{previewLabel}</p>}
    {days.map((day, index) => (
      <>
        {/* 日本語の日付は月・日・曜日の順に読むため、月は日付に添えず、月が変わる所だけに区切りとして置く。 */}
        {index > 0 && day.date.slice(0, 7) !== days[index - 1]?.date.slice(0, 7) && (
          <p class="agenda-month" aria-hidden="true">
            {Number(day.date.slice(5, 7))}月
          </p>
        )}
        <section
          class="agenda-group"
          aria-label={day.label ?? day.date}
          data-current={day.current ? "true" : undefined}
        >
          <h3>
            <time datetime={day.date}>
              <span class="number">{day.day}</span>
              <span class="weekday">{weekdayLabel(day.date)}</span>
            </time>
          </h3>
          <ul class="events" aria-label={`${day.label ?? day.date}の予定`}>
            {sortEvents(day.events ?? []).map((event) => (
              <li data-controller={eventController(event)}>
                <EventLink
                  event={event}
                  withEnd
                  allDayLabel
                  past={isPast(day, event, clockState)}
                />
              </li>
            ))}
          </ul>
        </section>
      </>
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
  hours = { start: 8, end: 20 },
  now,
  weekStart = "monday",
  weekNumbers = false,
  emptyLabel = "この期間に予定はありません",
  class: className,
  ...attributes
}: CalendarProps) => {
  const clockState: Clock = {
    today: (weeks ?? []).flat().find((day) => day?.current)?.date,
    now: minutesOf(now),
  };
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
        <h2>
          {label}
          {weekNumbers && view === "week" && weeks?.[0] && (
            <span class="week-number">第{rowWeekNumber(rowDates(weeks[0]), weekStart)}週</span>
          )}
        </h2>
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
        {views && views.length > 0 && (
          <FilterBar label="予定の表示形式" items={views} appearance="segmented" />
        )}
        {actions != null && actions !== false && <div class="actions">{actions}</div>}
      </div>
      {view === "year" ? (
        months && months.length > 0 ? (
          <CalendarYear label={label} months={months} weekStart={weekStart} />
        ) : (
          <p class="empty">{emptyLabel}</p>
        )
      ) : view === "agenda" ? (
        eventDays.length > 0 ? (
          <CalendarAgenda days={eventDays} clockState={clockState} />
        ) : (
          <p class="empty">{emptyLabel}</p>
        )
      ) : view === "week" && weeks?.[0] ? (
        <div
          class="viewport"
          tabindex={0}
          role="group"
          aria-label={`${label}の時間割`}
          data-controller="calendar-scroll"
        >
          <CalendarWeek
            label={label}
            week={weeks[0]}
            selection={selection}
            hours={hours}
            clockState={clockState}
          />
        </div>
      ) : weeks && weeks.length > 0 ? (
        <>
          <div class="viewport" tabindex={0} role="group" aria-label={`${label}の日付グリッド`}>
            <CalendarGrid
              label={label}
              weeks={weeks}
              selection={selection}
              clockState={clockState}
              weekStart={weekStart}
              weekNumbers={weekNumbers}
            />
          </div>
          {eventDays.length > 0 && (
            <CalendarAgenda days={eventDays} previewLabel="この月の予定" clockState={clockState} />
          )}
        </>
      ) : (
        <p class="empty">{emptyLabel}</p>
      )}
    </div>
  );
};
