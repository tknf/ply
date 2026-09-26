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

const Cards = () => (
  <Section title="予定" count={3}>
    <div class="specimen-cards">
      <Card
        title="秋の読書会"
        eyebrow={<span>イベント</span>}
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
        title="仕事場の案内を更新する"
        eyebrow={<span>記事</span>}
        footer={
          <>
            <span>田中 遥</span>
            <span>9月15日</span>
          </>
        }
      >
        <p>利用時間とキャンセル条件を見直します。</p>
        <Badge tone="success" stamped>
          承認済み
        </Badge>
      </Card>
      <Card
        title="受付の手順についての相談"
        eyebrow={<span>スレッド</span>}
        stacked
        footer={
          <>
            <span>返信 4件</span>
            <span>9月14日</span>
          </>
        }
      >
        <p>後ろに続きがある項目は、重ねた紙で示します。</p>
      </Card>
    </div>
  </Section>
);

export const Specimen = () => (
  <Surface
    context={
      <ContextBar
        items={[{ label: "コンポーネント一覧", href: "/components" }, { label: "規則の見本" }]}
      />
    }
  >
    <PageHeader
      title="規則の見本"
      description="形・影・状態の規則と、紙と文具の手触りを、組み合わせた画面で確かめます。"
    />
    <Tabs
      id="specimen-tabs"
      label="見本の画面"
      selected="form"
      items={[
        { value: "form", label: "記事を書く", content: <Form /> },
        { value: "list", label: "記事を探す", count: 3, content: <List /> },
        { value: "cards", label: "予定", content: <Cards /> },
      ]}
    />
    <List />
    <Cards />
  </Surface>
);
