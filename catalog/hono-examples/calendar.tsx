import { Calendar } from "../../src/hono";

export default () => (
  <Calendar
    label="2026年9月・第2週"
    weeks={[
      [7, 8, 9, 10, 11, 12, 13].map((day) => ({
        day,
        date: `2026-09-${day.toString().padStart(2, "0")}`,
        current: day === 10,
        events: day === 10 ? [{ label: "編集会議", href: "/reservation" }] : [],
      })),
    ]}
  />
);
