<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Surface

中央の作業面。仕事の中身を一枚の白い面にまとめます。AppShellの作業面と同じ見た目で、AppShellを使わない画面で使います。

## 使いどころ

- `AppShell`を使わない画面や`Wing`の中央で、仕事の中身を一枚の白い作業面にまとめる時に使います。見た目は`AppShell`の作業面と同じです。
- 一件の内容の紙は`Card`、役割の色を持つ知らせは`Notice`を使います。作業面の中に作業面を重ねません。

## 使い方

`children`を本文として、一律の余白を取った面に置きます。本文の段の間は16pxです。

`context`に`ContextBar`を渡すと、面の上端にパンくずと補助操作の帯を置き、本文をそのすぐ下から始めます。帯は区切り線を持たず、本文と同じ左右の余白に揃います。

`layout="document"`は、本文とパンくずを42remの行長に収め、広い面では左右の余白を広げます。記事や資料など、読む画面に使います。

面の幅が40rem未満では、左右の余白を詰めます。

## API

### Surface

作業面（sheet）。AppShellを使わない画面で、仕事の中身を一枚の白い面にまとめる。見た目の定義はAppShellの作業面と共通。一件の紙はCard、役割の色の面はNoticeを使う。

| 名前       | 型                         | 既定値       | 説明                                     |
| ---------- | -------------------------- | ------------ | ---------------------------------------- |
| `context`  | `Child`                    |              | 上端のパンくずや補助操作（ContextBar）。 |
| `layout`   | `"standard" \| "document"` | `"standard"` | documentは本文を読みやすい行長に収める。 |
| `children` | `Child`                    |              | 作業面の本文。                           |

ほかに、`<div>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/surface.css`

## コード

```tsx
import {
  Surface,
  ContextBar,
  PageHeader,
  ActionLink,
  Section,
  DataList,
  Disclosure,
  DisclosureGroup,
} from "ply/hono";

const items = [
  {
    title: "秋の読書会",
    description: "最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。",
    meta: "田中 遥 · 9月25日",
  },
  {
    title: "仕事場の案内",
    description: "利用時間とキャンセル条件を見直します。",
    meta: "佐藤 健 · 9月24日",
  },
];

export default () => (
  <div class="ply-stack" data-space="small">
    <Surface
      context={
        <ContextBar
          items={[{ label: "仕事場", href: "/apps/docs" }, { label: "記事" }]}
        >
          <ActionLink href="/apps/docs" size="compact">
            記事を書く
          </ActionLink>
        </ContextBar>
      }
    >
      <PageHeader
        title="記事"
        description="仕事場のお知らせと、日々の記録をまとめます。"
      />
      <Section title="最近の記事" count={items.length}>
        <DataList items={items} />
      </Section>
    </Surface>
    <DisclosureGroup label="作業面の使い方">
      <Disclosure summary="文書：本文を読みやすい行長に収める">
        <Surface
          layout="document"
          context={
            <ContextBar
              items={[{ label: "記事", href: "/apps/docs" }, { label: "秋の読書会" }]}
            />
          }
        >
          <PageHeader
            title="秋の読書会"
            description="9月25日 18:00から、2階の小部屋で開きます。"
          />
          <p>
            最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。途中からの参加や、読みかけの本でもかまいません。広い画面でも本文は読みやすい行長に収まり、左右の余白が広がります。
          </p>
        </Surface>
      </Disclosure>
      <Disclosure summary="パンくずなし">
        <Surface>
          <PageHeader title="はじめに" />
          <p>パンくずを持たない画面では、見出しから作業面が始まります。</p>
        </Surface>
      </Disclosure>
      <Disclosure summary="狭い場所：左右の余白を詰める">
        <div style="max-inline-size: 22rem">
          <Surface
            context={<ContextBar items={[{ label: "仕事場" }, { label: "記事" }]} />}
          >
            <PageHeader title="とても長い名前の記事の一覧と、その下書きをまとめた場所" />
            <DataList items={items} />
          </Surface>
        </div>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <div dir="rtl" lang="ar">
          <Surface
            context={
              <ContextBar items={[{ label: "مساحة العمل" }, { label: "المقالات" }]} />
            }
          >
            <PageHeader
              title="المقالات"
              description="أخبار مساحة العمل والسجلات اليومية."
            />
            <p>تبدأ الصفحة من اليمين، وتبقى المسافات متساوية على الجانبين.</p>
          </Surface>
        </div>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<div class="ply-stack" data-space="small">
  <div class="ply-surface" data-layout="standard">
    <div class="ply-context-bar">
      <nav class="ply-breadcrumb" aria-label="現在の位置と関連する操作">
        <ol>
          <li><a href="/apps/docs">仕事場</a></li>
          <li><span aria-current="page">記事</span></li>
        </ol>
      </nav>
      <div class="actions">
        <a
          href="/apps/docs"
          class="ply-button"
          data-variant="secondary"
          data-size="compact"
          >記事を書く</a
        >
      </div>
    </div>
    <div class="body">
      <header class="ply-page-header" data-align="start">
        <hgroup class="heading">
          <h1>記事</h1>
          <p>仕事場のお知らせと、日々の記録をまとめます。</p>
        </hgroup>
      </header>
      <section class="ply-section" data-tone="neutral">
        <header class="heading">
          <h2>最近の記事</h2>
          <span class="count">2</span>
        </header>
        <ul class="ply-data-list">
          <li>
            <div class="body">
              <strong class="title">秋の読書会</strong>
              <p class="description">
                最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。
              </p>
              <div class="meta">田中 遥 · 9月25日</div>
            </div>
          </li>
          <li>
            <div class="body">
              <strong class="title">仕事場の案内</strong>
              <p class="description">利用時間とキャンセル条件を見直します。</p>
              <div class="meta">佐藤 健 · 9月24日</div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
  <div class="ply-disclosure-group" role="group" aria-label="作業面の使い方">
    <details class="ply-disclosure">
      <summary>
        <span class="marker" aria-hidden="true"
          ><svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-caret"></use></svg></span
        ><span class="label"
          ><span class="title">文書：本文を読みやすい行長に収める</span></span
        >
      </summary>
      <div class="body">
        <div class="ply-surface" data-layout="document">
          <div class="ply-context-bar">
            <nav class="ply-breadcrumb" aria-label="現在の位置と関連する操作">
              <ol>
                <li><a href="/apps/docs">記事</a></li>
                <li><span aria-current="page">秋の読書会</span></li>
              </ol>
            </nav>
          </div>
          <div class="body">
            <header class="ply-page-header" data-align="start">
              <hgroup class="heading">
                <h1>秋の読書会</h1>
                <p>9月25日 18:00から、2階の小部屋で開きます。</p>
              </hgroup>
            </header>
            <p>
              最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。途中からの参加や、読みかけの本でもかまいません。広い画面でも本文は読みやすい行長に収まり、左右の余白が広がります。
            </p>
          </div>
        </div>
      </div>
    </details>
    <details class="ply-disclosure">
      <summary>
        <span class="marker" aria-hidden="true"
          ><svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-caret"></use></svg></span
        ><span class="label"><span class="title">パンくずなし</span></span>
      </summary>
      <div class="body">
        <div class="ply-surface" data-layout="standard">
          <div class="body">
            <header class="ply-page-header" data-align="start">
              <hgroup class="heading"><h1>はじめに</h1></hgroup>
            </header>
            <p>パンくずを持たない画面では、見出しから作業面が始まります。</p>
          </div>
        </div>
      </div>
    </details>
    <details class="ply-disclosure">
      <summary>
        <span class="marker" aria-hidden="true"
          ><svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-caret"></use></svg></span
        ><span class="label"
          ><span class="title">狭い場所：左右の余白を詰める</span></span
        >
      </summary>
      <div class="body">
        <div style="max-inline-size: 22rem">
          <div class="ply-surface" data-layout="standard">
            <div class="ply-context-bar">
              <nav class="ply-breadcrumb" aria-label="現在の位置と関連する操作">
                <ol>
                  <li><span>仕事場</span></li>
                  <li><span aria-current="page">記事</span></li>
                </ol>
              </nav>
            </div>
            <div class="body">
              <header class="ply-page-header" data-align="start">
                <hgroup class="heading">
                  <h1>とても長い名前の記事の一覧と、その下書きをまとめた場所</h1>
                </hgroup>
              </header>
              <ul class="ply-data-list">
                <li>
                  <div class="body">
                    <strong class="title">秋の読書会</strong>
                    <p class="description">
                      最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。
                    </p>
                    <div class="meta">田中 遥 · 9月25日</div>
                  </div>
                </li>
                <li>
                  <div class="body">
                    <strong class="title">仕事場の案内</strong>
                    <p class="description">利用時間とキャンセル条件を見直します。</p>
                    <div class="meta">佐藤 健 · 9月24日</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </details>
    <details class="ply-disclosure">
      <summary>
        <span class="marker" aria-hidden="true"
          ><svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-caret"></use></svg></span
        ><span class="label"><span class="title">右から左に読む場合</span></span>
      </summary>
      <div class="body">
        <div dir="rtl" lang="ar">
          <div class="ply-surface" data-layout="standard">
            <div class="ply-context-bar">
              <nav class="ply-breadcrumb" aria-label="現在の位置と関連する操作">
                <ol>
                  <li><span>مساحة العمل</span></li>
                  <li><span aria-current="page">المقالات</span></li>
                </ol>
              </nav>
            </div>
            <div class="body">
              <header class="ply-page-header" data-align="start">
                <hgroup class="heading">
                  <h1>المقالات</h1>
                  <p>أخبار مساحة العمل والسجلات اليومية.</p>
                </hgroup>
              </header>
              <p>تبدأ الصفحة من اليمين، وتبقى المسافات متساوية على الجانبين.</p>
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
```

</details>
