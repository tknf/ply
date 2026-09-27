import type { ExampleContext } from "../hono-examples";
import { getHonoExample } from "../hono-examples";
import {
  Badge,
  Button,
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

/** 規則と立体感を、部品単体ではなく組み合わせた画面で確かめるための見本。 */
const Form = () => (
  <form class="ply-stack">
    <Notice label="公開前に確認してください" tone="warning">
      <p>エラーのある欄を直すと、公開できます。</p>
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
            end: <Badge tone="success">承認済み</Badge>,
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
      検索の一致は<mark>淡い黄色の地</mark>で示します。長い一致が行をまたいでも、
      <mark>各行に同じ地を敷きます。</mark>
    </p>
  </div>
);

const changed = [
  ["wing", "Wing：閉じるとボタンが縁から覗き、開くとボタンと名前の見出し"],
  ["message-list", "MessageList：人の円と罫線の行、未読は青い点"],
  ["action-list", "ActionList：罫線の行、道具の色はアイコンだけ"],
  ["data-list", "DataList：罫線の行、開いている行は淡い青と青い印"],
  ["task-list", "TaskList：罫線の行、完了はペンで書くチェック"],
  ["card", "Card：紙の影、題名は本文の大きさ"],
  ["board", "Board：列の色で染めた紙、運ぶ紙は傾く"],
  ["composer", "Composer：紙の影の書く面、フォーカスの輪"],
  ["split-view", "SplitView：細い罫線と控えめなつまみ"],
  ["comparison", "Comparison：平らな面、古い側は控えめな文字"],
  ["notice", "Notice：役割の色の面"],
  ["error-summary", "ErrorSummary：危険の色の面と直す所の一覧"],
  ["danger-zone", "DangerZone：危険の色の淡い面"],
  ["empty-state", "EmptyState：アイコン・題名・説明を中央に"],
  ["badge", "Badge：役割の色のピル"],
  ["tag", "Tag：役割の色の枠のピル"],
  ["tabs", "Tabs：今のタブは太字と下の青い印"],
  ["editable-property", "EditableProperty：書き換えられる値に細い下線"],
  ["code-block", "CodeBlock：平らな面、目印の行は淡い黄色"],
  ["progress", "Progress：溝と帯"],
  ["loading", "Loading：回る丸・点・輪"],
  ["divider", "Divider：見出しから伸びる線"],
  ["toast", "Toast：浮かぶ紙を下から差し出す"],
  ["button", "Button：ピル、高さ40px"],
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
      description="形・紙・状態の規則と立体感を、組み合わせた画面で確かめます。"
    />
    <Tabs
      id="specimen-tabs"
      label="見本の画面"
      selected="form"
      items={[
        { value: "form", label: "記事を書く", content: <Form /> },
        { value: "list", label: "記事を探す", count: 3, content: <List /> },
        { value: "changed", label: "変えたコンポーネント", content: <Changed context={context} /> },
      ]}
    />
  </Surface>
);
