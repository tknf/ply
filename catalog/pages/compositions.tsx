import {
  Surface,
  ContextBar,
  PageHeader,
  Navigation,
  Field,
  FieldGroup,
  Input,
  Select,
  Switch,
  Range,
  Suggestion,
  DatePicker,
  Button,
  TaskList,
  Board,
  Card,
  Avatar,
  Tag,
  Statistic,
  Timeline,
  Calendar,
  Popover,
  Toast,
  Toolbar,
  FilterBar,
  type CalendarDay,
} from "../../src/hono";
const ExampleContext = ({ label }: { label: string }) => (
  <ContextBar items={[{ label: "部品一覧", href: "/components" }, { label }]} />
);
const CompositionNote = ({ children }: { children: string }) => (
  <p class="catalog-footnote">使用部品：{children}</p>
);
export const ProjectExample = () => (
  <Surface context={<ExampleContext label="案件管理の事例" />}>
    <PageHeader
      title="仕事場の案内をつくる"
      description="9月公開に向けた制作の記録です。"
      actions={
        <Popover id="project-members" label="参加メンバー">
          <div class="ply-cluster">
            <Avatar name="田中 遥" initials="田" />
            田中 遥<Avatar name="佐藤 健" initials="佐" />
            佐藤 健
          </div>
        </Popover>
      }
    />
    <div class="ply-cluster">
      <Tag label="ウェブサイト" />
      <Tag label="9月公開" />
      <a href="/examples/schedule">予定を確認</a>
    </div>
    <div data-controller="project-demo" class="ply-stack">
      <form data-action="submit->project-demo#add" class="catalog-task-add">
        <label class="ply-field">
          仕事を追加
          <input
            class="ply-input"
            name="task"
            required
            maxlength={100}
            placeholder="例：利用料金を確認する"
          />
        </label>
        <Button type="submit" disabled>
          追加する
        </Button>
      </form>
      <Board
        label="案内制作の進行"
        columns={[
          {
            title: "これから",
            count: 1,
            content: (
              <Card
                title="利用条件を確認する"
                footer={
                  <label class="ply-field">
                    状態
                    <Select data-action="change->project-demo#move" aria-label="利用条件の状態">
                      <option value="0" selected>
                        これから
                      </option>
                      <option value="1">作業中</option>
                      <option value="2">完了</option>
                    </Select>
                  </label>
                }
              >
                <p>料金とキャンセル条件を整理します。</p>
              </Card>
            ),
          },
          {
            title: "作業中",
            count: 1,
            content: (
              <Card
                title="案内文を書く"
                href="/example"
                footer={
                  <label class="ply-field">
                    状態
                    <Select data-action="change->project-demo#move" aria-label="案内文の状態">
                      <option value="0">これから</option>
                      <option value="1" selected>
                        作業中
                      </option>
                      <option value="2">完了</option>
                    </Select>
                  </label>
                }
              >
                <p>田中 遥 · 9月12日</p>
              </Card>
            ),
          },
          { title: "完了", count: 0, content: null },
        ]}
      />
      <noscript>
        <p>仕事の追加・移動にはJavaScriptが必要です。</p>
      </noscript>
      <p role="status" data-project-demo-target="status" class="ply-save-status">
        追加・移動はこの画面だけに反映します。
      </p>
    </div>
    <section class="ply-stack">
      <h2>公開前の確認</h2>
      <TaskList
        label="公開前の確認"
        items={[
          { name: "proof", label: "本文の表記を確認する", detail: "田中 · 9月12日" },
          {
            name: "image",
            label: "写真の使用許可を確認する",
            checked: true,
            detail: "佐藤 · 完了",
          },
        ]}
      />
    </section>
    <section class="ply-stack">
      <h2>これまでの記録</h2>
      <Timeline
        label="案件の記録"
        items={[
          {
            datetime: "2026-09-10",
            time: "9月10日",
            title: "写真の使用許可を確認",
            content: <p>案内ページで利用できる写真が揃いました。</p>,
          },
          { datetime: "2026-09-08", time: "9月8日", title: "制作を開始" },
        ]}
      />
    </section>
    <CompositionNote>
      Board・Card・Select・TaskList・Avatar・Tag・Popover・Timeline・Field・Button
    </CompositionNote>
  </Surface>
);
export const SettingsExample = () => (
  <Surface context={<ExampleContext label="設定の事例" />}>
    <PageHeader
      title="仕事場の設定"
      description="このブラウザに保存して、次回も同じ設定を使います。"
    />
    <div class="catalog-settings-layout">
      <Navigation
        label="設定項目"
        items={[
          { label: "基本情報", href: "#settings-basic" },
          { label: "通知と表示", href: "#settings-display" },
          { label: "部品一覧", href: "/components" },
        ]}
      />
      <form
        class="ply-stack"
        data-controller="settings-demo"
        data-action="submit->settings-demo#save reset->settings-demo#reset invalid->settings-demo#invalid:capture"
      >
        <FieldGroup
          id="settings-basic"
          legend="基本情報"
          description="仕事場の名前や分類、作業期間を設定します。"
        >
          <Field id="workspace-name" label="仕事場の名前">
            {(attributes) => (
              <Input
                {...attributes}
                name="workspace"
                required
                value="小さな仕事場"
                maxlength={80}
              />
            )}
          </Field>
          <Suggestion
            id="workspace-category"
            name="category"
            label="分類（自由入力可）"
            value="制作"
            options={["制作", "編集", "運営"]}
          />
          <DatePicker
            id="project-period"
            label="作業期間"
            mode="range"
            startName="project-period-start"
            endName="project-period-end"
            start="2026-09-01"
            end="2026-09-30"
            required
          />
        </FieldGroup>
        <FieldGroup
          id="settings-display"
          legend="通知と表示"
          description="受け取る通知と、一覧の表示方法を設定します。"
        >
          <Switch
            label="週次のまとめを表示"
            description="一週間の更新をまとめて表示します。"
            name="digest"
            checked
          />
          <Switch label="完了した仕事も表示" name="completed" />
          <Range
            id="settings-limit"
            label="一覧の表示件数"
            name="limit"
            min={10}
            max={50}
            step={10}
            value={20}
            unit="件ずつ表示"
          />
        </FieldGroup>
        <Toolbar label="設定の保存">
          <Button type="submit" variant="primary" disabled>
            設定を保存
          </Button>
          <Button type="reset" variant="link">
            初期値に戻す
          </Button>
        </Toolbar>
        <p class="ply-save-status" role="status" data-settings-demo-target="status">
          変更後に「設定を保存」を押してください。
        </p>
        <noscript>
          <p>設定の保存にはJavaScriptが必要です。入力部品はそのまま試せます。</p>
        </noscript>
        <Toast id="settings-result">設定をこのブラウザに保存しました。</Toast>
      </form>
    </div>
    <CompositionNote>
      Navigation・Field・Input・Suggestion・DatePicker・Switch・Range・Toolbar・Button・Toast
    </CompositionNote>
  </Surface>
);
const makeWeeks = (month: number): (CalendarDay | null)[][] => {
  const year = 2026;
  const first = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: Math.ceil((first + count) / 7) }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const day = week * 7 + weekday - first + 1;
      if (day < 1 || day > count) return null;
      return {
        day,
        date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        current: month === 9 && day === 10,
        events:
          day === 15
            ? [{ label: "編集会議 10:00", href: "/reservation" }]
            : day === 25
              ? [{ label: "案内公開の確認", href: "/examples/project" }]
              : [],
      };
    }),
  );
};
export const ScheduleExample = ({ month = 9 }: { month?: number }) => (
  <Surface context={<ExampleContext label="予定の事例" />}>
    <PageHeader
      title={`${month}月の予定`}
      description="2026年 · 制作チーム"
      actions={
        <a class="ply-button" href="/reservation">
          利用日時を選ぶ
        </a>
      }
    />
    <FilterBar
      label="表示する月"
      items={[
        { label: "8月", href: "/examples/schedule/august", current: month === 8 },
        { label: "9月", href: "/examples/schedule", current: month === 9 },
      ]}
    />
    <Calendar label={`2026年${month}月`} weeks={makeWeeks(month)} />
    <section class="ply-stack">
      <h2>今月の予定を一覧で読む</h2>
      <Timeline
        label="今月の予定"
        items={[
          {
            datetime: `2026-${String(month).padStart(2, "0")}-15T10:00:00+09:00`,
            time: `${month}月15日 10:00`,
            title: "編集会議",
            content: <a href="/reservation">利用日時を選ぶ</a>,
          },
          {
            datetime: `2026-${String(month).padStart(2, "0")}-25`,
            time: `${month}月25日`,
            title: "案内公開の確認",
            content: <a href="/examples/project">案件を開く</a>,
          },
        ]}
      />
    </section>
    <div class="ply-cluster">
      <Statistic label="今月の予定" value="2" unit="件" />
    </div>
    <CompositionNote>
      Calendar・FilterBar・Timeline・Statistic・PageHeader・ContextBar
    </CompositionNote>
  </Surface>
);
