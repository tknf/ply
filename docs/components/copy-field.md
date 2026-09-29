<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# CopyField

写して使う値の欄と、写す丸い印

## 使いどころ

- 公開リンクや招待リンク、APIの鍵のように、ほかの場所へ写して使う値を見せる時に使います。
- 書き換える値は `Field` と `Input`、長いコードの断片を写す時は `CodeBlock` を使います。

## 使い方

`value` を読み取り専用の欄に出し、欄の終わりに写す操作の丸い印を置きます。写せると印がペンで描くチェックに変わり、1.8秒ほどで元の印に戻ります。長い値は欄の中で省略します。

`actions` には、リンクを作り直すなどの操作を写す印の後に並べます。作り直した値の取得と保存は利用側が行い、新しい `value` で描き直します。

欄に `name` は無く、フォームで送信しません。

写す動きは `ClipboardController`、写した時の印と読み上げは `CopyFieldController` が持つので、`clipboard` と `copy-field` の両方を登録します。クリップボードへ書き込めないブラウザでは写す印を隠します。写せなかった時は印を変えません。

欄にフォーカスすると値を全て選ぶので、キーボードではそのままブラウザのコピーでも写せます。

JavaScriptが無い時は、写す印を押しても何も起きません。欄の値を選んで、ブラウザのコピーで写します。

## アクセシビリティ

- 写す印はアイコンだけのボタンで、`copyLabel` を読み上げ名とツールチップにします。
- 写せた時は、見えない `role="status"` の領域で `copiedLabel` を読み上げます。

## イベント

| イベント               | 内容                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `clipboard:beforecopy` | 写す前に出します。取り消せます。detailは `text`（写す値）・`source`・`reason`（`pointer` か `keyboard`）です。                  |
| `clipboard:copy`       | 写し終えた後に出します。detailは `text`・`source`・`reason`・`ok`（写せたか）・`error`（写せなかった時の `DOMException`）です。 |

## API

### CopyField

公開リンクや招待リンクのような、写して使う値の欄。写す操作は欄の終わりの丸い印で、写すとチェックに変わり、しばらくして元に戻る。写す動きはClipboardController、結果の表示はCopyFieldControllerが持つ。

| 名前            | 型       | 既定値         | 説明                                           |
| --------------- | -------- | -------------- | ---------------------------------------------- |
| `id`（必須）    | `string` |                | 欄のid。ラベルと補足の関連付けに使う。         |
| `label`（必須） | `string` |                | 欄のラベル。                                   |
| `value`（必須） | `string` |                | 写す値。読み取り専用の欄に出し、送信はしない。 |
| `help`          | `string` |                | 欄の下に出す淡い補足。                         |
| `copyLabel`     | `string` | `"写す"`       | 写す印の読み上げ名とツールチップ。             |
| `copiedLabel`   | `string` | `"写しました"` | 写せた時に読み上げる文言。                     |
| `actions`       | `Child`  |                | 欄の終わりに置く操作（リンクを作り直すなど）。 |

登録するcontroller：`clipboard`（`ClipboardController`）、`copy-field`（`CopyFieldController`）

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/button.css`、`components/field.css`、`components/icon.css`、`components/copy-field.css`

## コード

```tsx
import { CopyField, Button, Icon, Disclosure, DisclosureGroup } from "ply/hono";

export default () => (
  <div class="ply-stack">
    <CopyField
      id="public-link"
      label="公開リンク"
      value="https://example.com/public/boards/6Kq2"
      help="ログインしなくても、このボードだけを見られます。"
    />
    <DisclosureGroup label="操作と長さの違い">
      <Disclosure summary="作り直す操作を添える（招待リンク）" open>
        <CopyField
          id="invite-link"
          label="招待リンク"
          value="https://example.com/join/AJqP-fXVM-mirH"
          help="この招待は10回中0回使われています。"
          actions={
            <Button data-icon-only="true" aria-label="招待リンクを作り直す">
              <Icon name="redo" />
            </Button>
          }
        />
      </Disclosure>
      <Disclosure summary="狭い場所：長い値は欄の中で省略する">
        <div style="max-inline-size: 16rem">
          <CopyField
            id="narrow-link"
            label="共有の住所"
            value="https://example.com/articles/autumn-reading-club-2026/guide"
          />
        </div>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <div dir="rtl" lang="ar">
          <CopyField
            id="rtl-link"
            label="رابط الدعوة"
            value="https://example.com/join/AJqP"
          />
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
  <div
    class="ply-copy-field"
    data-controller="clipboard copy-field"
    data-copy-field-copied-value="写しました"
  >
    <div class="ply-field">
      <div class="heading"><label for="public-link">公開リンク</label></div>
      <div class="row">
        <input
          id="public-link"
          aria-describedby="public-link-help"
          value="https://example.com/public/boards/6Kq2"
          readonly=""
          data-clipboard-target="source"
          data-action="focus-&gt;copy-field#select"
          class="ply-input"
        /><button
          data-icon-only="true"
          aria-label="写す"
          title="写す"
          data-clipboard-target="trigger"
          data-copy-field-target="trigger"
          class="ply-button"
          type="button"
          data-variant="secondary"
          data-size="default"
        >
          <svg
            class="ply-icon copy"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-copy"></use></svg
          ><svg
            class="ply-icon copied"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-check"></use>
          </svg>
        </button>
      </div>
      <div class="messages">
        <p class="help" id="public-link-help">
          <span>ログインしなくても、このボードだけを見られます。</span>
        </p>
      </div>
    </div>
    <p class="ply-visually-hidden" role="status" data-copy-field-target="status"></p>
  </div>
  <div class="ply-disclosure-group" role="group" aria-label="操作と長さの違い">
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
          ><span class="title">作り直す操作を添える（招待リンク）</span></span
        >
      </summary>
      <div class="body">
        <div
          class="ply-copy-field"
          data-controller="clipboard copy-field"
          data-copy-field-copied-value="写しました"
        >
          <div class="ply-field">
            <div class="heading"><label for="invite-link">招待リンク</label></div>
            <div class="row">
              <input
                id="invite-link"
                aria-describedby="invite-link-help"
                value="https://example.com/join/AJqP-fXVM-mirH"
                readonly=""
                data-clipboard-target="source"
                data-action="focus-&gt;copy-field#select"
                class="ply-input"
              /><button
                data-icon-only="true"
                aria-label="写す"
                title="写す"
                data-clipboard-target="trigger"
                data-copy-field-target="trigger"
                class="ply-button"
                type="button"
                data-variant="secondary"
                data-size="default"
              >
                <svg
                  class="ply-icon copy"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="/assets/ply-icons.svg#ply-copy"></use></svg
                ><svg
                  class="ply-icon copied"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="/assets/ply-icons.svg#ply-check"></use>
                </svg></button
              ><button
                data-icon-only="true"
                aria-label="招待リンクを作り直す"
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
                  <use href="/assets/ply-icons.svg#ply-redo"></use>
                </svg>
              </button>
            </div>
            <div class="messages">
              <p class="help" id="invite-link-help">
                <span>この招待は10回中0回使われています。</span>
              </p>
            </div>
          </div>
          <p
            class="ply-visually-hidden"
            role="status"
            data-copy-field-target="status"
          ></p>
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
          ><span class="title">狭い場所：長い値は欄の中で省略する</span></span
        >
      </summary>
      <div class="body">
        <div style="max-inline-size: 16rem">
          <div
            class="ply-copy-field"
            data-controller="clipboard copy-field"
            data-copy-field-copied-value="写しました"
          >
            <div class="ply-field">
              <div class="heading"><label for="narrow-link">共有の住所</label></div>
              <div class="row">
                <input
                  id="narrow-link"
                  value="https://example.com/articles/autumn-reading-club-2026/guide"
                  readonly=""
                  data-clipboard-target="source"
                  data-action="focus-&gt;copy-field#select"
                  class="ply-input"
                /><button
                  data-icon-only="true"
                  aria-label="写す"
                  title="写す"
                  data-clipboard-target="trigger"
                  data-copy-field-target="trigger"
                  class="ply-button"
                  type="button"
                  data-variant="secondary"
                  data-size="default"
                >
                  <svg
                    class="ply-icon copy"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-copy"></use></svg
                  ><svg
                    class="ply-icon copied"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-check"></use>
                  </svg>
                </button>
              </div>
            </div>
            <p
              class="ply-visually-hidden"
              role="status"
              data-copy-field-target="status"
            ></p>
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
          <div
            class="ply-copy-field"
            data-controller="clipboard copy-field"
            data-copy-field-copied-value="写しました"
          >
            <div class="ply-field">
              <div class="heading"><label for="rtl-link">رابط الدعوة</label></div>
              <div class="row">
                <input
                  id="rtl-link"
                  value="https://example.com/join/AJqP"
                  readonly=""
                  data-clipboard-target="source"
                  data-action="focus-&gt;copy-field#select"
                  class="ply-input"
                /><button
                  data-icon-only="true"
                  aria-label="写す"
                  title="写す"
                  data-clipboard-target="trigger"
                  data-copy-field-target="trigger"
                  class="ply-button"
                  type="button"
                  data-variant="secondary"
                  data-size="default"
                >
                  <svg
                    class="ply-icon copy"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-copy"></use></svg
                  ><svg
                    class="ply-icon copied"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-check"></use>
                  </svg>
                </button>
              </div>
            </div>
            <p
              class="ply-visually-hidden"
              role="status"
              data-copy-field-target="status"
            ></p>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
```

</details>
