import type { CalendarDay, CalendarEvent } from "../src/hono";

export const scheduleUrl = (
  year: number,
  month: number,
  view: "month" | "week" | "year" | "agenda",
  week: number,
) => `/examples/schedule?year=${year}&month=${month}&view=${view}&week=${week}`;

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

export const makeCalendarWeeks = (year: number, month: number): CalendarDay[][] => {
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
        href: scheduleUrl(year, month, "week", week),
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
