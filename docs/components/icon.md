<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Icon

操作や用途の文言を補う小さな図形。

## 使いどころ

- 操作名や項目名の前に置き、文言を補う時に使います。アイコンだけで意味を伝えません。
- 縦に並ぶ一覧のように、塗ったアイコンで項目を見分ける場所では `fill` の塗りつぶしの版を使います。
- アイコンだけのボタンは、`Button` に `aria-label` を付けて作ります。
- `Button`・`ActionLink` の中では、`Icon` を文言の前にそのまま置きます。アイコンと文言の間隔と縦の配置は `Button` が持つので、クラスは要りません。

## 使い方

`name` にアイコンの名前を渡します。Phosphor Icons（MIT）のregularを共通で使い、`fill` で同じ絵柄の塗りつぶしの版にします。

大きさは文字に合わせた1em、`data-size="small"` は6em/7です。14pxの文字なら14px・12pxの枠になります。名前による大きさや太さの分岐はありません。大きなショートカットや空状態の図は、その役割を持つ親要素が大きさを決めます。色は文字の色を継ぎます。

`Icon` は外部のSVGスプライトを `<use>` で参照します。pathを出現箇所ごとに埋め込まないので、HTMLが重複せず、スプライトは共通のリソースとしてキャッシュできます。パッケージの `ply/icons.svg`（`dist/icons.svg`）を、アプリと同じオリジンに置きます。既定のURLは `/assets/ply-icons.svg` で、別の場所に置いた時は `sprite` で指定します。キャッシュ期間は利用側のHTTPヘッダーで決めます。

JavaScriptは使いません。CSSだけで使う時も、`class="ply-icon"`・`viewBox="0 0 256 256"`・`aria-hidden="true"`・`focusable="false"` の `svg` に `<use href="/assets/ply-icons.svg#ply-pencil">` を書きます。塗りつぶしの版は `#ply-pencil-fill` です。

Checkbox・TaskListのチェックマークとSelectの矢印は、同じ素材から作った単独のSVGをCSSのmaskや背景として使います。

使える名前は `src/internal/icon-manifest.json` で決まります。キーが `name` に渡す名前、値がPhosphor Iconsの元の名前です。追加する時はこのファイルに書き、`vp run icons:build` でスプライト・CSS用の単独SVG・`IconName` 型を作り直します。スプライトの中と `dist/PHOSPHOR-LICENSE` に、MITの著作権・許諾文を同梱しています。

## アクセシビリティ

- `Icon` は `aria-hidden="true"`・`focusable="false"` で、読み上げとフォーカスから外れます。
- 意味は隣の文言か、操作の `aria-label` で伝えます。

## API

### Icon

装飾アイコン。意味と操作名は隣の文言または操作コンポーネントのaria-labelで伝える。

| 名前           | 型         | 既定値                    | 説明                                                                                       |
| -------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| `name`（必須） | `IconName` |                           | アイコンの名前。使える名前はdocs/icons.mdの「使えるアイコン」を見る。                      |
| `fill`         | `boolean`  | `false`                   | 塗りつぶし版。縦並びの一覧など、太いアイコンで項目を見分ける場所で使う。                   |
| `sprite`       | `string`   | `"/assets/ply-icons.svg"` | スプライトのURL。配布のicons.svgを既定と別の場所に置いた時に指定する。同じオリジンに置く。 |
| `class`        | `string`   |                           | svgに追加するクラス。ルートのply-iconは常に付く。                                          |
| `data-size`    | `"small"`  |                           | smallは6em/7の大きさにする。渡さなければ1em（文字と同じ大きさ）。                          |

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/icon.css`

#### `IconName`

値：docs/icons.mdの「使えるアイコン」の名前

## コード

```tsx
import { Icon, Button, ActionLink, Disclosure, DisclosureGroup } from "ply/hono";

const names = [
  "pencil",
  "search",
  "calendar",
  "files",
  "file",
  "chart",
  "check",
  "layers",
  "arrow",
  "eye",
  "eye-slash",
  "compare",
  "caret",
  "trash",
  "x",
  "x-circle",
  "info",
  "mail",
  "chat",
  "grid",
  "grip",
  "equals",
  "plus",
] as const;
export default () => (
  <div class="ply-stack">
    <div class="ply-cluster">
      <Button>
        <Icon name="pencil" />
        編集する
      </Button>
      <ActionLink href="/apps/search">
        <Icon name="search" />
        記事を探す
      </ActionLink>
      <Button aria-label="削除する" data-icon-only="true" variant="danger">
        <Icon name="trash" />
      </Button>
    </div>
    <div class="ply-cluster">
      <span>
        <Icon name="calendar" /> 9月25日の予定
      </span>
      <span>
        <Icon name="file" /> 添付ファイル
      </span>
    </div>
    <div class="ply-cluster">
      <Button disabled>
        <Icon name="check" />
        確認済み
      </Button>
      <Button size="large">
        <Icon name="pencil" />
        記事を書く
      </Button>
    </div>
    <DisclosureGroup label="アイコンの一覧と塗りつぶしの形">
      <Disclosure summary="すべてのアイコン（通常の形と塗りつぶしの形）">
        <ul class="catalog-icon-grid">
          {names.map((name) => (
            <li>
              <span class="pair">
                <Icon name={name} />
                <Icon name={name} fill />
              </span>
              <code>{name}</code>
            </li>
          ))}
        </ul>
      </Disclosure>
      <Disclosure summary="塗りつぶしのアイコンで項目を見分ける">
        <ul class="catalog-icon-rows">
          <li>
            <Icon name="mail" fill />
            受信箱
          </li>
          <li>
            <Icon name="calendar" fill />
            予定
          </li>
          <li>
            <Icon name="files" fill />
            すべてのファイル
          </li>
        </ul>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<div class="ply-stack">
  <div class="ply-cluster">
    <button
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      <svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-pencil"></use></svg
      >編集する</button
    ><a
      href="/apps/search"
      class="ply-button"
      data-variant="secondary"
      data-size="default"
      ><svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-search"></use></svg
      >記事を探す</a
    ><button
      aria-label="削除する"
      data-icon-only="true"
      class="ply-button"
      type="button"
      data-variant="danger"
      data-size="default"
    >
      <svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-trash"></use>
      </svg>
    </button>
  </div>
  <div class="ply-cluster">
    <span
      ><svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-calendar"></use>
      </svg>
      9月25日の予定</span
    ><span
      ><svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-file"></use>
      </svg>
      添付ファイル</span
    >
  </div>
  <div class="ply-cluster">
    <button
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
      disabled=""
    >
      <svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-check"></use></svg
      >確認済み</button
    ><button
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="large"
    >
      <svg
        class="ply-icon"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <use href="/assets/ply-icons.svg#ply-pencil"></use></svg
      >記事を書く
    </button>
  </div>
  <div
    class="ply-disclosure-group"
    role="group"
    aria-label="アイコンの一覧と塗りつぶしの形"
  >
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
          ><span class="title">すべてのアイコン（通常の形と塗りつぶしの形）</span></span
        >
      </summary>
      <div class="body">
        <ul class="catalog-icon-grid">
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-pencil"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-pencil-fill"></use></svg></span
            ><code>pencil</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-search"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-search-fill"></use></svg></span
            ><code>search</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-calendar"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-calendar-fill"></use></svg></span
            ><code>calendar</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-files"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-files-fill"></use></svg></span
            ><code>files</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-file"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-file-fill"></use></svg></span
            ><code>file</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-chart"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-chart-fill"></use></svg></span
            ><code>chart</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-check"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-check-fill"></use></svg></span
            ><code>check</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-layers"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-layers-fill"></use></svg></span
            ><code>layers</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-arrow"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-arrow-fill"></use></svg></span
            ><code>arrow</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-eye"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-eye-fill"></use></svg></span
            ><code>eye</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-eye-slash"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-eye-slash-fill"></use></svg></span
            ><code>eye-slash</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-compare"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-compare-fill"></use></svg></span
            ><code>compare</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-caret"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-caret-fill"></use></svg></span
            ><code>caret</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-trash"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-trash-fill"></use></svg></span
            ><code>trash</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x-fill"></use></svg></span
            ><code>x</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x-circle"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x-circle-fill"></use></svg></span
            ><code>x-circle</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-info"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg></span
            ><code>info</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-mail"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-mail-fill"></use></svg></span
            ><code>mail</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-chat"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-chat-fill"></use></svg></span
            ><code>chat</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-grid"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-grid-fill"></use></svg></span
            ><code>grid</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-grip"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-grip-fill"></use></svg></span
            ><code>grip</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-equals"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-equals-fill"></use></svg></span
            ><code>equals</code>
          </li>
          <li>
            <span class="pair"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-plus"></use></svg
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-plus-fill"></use></svg></span
            ><code>plus</code>
          </li>
        </ul>
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
          ><span class="title">塗りつぶしのアイコンで項目を見分ける</span></span
        >
      </summary>
      <div class="body">
        <ul class="catalog-icon-rows">
          <li>
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-mail-fill"></use></svg
            >受信箱
          </li>
          <li>
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-calendar-fill"></use></svg
            >予定
          </li>
          <li>
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-files-fill"></use></svg
            >すべてのファイル
          </li>
        </ul>
      </div>
    </details>
  </div>
</div>
```

</details>
