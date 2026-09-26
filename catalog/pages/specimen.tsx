import type { ExampleContext } from "../hono-examples";
import { getHonoExample } from "../hono-examples";
import {
  Badge,
  Button,
  Card,
  CheckboxGroup,
  ContextBar,
  DataList,
  Field,
  Input,
  Notice,
  PageHeader,
  Section,
  Select,
  Surface,
  Tabs,
  Textarea,
} from "../../src/hono";

/** 規則と手触りを、部品単体ではなく組み合わせた画面で確かめるための見本。 */
const Form = () => (
  <form class="ply-stack">
    <Notice label="公開前に確認してください" tone="warning">
      <p>赤ペンの波線がある欄を直すと、公開できます。</p>
    </Notice>
    <div class="ply-split">
      <Field id="specimen-title" label="記事名" error="記事名は40文字以内にしてください。">
        {(attributes) => (
          <Input
            {...attributes}
            value="はじめて仕事場を使う方へ、予約から当日の受付までの流れをまとめた案内"
          />
        )}
      </Field>
      <Field id="specimen-category" label="分類">
        {(attributes) => (
          <Select {...attributes}>
            <option>お知らせ</option>
            <option>暮らし</option>
          </Select>
        )}
      </Field>
      <Field id="specimen-search" label="関連する記事を探す">
        {(attributes) => <Input {...attributes} type="search" placeholder="記事名で探す" />}
      </Field>
      <Field id="specimen-date" label="公開日">
        {(attributes) => <Input {...attributes} type="date" value="2026-09-30" />}
      </Field>
      <Field id="specimen-owner" label="担当者（変更不可）">
        {(attributes) => <Input {...attributes} value="田中 遥" disabled />}
      </Field>
      <Field id="specimen-id" label="管理番号">
        {(attributes) => <Input {...attributes} value="workspace-2026-0930" readonly />}
      </Field>
    </div>
    <Field id="specimen-body" label="本文">
      {(attributes) => (
        <Textarea {...attributes} rows={4}>
          予約から当日の受付まで、はじめての方がつまずきやすい所を順にまとめました。
        </Textarea>
      )}
    </Field>
    <CheckboxGroup
      legend="公開する場所"
      name="specimen-places"
      selected={["top", "news"]}
      options={[
        { value: "top", label: "トップページ" },
        { value: "news", label: "お知らせ一覧" },
        { value: "mail", label: "メールマガジン", description: "次回の配信に含めます。" },
      ]}
    />
    <div class="ply-cluster">
      <Button variant="primary">公開する</Button>
      <Button>下書きに保存</Button>
      <Button disabled>予約する</Button>
    </div>
  </form>
);

const List = () => (
  <div class="ply-stack">
    <Section title="「受付」を含む記事" count={3}>
      <DataList
        items={[
          {
            title: "当日の受付",
            description: "初めての方は、入口右手の窓口で名前をお伝えください。",
            meta: "田中 遥 · 9月15日",
            end: (
              <Badge tone="success" stamped>
                承認済み
              </Badge>
            ),
          },
          {
            title: "予約の変更と取り消し",
            description: "前日までの取り消しは無料です。当日の変更は受付にご相談ください。",
            meta: "佐藤 健 · 9月14日",
            end: <Badge draft>下書き</Badge>,
            current: true,
          },
          {
            title: "会議室の使い方",
            description: "予約した時間の5分前から、受付で鍵をお渡しします。",
            meta: "森 美咲 · 9月12日",
            end: <Badge tone="info">確認待ち</Badge>,
          },
        ]}
      />
    </Section>
    <p>
      検索の一致は<mark>蛍光ペン</mark>で示します。長い一致が行をまたいでも、
      <mark>各行に同じ帯を引き、端を少し斜めに切ります。</mark>
    </p>
  </div>
);

const cardSamples = () => (
  <>
    <Card
      title="秋の読書会"
      tab="イベント"
      pinned
      footer={
        <>
          <span>9月25日 18:00</span>
          <span>あと4席</span>
        </>
      }
    >
      <p>最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。</p>
    </Card>
    <Card
      title="受付の手順についての相談"
      tab="スレッド"
      stacked
      footer={
        <>
          <span>返信 4件</span>
          <span>9月14日</span>
        </>
      }
    >
      <p>後ろに続きがある項目は、重ねた紙で示します。</p>
      <Badge tone="success" stamped>
        承認済み
      </Badge>
    </Card>
  </>
);

const listItems = [
  {
    title: "当日の受付",
    description: "初めての方は、入口右手の窓口で名前をお伝えください。",
    meta: "田中 遥 · 9月15日",
    end: (
      <Badge tone="success" stamped>
        承認済み
      </Badge>
    ),
  },
  {
    title: "予約の変更と取り消し",
    description: "前日までの取り消しは無料です。当日の変更は受付にご相談ください。",
    meta: "佐藤 健 · 9月14日",
    end: <Badge draft>下書き</Badge>,
    current: true,
  },
  {
    title: "会議室の使い方",
    description: "予約した時間の5分前から、受付で鍵をお渡しします。",
    meta: "森 美咲 · 9月12日",
    end: <Badge tone="info">確認待ち</Badge>,
  },
];

/** まだ決めていない形を並べて選ぶ。採用した案だけコンポーネントへ移す。 */
const Choices = () => (
  <div class="ply-stack">
    <Section title="Card：上端をまたぐつまみ・固定・重ねた紙" count={2}>
      <div class="specimen-choices">{cardSamples()}</div>
    </Section>
    <Section title="案：Notice（付箋）" count={2}>
      <div class="specimen-choices">
        {(["straight", "tilted"] as const).map((variant) => (
          <figure>
            <figcaption>
              {variant === "straight"
                ? "1. まっすぐ貼る"
                : "2. 少し傾けて貼る（一枚ずつ向きを変える）"}
            </figcaption>
            <div class={`ply-stack specimen-notes-${variant}`}>
              <Notice label="公開期限は明日です" tone="warning">
                <p>9月16日を過ぎると、共有リンクから記事を閲覧できなくなります。</p>
              </Notice>
              <Notice label="変更は保存後に反映されます">
                <p>入力を終えたら、このページの「設定を保存」を押してください。</p>
              </Notice>
              <Notice label="招待を送りました" tone="success">
                <p>相手が参加すると、メンバーの一覧に表示されます。</p>
              </Notice>
              <Notice label="添付ファイルを送信できませんでした" tone="danger">
                <p>入力した内容は残っています。接続を確認してから、もう一度送信してください。</p>
              </Notice>
            </div>
          </figure>
        ))}
      </div>
    </Section>
    <Section title="DataList：紙の短冊と朱の余白線">
      <div class="specimen-choices">
        <figure>
          <figcaption>
            余白線は印を付ける場所。今、隣で開いている行は余白線が青く太くなり、リンクの行は指を載せると少し引き出される
          </figcaption>
          <DataList
            items={listItems.map((item, index) => ({
              ...item,
              href: `/review/specimen#item-${index}`,
            }))}
          />
        </figure>
      </div>
    </Section>
  </div>
);

const changed = [
  ["notice", "Notice：枠線なし、役割の色の面"],
  ["action-list", "ActionList：枠なし、始まりと終わりの罫線"],
  ["message-list", "MessageList：枠なし、行の罫線"],
  ["task-list", "TaskList：枠なし、行の罫線"],
  ["comparison", "Comparison：枠なし、上下の罫線と縦の罫線"],
  ["split-view", "SplitView：枠なし、上下の罫線"],
  ["composer", "Composer：書く紙（枠線なし、紙の影）"],
  ["board", "Board：列は色の面、項目は紙"],
  ["danger-zone", "DangerZone：危険の色のミシン目"],
  ["editable-property", "EditableProperty：値は記入線の上"],
  ["code-block", "CodeBlock：枠線なし、面の色"],
  ["tabs", "Tabs：墨のつまみ"],
  ["badge", "Badge：貼ったシールと丸シール、台紙のままの下書き、ゴム印"],
  ["error-summary", "ErrorSummary：添削用紙（危険の色の札、朱の余白線と赤ペンの番号）"],
  ["empty-state", "EmptyState：重ねた紙（白紙・罫線の便箋・ペンで描くチェック）"],
  ["progress", "Progress：定規の溝と目盛り、インクの帯"],
  ["button", "Button：ピル"],
] as const;

const Changed = ({ context }: { context: ExampleContext }) => (
  <div class="ply-stack">
    {changed.map(([id, label]) => (
      <Section title={label}>
        <div class="specimen-example">{getHonoExample(id).render(context)}</div>
      </Section>
    ))}
  </div>
);

export const Specimen = ({ context }: { context: ExampleContext }) => (
  <Surface
    context={
      <ContextBar
        items={[{ label: "コンポーネント一覧", href: "/components" }, { label: "規則の見本" }]}
      />
    }
  >
    <PageHeader
      title="規則の見本"
      description="形・紙・状態の規則と、紙と文具の手触りを、組み合わせた画面で確かめます。"
    />
    <Tabs
      id="specimen-tabs"
      label="見本の画面"
      selected="form"
      items={[
        { value: "form", label: "記事を書く", content: <Form /> },
        { value: "list", label: "記事を探す", count: 3, content: <List /> },
        { value: "choices", label: "案を選ぶ", content: <Choices /> },
        { value: "changed", label: "変えたコンポーネント", content: <Changed context={context} /> },
      ]}
    />
  </Surface>
);
