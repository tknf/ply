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
      {
        start: "10:00",
        end: "11:00",
        label: "編集会議",
        href: "/examples/project",
        accent: "blue",
      },
      {
        start: "10:30",
        end: "12:00",
        label: "取材の準備",
        href: "/examples/project",
        accent: "green",
      },
      { start: "14:00", label: "利用案内を確認", href: "/reservation" },
    ];
  if (date === "2026-09-16")
    return [{ label: "社内研修", href: "/examples/project", accent: "coral" }];
  if (date === "2026-09-24")
    return [
      {
        start: "13:00",
        end: "15:00",
        label: "デザインレビュー",
        href: "/examples/project",
        accent: "blue",
      },
      { start: "13:30", end: "14:00", label: "来客", href: "/examples/contact", accent: "amber" },
    ];
  if (date === "2026-09-25")
    return [
      { start: "18:00", end: "21:00", label: "秋の読書会", href: "/reservation", accent: "amber" },
    ];
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
