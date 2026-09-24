import { ActionLink, Calendar, type CalendarDay, type CalendarEvent } from "../../src/hono";

const sampleEvents = (date: string): readonly CalendarEvent[] => {
  if (date === "2026-09-15")
    return [
      { time: "10:00", label: "編集会議", href: "/examples/project", accent: "blue" },
      { time: "14:00", label: "利用案内を確認", href: "/reservation" },
    ];
  if (date === "2026-09-25")
    return [{ time: "18:00", label: "秋の読書会", href: "/reservation", accent: "amber" }];
  if (["2026-03-08", "2026-06-17", "2026-12-03"].includes(date))
    return [{ label: "制作の予定", href: "/examples/project" }];
  return [];
};

const makeCalendarWeeks = (year: number, month: number): CalendarDay[][] => {
  const first = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: Math.ceil((first + count) / 7) }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const date = new Date(Date.UTC(year, month - 1, week * 7 + weekday - first + 1));
      const iso = date.toISOString().slice(0, 10);
      const outside = date.getUTCMonth() + 1 !== month;
      return {
        day: date.getUTCDate(),
        date: iso,
        label: new Intl.DateTimeFormat("ja-JP", {
          month: "long",
          day: "numeric",
          weekday: "long",
          timeZone: "UTC",
        }).format(date),
        outside,
        current: iso === "2026-09-24",
        events: outside ? [] : sampleEvents(iso),
      };
    }),
  );
};

const weeks = makeCalendarWeeks(2026, 9);
const months = Array.from({ length: 12 }, (_, index) => ({
  label: `${index + 1}月`,
  href: `/examples/schedule?year=2026&month=${index + 1}&view=month`,
  weeks: makeCalendarWeeks(2026, index + 1),
}));

export default () => (
  <div class="ply-stack">
    <Calendar
      label="2026年9月の予定"
      weeks={weeks}
      selection={{ mode: "single", value: "2026-09-24" }}
      previous={{ label: "前月", href: "/examples/schedule?month=8" }}
      today={{ label: "今月", href: "/examples/schedule" }}
      next={{ label: "翌月", href: "/examples/schedule?month=10" }}
      views={[
        { label: "月", href: "/examples/schedule", current: true },
        { label: "週", href: "/examples/schedule?view=week" },
        { label: "年", href: "/examples/schedule?view=year" },
        { label: "一覧", href: "/examples/schedule?view=agenda" },
      ]}
      actions={<ActionLink href="/reservation">予定を追加</ActionLink>}
    />
    <h2>週の選択</h2>
    <Calendar
      label="9月14日〜20日"
      weeks={weeks.slice(2, 3)}
      view="week"
      selection={{ mode: "single", value: "2026-09-15" }}
    />
    <h2>期間の選択</h2>
    <Calendar
      label="9月21日〜27日"
      weeks={weeks.slice(3, 4)}
      view="week"
      selection={{ mode: "range", start: "2026-09-22", end: "2026-09-25" }}
    />
    <h2>年の俯瞰</h2>
    <Calendar label="2026年" view="year" months={months} />
    <h2>時刻順の予定</h2>
    <Calendar label="2026年9月の予定一覧" weeks={weeks} view="agenda" />
    <h2>予定がない期間</h2>
    <Calendar label="予定のない週" weeks={[weeks[0] ?? []]} view="agenda" />
  </div>
);
