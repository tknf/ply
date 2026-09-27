import {
  AppShell,
  SplitView,
  Section,
  Message,
  CommandMenu,
  ActionLink,
  PageHeader,
  Avatar,
  Icon,
  Badge,
  Board,
  Card,
  TaskList,
  Tabs,
  InputGroup,
  Progress,
  Dialog,
  Field,
  Input,
  Select,
  Button,
  ValueList,
  Tag,
} from "../../src/hono";
import type { PropsWithChildren } from "hono/jsx";

export const WorkspaceFrame = ({
  children,
  current = "project",
}: PropsWithChildren<{ current?: "project" | "mail" }>) => (
  <AppShell
    home={<ActionLink href="/review/workspace">ホーム</ActionLink>}
    commands={
      <CommandMenu
        id="workspace-commands"
        label="つむぐチーム"
        shortcuts={[
          { label: "プロジェクト", href: "/review/workspace", icon: "layers", accent: "green" },
          { label: "受信トレイ", href: "/review/mail", icon: "mail", accent: "blue" },
          { label: "資料", href: "/files", icon: "file", accent: "amber" },
          { label: "売上", href: "/sales", icon: "chart", accent: "coral" },
        ]}
        groups={[
          {
            label: "仕事を進める",
            items: [
              {
                label: "プロジェクト",
                current: current === "project",
                accent: "green",
                href: "/review/workspace",
                icon: "layers",
                description: "仕事の進み具合を見渡す",
              },
              {
                label: "受信トレイ",
                current: current === "mail",
                accent: "blue",
                href: "/review/mail",
                icon: "mail",
                description: "届いた連絡を読む・整理する",
                keywords: ["メール", "inbox"],
              },
              {
                label: "ドキュメント",
                accent: "amber",
                href: "/files",
                icon: "file",
                description: "チームの資料を探す",
              },
              {
                label: "売上",
                accent: "coral",
                href: "/sales",
                icon: "chart",
                description: "数字と動きを確かめる",
              },
            ],
          },
          {
            label: "Plyを使う",
            items: [
              {
                label: "コンポーネントカタログ",
                href: "/components",
                icon: "grid",
                description: "コンポーネントと使い方を見る",
              },
              {
                label: "全体の組み合わせ",
                href: "/review/applications",
                icon: "compare",
                description: "違う仕事への組み立て方",
              },
            ],
          },
        ]}
      />
    }
    account={<Avatar name="田中 遥" initials="遥" tone="coral" title="田中 遥 · つむぐチーム" />}
  >
    {children}
  </AppShell>
);

const members = [
  { name: "田中 遥", initials: "遥", tone: "coral" },
  { name: "佐藤 健", initials: "健", tone: "blue" },
  { name: "森 美咲", initials: "美", tone: "green" },
] as const;
const jobs = [
  {
    title: "よくある質問を集める",
    category: "リサーチ",
    column: 0,
    owner: 0,
  },
  {
    title: "記事の見つけ方を考える",
    category: "デザイン",
    column: 0,
    owner: 2,
  },
  {
    title: "はじめての方向けガイド",
    category: "コンテンツ",
    column: 1,
    owner: 0,
  },
  {
    title: "スマートフォンで読みやすく",
    category: "デザイン",
    column: 1,
    owner: 1,
  },
  {
    title: "チームでゴールを揃える",
    category: "準備",
    column: 2,
    owner: 2,
  },
  {
    title: "記事の棚卸し",
    category: "コンテンツ",
    column: 2,
    owner: 1,
  },
] as const;
const lanes = ["これから", "進めている", "できた！"] as const;

const ProjectBoard = () => (
  <Board
    label="ヘルプセンターの仕事"
    columns={lanes.map((title, column) => ({
      title,
      tone: (["neutral", "info", "success"] as const)[column],
      count: jobs.filter((job) => job.column === column).length,
      empty: "ここに並ぶ仕事はありません。",
      content: jobs
        .filter((job) => job.column === column)
        .map((job) => {
          const person = members[job.owner];
          return (
            <Card
              title={job.title}
              data-density="compact"
              data-state={column === 2 ? "complete" : undefined}
              eyebrow={
                <Tag
                  label={job.category}
                  accent={
                    job.category === "デザイン"
                      ? "coral"
                      : job.category === "コンテンツ"
                        ? "blue"
                        : "amber"
                  }
                />
              }
              footer={
                <>
                  <Avatar {...person} size="small" />
                  <Select
                    data-variant="inline"
                    aria-label={`${job.title}の状態`}
                    data-action="change->project-demo#move"
                  >
                    {lanes.map((label, index) => (
                      <option value={String(index)} selected={index === column}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </>
              }
            >
              {job.title === "はじめての方向けガイド" && (
                <Progress label="記事の準備" value={2} max={4} />
              )}
              {job.title === "記事の棚卸し" && (
                <Badge tone="success">24本の記事を整理しました</Badge>
              )}
            </Card>
          );
        }),
    }))}
  />
);

export const WorkspaceProject = () => (
  <WorkspaceFrame>
    <div class="ply-stack" data-controller="project-demo">
      <PageHeader
        title="ヘルプセンターのリニューアル"
        icon={<Icon name="layers" />}
        description="迷わず答えにたどり着ける場所へ。9月30日公開。"
        actions={
          <Dialog
            id="workspace-add"
            title="新しいタスク"
            trigger="＋ タスクを追加"
            triggerVariant="primary"
            initialFocus="content"
          >
            <form class="ply-stack" data-action="submit->project-demo#add">
              <Field id="workspace-task" label="何をしますか？">
                {(attributes) => (
                  <Input
                    {...attributes}
                    name="task"
                    required
                    placeholder="例：記事のタイトルを見直す"
                  />
                )}
              </Field>
              <Button type="submit" variant="primary" disabled>
                追加する
              </Button>
            </form>
            <p role="status" data-project-demo-target="status" />
          </Dialog>
        }
      />
      <Tabs
        id="workspace-views"
        label="プロジェクトの表示"
        items={[
          {
            value: "board",
            label: "ボード",
            icon: <Icon name="grid" />,
            content: (
              <>
                <div class="ply-toolbar" role="group" aria-label="ボードの絞り込み">
                  <div class="start">
                    <InputGroup
                      id="workspace-search"
                      type="search"
                      aria-label="タスクを探す"
                      placeholder="タスクを探す…"
                      prefix={<Icon name="search" />}
                      data-action="input->project-demo#filter"
                    />
                  </div>
                  <div class="end">
                    <div class="ply-cluster">
                      {members.map((person) => (
                        <Avatar {...person} size="small" />
                      ))}
                      <Badge tone="info">9月30日公開</Badge>
                    </div>
                  </div>
                </div>
                <ProjectBoard />
                <p class="ply-save-status" role="status" data-project-demo-target="filterStatus" />
                <p class="ply-save-status" role="status" data-project-demo-target="status" />
              </>
            ),
          },
          {
            value: "checklist",
            label: "今週のチェック",
            icon: <Icon name="check" />,
            count: 3,
            content: (
              <SplitView
                primary={
                  <Section title="公開前に確かめること" tone="info">
                    <TaskList
                      label="公開前のチェック"
                      data-action="change->project-demo#check"
                      data-project-demo-target="checklist"
                      items={[
                        {
                          name: "workspace-links",
                          label: "リンク切れがないか確認する",
                          detail: "記事の中から、次のページへ進めるか。",
                          checked: true,
                          end: <Avatar {...members[1]} size="small" />,
                        },
                        {
                          name: "workspace-mobile",
                          label: "スマートフォンで読んでみる",
                          detail: "小さい文字、長い見出し、操作しづらいボタンがないか。",
                          end: <Avatar {...members[0]} size="small" />,
                        },
                        {
                          name: "workspace-first",
                          label: "はじめて使う人に試してもらう",
                          detail: "説明なしで、知りたいことを見つけられるか。",
                          end: <Avatar {...members[2]} size="small" />,
                        },
                      ]}
                    />
                  </Section>
                }
                secondary={
                  <div class="ply-stack">
                    <Progress
                      label="チェックの進み具合"
                      value={1}
                      max={3}
                      data-project-demo-target="progress"
                    />
                    <ValueList
                      items={[
                        { label: "公開予定", value: "9月30日（水）" },
                        { label: "対象", value: "初めて利用するお客さま" },
                      ]}
                    />
                  </div>
                }
              />
            ),
          },
          {
            value: "conversation",
            label: "会話",
            icon: <Icon name="chat" />,
            count: 2,
            content: (
              <Section title="チームのやりとり">
                <Message
                  author="森 美咲"
                  time="今日 10:24"
                  datetime="2026-09-15T10:24:00+09:00"
                  avatar={<Avatar {...members[2]} size="small" />}
                  replies={
                    <Message
                      author="田中 遥"
                      time="今日 10:31"
                      datetime="2026-09-15T10:31:00+09:00"
                      avatar={<Avatar {...members[0]} size="small" />}
                    >
                      <p>まずは「はじめての方へ」から、実際の記事を入れて試してみましょう。</p>
                    </Message>
                  }
                >
                  <p>記事のカテゴリ、5つに絞ってみました。これなら最初の画面で見渡せそうです。</p>
                  <Card
                    title="「はじめての方へ」を、いちばんの入口に"
                    eyebrow={<Tag label="アイデア" accent="amber" />}
                  >
                    <p>
                      最初のページでは、登録から使い始めるまでをひと続きに。設定やお支払いの細かい話は、その先で案内します。
                    </p>
                  </Card>
                </Message>
              </Section>
            ),
          },
        ]}
      />
    </div>
  </WorkspaceFrame>
);
