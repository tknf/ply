<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Loading

待っている処理を言葉で示す

## 使いどころ

- 次の記事やコメントの取得など、短い待ちを何を待っているかの言葉と一緒に示す時に使います。
- 送信などボタンを押した後の待ちは、そのボタンの `busy` を使います。
- 作業量が分かる処理や、終わりの分からない長い処理は `Progress` を使います。架空の進み具合を付けません。
- 読み込んだ結果が0件だった時は `EmptyState` を使います。

## 使い方

`label` に待っている処理を書きます。印は `variant` で選び、`wave`（既定）は青から紫の三つの点が書き始めの側から順に小さく跳ね、跳ねていない点は消さずに淡くします。`orbit` は回る丸、`halo` は広がって消える輪です。

`layout="inline"` は文の流れに置く小さな印です。領域全体で待つ時は `layout="region"` にすると、面を敷かずに大きめの印と文を中央に縦に並べます。

読み込みを終えたら、Loadingを結果に置き換えます。JavaScriptは使いません。

## アクセシビリティ

- `role="status"` を持つので、`label` の文を読み上げます。印は読み上げから外します。
- 動きを減らす設定では、印の動きを止めます。

## API

### Loading

| 名前      | 型                            | 既定値          | 説明                                                                                         |
| --------- | ----------------------------- | --------------- | -------------------------------------------------------------------------------------------- |
| `label`   | `string`                      | `"読み込み中…"` | 待っている処理を表す文。印の隣に書き、role="status"で読み上げる。                            |
| `variant` | `"orbit" \| "wave" \| "halo"` | `"wave"`        | waveは青から紫の三つの点が順に跳ねる印（既定）、orbitは回る丸、haloは広がって消える輪。      |
| `layout`  | `"inline" \| "region"`        | `"inline"`      | inlineは文の流れに置く小さな印。regionは待っている領域の中央に、大きめの印と文を縦に並べる。 |

ほかに、`<p>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/loading.css`

## コード

```tsx
import { Loading, Button, Progress, Disclosure, DisclosureGroup } from "ply/hono";
export default () => (
  <div class="ply-stack">
    <Loading label="次の記事を読み込んでいます…" />
    <Loading label="プロジェクトに添付されたすべてのファイルと画像を確認しています。もう少しお待ちください。" />
    <Loading
      layout="region"
      label="資料一覧を準備しています。表示できるまで、この領域でお待ちください。"
    />
    <div class="ply-cluster">
      <Button busy busyLabel="保存しています…">
        保存する
      </Button>
      <span>操作の待ち時間は、その操作のそばに表示します。</span>
    </div>
    <Progress label="添付ファイルの処理量を確認しています" />
    <DisclosureGroup label="動きと置き場所の違い">
      <Disclosure summary="三つの動き（順に跳ねる三つの点・回る丸・広がる輪）" open>
        <div class="ply-stack" data-space="small">
          <Loading
            variant="wave"
            label="順に跳ねる三つの点（既定）：返信を読み込んでいます…"
          />
          <Loading variant="orbit" label="回る丸：次のページを読み込んでいます…" />
          <Loading variant="halo" label="広がる輪：確認しています…" />
        </div>
      </Disclosure>
      <Disclosure summary="この領域で待つ">
        <div class="ply-stack" data-space="small">
          <Loading layout="region" label="コメントを読み込んでいます…" />
          <Loading
            variant="orbit"
            layout="region"
            label="記事の一覧を読み込んでいます…"
          />
        </div>
      </Disclosure>
      <Disclosure summary="狭い場所で折り返す">
        <div class="ply-stack" data-space="small" style="max-inline-size: 14rem">
          <Loading label="秋の読書会の資料と参加者名簿を読み込んでいます…" />
          <Loading
            variant="halo"
            layout="region"
            label="https://example.com/articles/autumn-reading-club-2026 を確認しています…"
          />
        </div>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <div class="ply-stack" data-space="small" dir="rtl" lang="ar">
          <Loading variant="orbit" label="جارٍ تحميل الصفحة التالية…" />
          <Loading variant="wave" label="جارٍ كتابة الرد…" />
          <Loading variant="halo" layout="region" label="جارٍ التحقق…" />
        </div>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<div class="ply-stack">
  <p class="ply-loading" role="status" data-variant="wave" data-layout="inline">
    <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
    ><span class="label">次の記事を読み込んでいます…</span>
  </p>
  <p class="ply-loading" role="status" data-variant="wave" data-layout="inline">
    <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
    ><span class="label"
      >プロジェクトに添付されたすべてのファイルと画像を確認しています。もう少しお待ちください。</span
    >
  </p>
  <p class="ply-loading" role="status" data-variant="wave" data-layout="region">
    <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
    ><span class="label"
      >資料一覧を準備しています。表示できるまで、この領域でお待ちください。</span
    >
  </p>
  <div class="ply-cluster">
    <button
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
      data-busy="true"
      disabled=""
      aria-busy="true"
    >
      保存しています…</button
    ><span>操作の待ち時間は、その操作のそばに表示します。</span>
  </div>
  <label class="ply-progress"
    ><span class="heading"><span>添付ファイルの処理量を確認しています</span></span
    ><span class="track" data-state="indeterminate" aria-hidden="true"
      ><span class="fill"></span></span
    ><progress class="ply-visually-hidden" max="100">処理中</progress></label
  >
  <div class="ply-disclosure-group" role="group" aria-label="動きと置き場所の違い">
    <details open="" class="ply-disclosure">
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
          ><span class="title"
            >三つの動き（順に跳ねる三つの点・回る丸・広がる輪）</span
          ></span
        >
      </summary>
      <div class="body">
        <div class="ply-stack" data-space="small">
          <p class="ply-loading" role="status" data-variant="wave" data-layout="inline">
            <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
            ><span class="label"
              >順に跳ねる三つの点（既定）：返信を読み込んでいます…</span
            >
          </p>
          <p
            class="ply-loading"
            role="status"
            data-variant="orbit"
            data-layout="inline"
          >
            <span class="indicator" aria-hidden="true"></span
            ><span class="label">回る丸：次のページを読み込んでいます…</span>
          </p>
          <p class="ply-loading" role="status" data-variant="halo" data-layout="inline">
            <span class="indicator" aria-hidden="true"></span
            ><span class="label">広がる輪：確認しています…</span>
          </p>
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
        ><span class="label"><span class="title">この領域で待つ</span></span>
      </summary>
      <div class="body">
        <div class="ply-stack" data-space="small">
          <p class="ply-loading" role="status" data-variant="wave" data-layout="region">
            <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
            ><span class="label">コメントを読み込んでいます…</span>
          </p>
          <p
            class="ply-loading"
            role="status"
            data-variant="orbit"
            data-layout="region"
          >
            <span class="indicator" aria-hidden="true"></span
            ><span class="label">記事の一覧を読み込んでいます…</span>
          </p>
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
        ><span class="label"><span class="title">狭い場所で折り返す</span></span>
      </summary>
      <div class="body">
        <div class="ply-stack" data-space="small" style="max-inline-size: 14rem">
          <p class="ply-loading" role="status" data-variant="wave" data-layout="inline">
            <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
            ><span class="label">秋の読書会の資料と参加者名簿を読み込んでいます…</span>
          </p>
          <p class="ply-loading" role="status" data-variant="halo" data-layout="region">
            <span class="indicator" aria-hidden="true"></span
            ><span class="label"
              >https://example.com/articles/autumn-reading-club-2026
              を確認しています…</span
            >
          </p>
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
        <div class="ply-stack" data-space="small" dir="rtl" lang="ar">
          <p
            class="ply-loading"
            role="status"
            data-variant="orbit"
            data-layout="inline"
          >
            <span class="indicator" aria-hidden="true"></span
            ><span class="label">جارٍ تحميل الصفحة التالية…</span>
          </p>
          <p class="ply-loading" role="status" data-variant="wave" data-layout="inline">
            <span class="indicator" aria-hidden="true"><i></i><i></i><i></i></span
            ><span class="label">جارٍ كتابة الرد…</span>
          </p>
          <p class="ply-loading" role="status" data-variant="halo" data-layout="region">
            <span class="indicator" aria-hidden="true"></span
            ><span class="label">جارٍ التحقق…</span>
          </p>
        </div>
      </div>
    </details>
  </div>
</div>
```

</details>
