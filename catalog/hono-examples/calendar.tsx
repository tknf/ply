import { Calendar, type CalendarDay } from "../../src/hono";
const makeWeeks = (): (CalendarDay | null)[][] =>
  Array.from({ length: 5 }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const day = week * 7 + weekday;
      return day < 1 || day > 30
        ? null
        : {
            day,
            date: `2026-09-${String(day).padStart(2, "0")}`,
            current: day === 15,
            events:
              day === 15
                ? [
                    { label: "10:00 編集会議", href: "/examples/project" },
                    { label: "14:00 仕事場の利用案内を確認する", href: "/example" },
                  ]
                : day === 25
                  ? [{ label: "18:00 秋の読書会", href: "/reservation" }]
                  : [],
          };
    }),
  );
export default () => <Calendar label="2026年9月の予定" weeks={makeWeeks()} />;
