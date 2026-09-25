import { ActionLink, Calendar, type CalendarDay, type CalendarEvent } from "../../src/hono";

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
    return [
      { label: "社内研修", href: "/examples/project", accent: "coral" },
      { start: "9:00", end: "9:15", label: "朝会", href: "/examples/project" },
    ];
  if (date === "2026-09-17")
    return [
      {
        start: "11:00",
        end: "12:30",
        label: "初めて利用する方に向けた予約方法と当日の受付の説明会",
        href: "/reservation",
      },
    ];
  if (date === "2026-09-24")
    return [
      { start: "7:00", end: "7:30", label: "早朝の搬入", href: "/examples/project" },
      {
        start: "13:00",
        end: "15:00",
        label: "デザインレビュー",
        href: "/examples/project",
        accent: "blue",
      },
      { start: "13:30", end: "14:00", label: "来客", href: "/examples/contact", accent: "amber" },
      {
        start: "14:00",
        end: "16:00",
        label: "資料作成",
        href: "/examples/project",
        accent: "green",
      },
    ];
  if (date === "2026-09-25")
    return [
      {
        start: "14:00",
        end: "15:00",
        label: "打ち合わせ（仮）",
        href: "/examples/contact",
        tentative: true,
      },
      { start: "18:00", end: "21:00", label: "秋の読書会", href: "/reservation", accent: "amber" },
    ];
  if (date === "2026-09-26") return [{ label: "休館日", href: "/reservation" }];
  if (date === "2026-09-30")
    return [
      {
        start: "10:00",
        end: "11:00",
        label: "取材（仮）",
        href: "/examples/project",
        tentative: true,
      },
    ];
  if (date === "2026-10-02")
    return [{ start: "15:00", end: "16:00", label: "10月の定例", href: "/examples/project" }];
  if (["2026-03-08", "2026-06-17", "2026-12-03"].includes(date))
    return [{ label: "制作の予定", href: "/examples/project" }];
  return [];
};

type WeekStart = "monday" | "sunday";

const makeCalendarWeeks = (
  year: number,
  month: number,
  { withEvents = true, weekStart = "monday" }: { withEvents?: boolean; weekStart?: WeekStart } = {},
): CalendarDay[][] => {
  const offset = weekStart === "sunday" ? 0 : 1;
  const first = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() - offset + 7) % 7;
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: Math.ceil((first + count) / 7) }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const date = new Date(Date.UTC(year, month - 1, week * 7 + weekday - first + 1));
      const iso = date.toISOString().slice(0, 10);
      const outside = date.getUTCMonth() + 1 !== month;
      return {
        day: date.getUTCDate(),
        date: iso,
        href: `/examples/schedule?year=${year}&month=${month}&view=week&week=${week}`,
        label: new Intl.DateTimeFormat("ja-JP", {
          month: "long",
          day: "numeric",
          weekday: "long",
          timeZone: "UTC",
        }).format(date),
        outside,
        current: iso === "2026-09-24",
        disabled: iso === "2026-09-23",
        events: outside || !withEvents ? [] : sampleEvents(iso),
      };
    }),
  );
};

const weeks = makeCalendarWeeks(2026, 9);
const sundayWeeks = makeCalendarWeeks(2026, 9, { weekStart: "sunday" });
const emptyWeeks = makeCalendarWeeks(2026, 9, { withEvents: false });
const thisWeek = weeks[3] ?? [];
const months = Array.from({ length: 12 }, (_, index) => ({
  label: `${index + 1}月`,
  href: `/examples/schedule?year=2026&month=${index + 1}&view=month`,
  weeks: makeCalendarWeeks(2026, index + 1),
}));

export default () => (
  <div class="ply-stack">
    <h2>月の予定と週番号</h2>
    <Calendar
      label="2026年9月の予定"
      weeks={weeks}
      weekNumbers
      now="10:30"
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
    <h2>日曜始まりの月</h2>
    <Calendar label="2026年9月（日曜始まり）" weeks={sundayWeeks} weekStart="sunday" weekNumbers />
    <h2>週の時間割</h2>
    <p>
      0〜24時をスクロールでき、開くと現在時刻を表示します。重なる予定・終日・早朝と夜の予定を含みます。
    </p>
    <Calendar label="9月21日〜27日" weeks={[thisWeek]} view="week" now="10:30" weekNumbers />
    <h2>日</h2>
    <Calendar label="9月24日" weeks={[thisWeek.slice(3, 4)]} view="week" now="10:30" />
    <h2>稼働日</h2>
    <Calendar label="9月21日〜25日" weeks={[thisWeek.slice(0, 5)]} view="week" now="10:30" />
    <h2>3日</h2>
    <Calendar label="9月24日〜26日" weeks={[thisWeek.slice(3, 6)]} view="week" now="10:30" />
    <h2>日曜始まりの週</h2>
    <Calendar
      label="9月20日〜26日"
      weeks={[sundayWeeks[3] ?? []]}
      view="week"
      weekStart="sunday"
      now="10:30"
      weekNumbers
    />
    <h2>短い予定と長い題名</h2>
    <Calendar label="9月14日〜20日" weeks={weeks.slice(2, 3)} view="week" now="10:30" />
    <h2>稼働時間を指定した週</h2>
    <p>9〜18時の外を淡く塗り、今日を含まない週は稼働時間の始まりを表示します。</p>
    <Calendar
      label="9月14日〜20日の営業時間"
      weeks={weeks.slice(2, 3)}
      view="week"
      hours={{ start: 9, end: 18 }}
    />
    <h2>予定のない週</h2>
    <Calendar label="9月7日〜13日" weeks={emptyWeeks.slice(1, 2)} view="week" />
    <h2>週の選択</h2>
    <Calendar
      label="9月14日〜20日から選ぶ"
      weeks={weeks.slice(2, 3)}
      view="week"
      selection={{ mode: "single", value: "2026-09-15" }}
    />
    <h2>期間の選択</h2>
    <Calendar
      label="9月21日〜27日から期間を選ぶ"
      weeks={weeks.slice(3, 4)}
      view="week"
      selection={{ mode: "range", start: "2026-09-22", end: "2026-09-25" }}
    />
    <h2>年の俯瞰</h2>
    <Calendar label="2026年" view="year" months={months} />
    <h2>時刻順の予定</h2>
    <Calendar label="2026年9月の予定一覧" weeks={weeks} view="agenda" now="10:30" />
    <h2>月をまたぐ一覧</h2>
    <Calendar
      label="9月21日〜10月4日の予定一覧"
      weeks={[...weeks.slice(3), ...makeCalendarWeeks(2026, 10).slice(0, 1)]}
      view="agenda"
      now="10:30"
    />
    <h2>予定がない期間</h2>
    <Calendar label="予定のない週" weeks={[weeks[0] ?? []]} view="agenda" />
  </div>
);
