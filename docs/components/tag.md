<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Tag

分類や選択した条件を短く示す

## 使いどころ

- 記事の分類や、選んだ絞り込みの条件を短く示す時に使います。
- 公開中・確認待ちなどの状態は、地を塗った `Badge` で示します。Tagは地を塗らず、縁で分類を示します。
- 利用者が自由に書いてタグを足す欄は `TagInput` を使います。

## 使い方

`label` を渡します。縁は文字と同じ色、文字はMediumです。`accent` は `blue`・`green`・`amber`・`coral` から選び、渡さなければ淡い灰にします。

`href` を渡すと分類へ移るリンクになり、指を載せると役割の色を淡く敷きます。

`removeButton` を渡すと札の終わりに外す×を置きます。外した後の処理は利用側が持ちます。`href` と `removeButton` は同時に使えません。

複数の札は `TagGroup` で囲みます。札の間を0.5remあけて折り返し、長い文言も省略しません。

`Tag` は `class` などのHTML属性を受け取りません。JavaScriptは使いません。

## アクセシビリティ

- `TagGroup` は `role="group"` で、`label` を名前にします。
- 外す操作はアイコンだけのボタンなので、「暮らしを解除」のように何を外すかを `aria-label` で付けます。
- `accent` の色は見分けの補助です。意味は文言で伝えます。

## API

### Tag

| 名前                       | 型       | 既定値 | 説明                                                                                                                                                                                              |
| -------------------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`（必須）            | `string` |        | 札の文言。長い文言は省略せずに折り返す。                                                                                                                                                          |
| `accent`                   | `Accent` |        | 縁と文字の色。分類を見分けるために使う。渡さなければ淡い灰の札にする。                                                                                                                            |
| `href`                     | `string` |        | 渡すと札を分類へ移るリンクにする。removeButtonとは同時に使えない。                                                                                                                                |
| `removeButton`（形による） | `Child`  |        | 札の終わりに置く外す操作。空のButton（variant="link"・size="tag"・class="remove"・ data-icon-only="true"）に「〇〇を解除」のaria-labelを付けて渡すと、×の印を描く。外した後の処理は利用側が持つ。 |

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/tag.css`

#### `Accent`

値：`"blue" | "green" | "amber" | "coral"`

### TagGroup

| 名前            | 型       | 既定値 | 説明                                             |
| --------------- | -------- | ------ | ------------------------------------------------ |
| `label`（必須） | `string` |        | まとまりの名前。role="group"のaria-labelにする。 |
| `children`      | `Child`  |        | 並べる `Tag`。                                   |

ほかに、`<div>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/tag-group.css`

## コード

```tsx
import { Tag, TagGroup, Button, Disclosure, DisclosureGroup } from "ply/hono";

const removeButton = (label: string) => (
  <Button
    class="remove"
    variant="link"
    size="tag"
    type="button"
    data-icon-only="true"
    aria-label={`${label}を解除`}
  />
);

export default () => (
  <div class="ply-stack">
    <TagGroup label="記事の分類">
      <Tag label="暮らし" />
      <Tag label="読書会" accent="blue" />
      <Tag label="仕事場の記事" href="/apps/search?q=仕事場" />
      <Tag label="公開済み" accent="green" />
      <Tag label="確認中" accent="amber" />
    </TagGroup>
    <DisclosureGroup label="色と置き場所の違い">
      <Disclosure summary="色ごとの札" open>
        <TagGroup label="色ごとの分類">
          <Tag label="分類なし" />
          <Tag label="読書会" accent="blue" />
          <Tag label="公開済み" accent="green" />
          <Tag label="確認中" accent="amber" />
          <Tag label="要対応" accent="coral" />
        </TagGroup>
      </Disclosure>
      <Disclosure summary="分類へ移る札" open>
        <TagGroup label="分類から探す">
          <Tag label="仕事場の記事" href="/apps/search?q=仕事場" />
          <Tag label="読書会" accent="blue" href="/apps/search?q=読書会" />
          <Tag label="イベント" accent="green" href="/apps/search?q=イベント" />
          <Tag label="お知らせ" accent="amber" href="/apps/search?q=お知らせ" />
          <Tag label="締め切り" accent="coral" href="/apps/search?q=締め切り" />
        </TagGroup>
      </Disclosure>
      <Disclosure summary="外せる札">
        <TagGroup label="選んだ分類">
          <Tag label="暮らし" removeButton={removeButton("暮らし")} />
          <Tag label="読書会" accent="blue" removeButton={removeButton("読書会")} />
          <Tag label="要対応" accent="coral" removeButton={removeButton("要対応")} />
        </TagGroup>
      </Disclosure>
      <Disclosure summary="狭い場所で折り返す">
        <div style="max-inline-size: 12rem">
          <TagGroup label="長い分類">
            <Tag label="初めて仕事場を利用する方へのご案内" accent="blue" />
            <Tag label="https://example.com/articles/autumn-reading-club-2026" />
            <Tag label="秋の読書会の参加者向け" href="/apps/search?q=読書会" />
          </TagGroup>
        </div>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <div dir="rtl" lang="ar">
          <TagGroup label="التصنيفات">
            <Tag label="الحياة" />
            <Tag label="نادي القراءة" accent="blue" />
            <Tag label="الفعاليات" accent="green" href="/apps/search?q=events" />
            <Tag
              label="قيد المراجعة"
              accent="amber"
              removeButton={removeButton("قيد المراجعة")}
            />
          </TagGroup>
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
  <div class="ply-tag-group" role="group" aria-label="記事の分類">
    <span class="ply-tag">暮らし</span
    ><span class="ply-tag" data-accent="blue">読書会</span
    ><a class="ply-tag" href="/apps/search?q=仕事場">仕事場の記事</a
    ><span class="ply-tag" data-accent="green">公開済み</span
    ><span class="ply-tag" data-accent="amber">確認中</span>
  </div>
  <div class="ply-disclosure-group" role="group" aria-label="色と置き場所の違い">
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
        ><span class="label"><span class="title">色ごとの札</span></span>
      </summary>
      <div class="body">
        <div class="ply-tag-group" role="group" aria-label="色ごとの分類">
          <span class="ply-tag">分類なし</span
          ><span class="ply-tag" data-accent="blue">読書会</span
          ><span class="ply-tag" data-accent="green">公開済み</span
          ><span class="ply-tag" data-accent="amber">確認中</span
          ><span class="ply-tag" data-accent="coral">要対応</span>
        </div>
      </div>
    </details>
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
        ><span class="label"><span class="title">分類へ移る札</span></span>
      </summary>
      <div class="body">
        <div class="ply-tag-group" role="group" aria-label="分類から探す">
          <a class="ply-tag" href="/apps/search?q=仕事場">仕事場の記事</a
          ><a class="ply-tag" data-accent="blue" href="/apps/search?q=読書会">読書会</a
          ><a class="ply-tag" data-accent="green" href="/apps/search?q=イベント"
            >イベント</a
          ><a class="ply-tag" data-accent="amber" href="/apps/search?q=お知らせ"
            >お知らせ</a
          ><a class="ply-tag" data-accent="coral" href="/apps/search?q=締め切り"
            >締め切り</a
          >
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
        ><span class="label"><span class="title">外せる札</span></span>
      </summary>
      <div class="body">
        <div class="ply-tag-group" role="group" aria-label="選んだ分類">
          <span class="ply-tag removable"
            ><span class="label">暮らし</span
            ><button
              data-icon-only="true"
              aria-label="暮らしを解除"
              class="ply-button remove"
              type="button"
              data-variant="link"
              data-size="tag"
            ></button></span
          ><span class="ply-tag removable" data-accent="blue"
            ><span class="label">読書会</span
            ><button
              data-icon-only="true"
              aria-label="読書会を解除"
              class="ply-button remove"
              type="button"
              data-variant="link"
              data-size="tag"
            ></button></span
          ><span class="ply-tag removable" data-accent="coral"
            ><span class="label">要対応</span
            ><button
              data-icon-only="true"
              aria-label="要対応を解除"
              class="ply-button remove"
              type="button"
              data-variant="link"
              data-size="tag"
            ></button
          ></span>
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
        <div style="max-inline-size: 12rem">
          <div class="ply-tag-group" role="group" aria-label="長い分類">
            <span class="ply-tag" data-accent="blue"
              >初めて仕事場を利用する方へのご案内</span
            ><span class="ply-tag"
              >https://example.com/articles/autumn-reading-club-2026</span
            ><a class="ply-tag" href="/apps/search?q=読書会">秋の読書会の参加者向け</a>
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
          <div class="ply-tag-group" role="group" aria-label="التصنيفات">
            <span class="ply-tag">الحياة</span
            ><span class="ply-tag" data-accent="blue">نادي القراءة</span
            ><a class="ply-tag" data-accent="green" href="/apps/search?q=events"
              >الفعاليات</a
            ><span class="ply-tag removable" data-accent="amber"
              ><span class="label">قيد المراجعة</span
              ><button
                data-icon-only="true"
                aria-label="قيد المراجعةを解除"
                class="ply-button remove"
                type="button"
                data-variant="link"
                data-size="tag"
              ></button
            ></span>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
```

</details>
