<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# FileInput

ファイルを選択し、添付する内容を確認する

## 使いどころ

- フォームにファイルを添えて送る時に使います。
- 既に添えたファイルや保存済みのファイルを一覧で見せる時は `FileItem` を使います。画像の切り抜く範囲を決める時は `ImageCropper` を使います。

## 使い方

`label` を渡し、`name`・`multiple`・`accept`・`required`・`disabled`・`form` などの標準の属性は、そのまま中の `input type="file"` に付きます。`help`・`error` は `Field` と同じく欄の下に出して入力に関連付けます。

標準のファイル選択に加え、ドロップ・選んだファイルの一覧・選択の解除を持ちます。欄にファイルをドロップすると選んだのと同じになり、選んだファイルは `FileItem` の形で名前と大きさを並べます。「選択を解除」で選択を空にし、フォーカスを入力に戻します。

選び直しは置き換えで、前に選んだファイルに足しません。`multiple` の無い欄に複数のファイルをドロップすると受け付けず、「一度に選択できるのは1ファイルです。」と知らせます。

`accept` は選択ダイアログの絞り込みで、ドロップしたファイルは絞りません。形式・容量の確かめと、アップロード・保存は送信先で行います。この部品は送信先や保存先を持ちません。

変更の知らせ：選択・ドロップ・解除のどれでも、入力に標準の `input`・`change` を発火します。ドロップは取り消せる `file-drop:beforedrop` と、その後の `file-drop:drop` でも知らせます。フォームのリセットでは一覧も空に戻します。

JavaScriptが無い時は、標準のファイル選択をそのまま表示して送信できます。ドロップと一覧、選択の解除は使えません。

## アクセシビリティ

- 操作とフォーカスは標準のファイル入力が持ちます。見た目の「ファイルを選択」は入力のラベルで、読み上げからは外します。
- 選んだファイルの一覧は「〜で選択したファイル」の名前を持ちます。選んだ件数と解除は `role="status"` で「n件のファイルを選択しました。」「選択を解除しました。」と知らせます。
- `error` を渡すと、入力に `aria-invalid` を付け、誤りの文を `aria-describedby` に加えます。

## イベント

| イベント               | 内容                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `file-drop:beforedrop` | ドロップしたファイルを入力に入れる前に出します。取り消せます。detailは `{ files }` で、ドロップした `File` の配列です。 |
| `file-drop:drop`       | ドロップしたファイルを入力に入れた後に出します。detailは `file-drop:beforedrop` と同じです。                            |

## API

### FileInput

| 名前            | 型       | 既定値 | 説明                                                                                       |
| --------------- | -------- | ------ | ------------------------------------------------------------------------------------------ |
| `label`（必須） | `string` |        | 欄の名前。選んだファイルの一覧の読み上げ名（「〜で選択したファイル」）にも使う。           |
| `help`          | `string` |        | 欄の下に出す補足。ファイル入力のaria-describedbyに関連付ける。                             |
| `error`         | `string` |        | 欄の下に出す誤りの文。ファイル入力をaria-invalidにする。形式・容量の確かめは利用側で行う。 |

ほかのpropsは`Input`へそのまま渡します。

登録するcontroller：`file-input`（`FileInputController`）

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/button.css`、`components/field.css`、`components/file-input.css`、`components/file-item.css`、`components/icon.css`

## コード

```tsx
import { Disclosure, Button, Field, FileInput, Input } from "ply/hono";

export default () => (
  <form class="ply-stack" aria-label="ファイルの添付例">
    <Field id="hono-file-title" label="資料名">
      {(attributes) => <Input {...attributes} value="イベントのご案内" />}
    </Field>
    <FileInput
      id="hono-file"
      name="attachments"
      label="添付資料"
      accept=".pdf,application/pdf"
      multiple
      help="PDFを複数選択できます。選び直すと選択内容を入れ替えます。"
    />
    <Disclosure summary="1ファイル・必須・エラー・利用不可">
      <div class="ply-stack">
        <FileInput
          id="hono-file-single"
          name="cover"
          label="表紙画像"
          accept="image/*"
          help="画像を1ファイル選択できます。"
        />
        <FileInput
          id="hono-file-required"
          name="application"
          label="申込書（必須）"
          accept=".pdf"
          required
        />
        <FileInput
          name="reviewed_attachment"
          label="添付資料（エラー）"
          accept=".pdf"
          error="PDF形式のファイルを選び直してください。"
        />
        <FileInput
          name="unavailable_attachment"
          label="添付資料（利用不可）"
          disabled
        />
        <fieldset class="ply-field-group" disabled>
          <legend>グループ全体が利用不可</legend>
          <FileInput
            id="hono-file-disabled-group"
            name="group_attachment"
            label="グループ内の添付資料"
          />
        </fieldset>
      </div>
    </Disclosure>
    <Button type="reset">選択をリセット</Button>
  </form>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<form class="ply-stack" aria-label="ファイルの添付例">
  <div class="ply-field">
    <div class="heading"><label for="hono-file-title">資料名</label></div>
    <input id="hono-file-title" value="イベントのご案内" class="ply-input" />
  </div>
  <div class="ply-field">
    <div class="heading"><label for="hono-file">添付資料</label></div>
    <div class="ply-file-input" data-controller="file-input">
      <input
        name="attachments"
        accept=".pdf,application/pdf"
        multiple=""
        id="hono-file"
        aria-describedby="hono-file-help"
        type="file"
        data-file-input-target="input"
        class="ply-input"
      /><span class="symbol" aria-hidden="true"
        ><svg
          class="ply-icon"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/assets/ply-icons.svg#ply-attach"></use></svg
      ></span>
      <p class="hint" data-file-input-target="hint" hidden="">
        ここにファイルをドロップ
      </p>
      <label
        class="ply-button choose"
        for="hono-file"
        data-variant="link"
        data-size="default"
        aria-hidden="true"
        >ファイルを選択</label
      >
      <ul
        class="files"
        aria-label="添付資料で選択したファイル"
        role="list"
        data-file-input-target="files"
        hidden=""
      ></ul>
      <template data-file-input-target="template"
        ><li>
          <div class="ply-file-item" data-state="ready">
            <span class="icon"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-file"></use></svg
            ></span>
            <div class="body">
              <p class="title"><strong></strong></p>
              <p class="description"></p>
            </div>
          </div></li></template
      ><button
        data-file-input-target="clear"
        data-action="file-input#clear"
        hidden=""
        class="ply-button clear"
        type="button"
        data-variant="link"
        data-size="compact"
      >
        選択を解除
      </button>
      <p class="status" role="status" data-file-input-target="status"></p>
    </div>
    <div class="messages">
      <p class="help" id="hono-file-help">
        <span>PDFを複数選択できます。選び直すと選択内容を入れ替えます。</span>
      </p>
    </div>
  </div>
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
        ><span class="title">1ファイル・必須・エラー・利用不可</span></span
      >
    </summary>
    <div class="body">
      <div class="ply-stack">
        <div class="ply-field">
          <div class="heading"><label for="hono-file-single">表紙画像</label></div>
          <div class="ply-file-input" data-controller="file-input">
            <input
              name="cover"
              accept="image/*"
              id="hono-file-single"
              aria-describedby="hono-file-single-help"
              type="file"
              data-file-input-target="input"
              class="ply-input"
            /><span class="symbol" aria-hidden="true"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-attach"></use></svg
            ></span>
            <p class="hint" data-file-input-target="hint" hidden="">
              ここにファイルをドロップ
            </p>
            <label
              class="ply-button choose"
              for="hono-file-single"
              data-variant="link"
              data-size="default"
              aria-hidden="true"
              >ファイルを選択</label
            >
            <ul
              class="files"
              aria-label="表紙画像で選択したファイル"
              role="list"
              data-file-input-target="files"
              hidden=""
            ></ul>
            <template data-file-input-target="template"
              ><li>
                <div class="ply-file-item" data-state="ready">
                  <span class="icon"
                    ><svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-file"></use></svg
                  ></span>
                  <div class="body">
                    <p class="title"><strong></strong></p>
                    <p class="description"></p>
                  </div>
                </div></li></template
            ><button
              data-file-input-target="clear"
              data-action="file-input#clear"
              hidden=""
              class="ply-button clear"
              type="button"
              data-variant="link"
              data-size="compact"
            >
              選択を解除
            </button>
            <p class="status" role="status" data-file-input-target="status"></p>
          </div>
          <div class="messages">
            <p class="help" id="hono-file-single-help">
              <span>画像を1ファイル選択できます。</span>
            </p>
          </div>
        </div>
        <div class="ply-field">
          <div class="heading">
            <label for="hono-file-required">申込書（必須）</label>
          </div>
          <div class="ply-file-input" data-controller="file-input">
            <input
              name="application"
              accept=".pdf"
              required=""
              id="hono-file-required"
              type="file"
              data-file-input-target="input"
              class="ply-input"
            /><span class="symbol" aria-hidden="true"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-attach"></use></svg
            ></span>
            <p class="hint" data-file-input-target="hint" hidden="">
              ここにファイルをドロップ
            </p>
            <label
              class="ply-button choose"
              for="hono-file-required"
              data-variant="link"
              data-size="default"
              aria-hidden="true"
              >ファイルを選択</label
            >
            <ul
              class="files"
              aria-label="申込書（必須）で選択したファイル"
              role="list"
              data-file-input-target="files"
              hidden=""
            ></ul>
            <template data-file-input-target="template"
              ><li>
                <div class="ply-file-item" data-state="ready">
                  <span class="icon"
                    ><svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-file"></use></svg
                  ></span>
                  <div class="body">
                    <p class="title"><strong></strong></p>
                    <p class="description"></p>
                  </div>
                </div></li></template
            ><button
              data-file-input-target="clear"
              data-action="file-input#clear"
              hidden=""
              class="ply-button clear"
              type="button"
              data-variant="link"
              data-size="compact"
            >
              選択を解除
            </button>
            <p class="status" role="status" data-file-input-target="status"></p>
          </div>
        </div>
        <div class="ply-field">
          <div class="heading">
            <label for="ply-file-input-:r1v:">添付資料（エラー）</label>
          </div>
          <div class="ply-file-input" data-controller="file-input">
            <input
              name="reviewed_attachment"
              accept=".pdf"
              id="ply-file-input-:r1v:"
              aria-describedby="ply-file-input-:r1v:-error"
              aria-invalid="true"
              data-invalid="true"
              type="file"
              data-file-input-target="input"
              class="ply-input"
            /><span class="symbol" aria-hidden="true"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-attach"></use></svg
            ></span>
            <p class="hint" data-file-input-target="hint" hidden="">
              ここにファイルをドロップ
            </p>
            <label
              class="ply-button choose"
              for="ply-file-input-:r1v:"
              data-variant="link"
              data-size="default"
              aria-hidden="true"
              >ファイルを選択</label
            >
            <ul
              class="files"
              aria-label="添付資料（エラー）で選択したファイル"
              role="list"
              data-file-input-target="files"
              hidden=""
            ></ul>
            <template data-file-input-target="template"
              ><li>
                <div class="ply-file-item" data-state="ready">
                  <span class="icon"
                    ><svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-file"></use></svg
                  ></span>
                  <div class="body">
                    <p class="title"><strong></strong></p>
                    <p class="description"></p>
                  </div>
                </div></li></template
            ><button
              data-file-input-target="clear"
              data-action="file-input#clear"
              hidden=""
              class="ply-button clear"
              type="button"
              data-variant="link"
              data-size="compact"
            >
              選択を解除
            </button>
            <p class="status" role="status" data-file-input-target="status"></p>
          </div>
          <div class="messages">
            <p class="error" id="ply-file-input-:r1v:-error">
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x-circle"></use></svg
              ><span>PDF形式のファイルを選び直してください。</span>
            </p>
          </div>
        </div>
        <div class="ply-field">
          <div class="heading">
            <label for="ply-file-input-:r20:">添付資料（利用不可）</label>
          </div>
          <div class="ply-file-input" data-controller="file-input">
            <input
              name="unavailable_attachment"
              disabled=""
              id="ply-file-input-:r20:"
              type="file"
              data-file-input-target="input"
              class="ply-input"
            /><span class="symbol" aria-hidden="true"
              ><svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-attach"></use></svg
            ></span>
            <p class="hint" data-file-input-target="hint" hidden="">
              ここにファイルをドロップ
            </p>
            <label
              class="ply-button choose"
              for="ply-file-input-:r20:"
              data-variant="link"
              data-size="default"
              aria-hidden="true"
              >ファイルを選択</label
            >
            <ul
              class="files"
              aria-label="添付資料（利用不可）で選択したファイル"
              role="list"
              data-file-input-target="files"
              hidden=""
            ></ul>
            <template data-file-input-target="template"
              ><li>
                <div class="ply-file-item" data-state="ready">
                  <span class="icon"
                    ><svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-file"></use></svg
                  ></span>
                  <div class="body">
                    <p class="title"><strong></strong></p>
                    <p class="description"></p>
                  </div>
                </div></li></template
            ><button
              data-file-input-target="clear"
              data-action="file-input#clear"
              hidden=""
              class="ply-button clear"
              type="button"
              data-variant="link"
              data-size="compact"
              disabled=""
            >
              選択を解除
            </button>
            <p class="status" role="status" data-file-input-target="status"></p>
          </div>
        </div>
        <fieldset class="ply-field-group" disabled="">
          <legend>グループ全体が利用不可</legend>
          <div class="ply-field">
            <div class="heading">
              <label for="hono-file-disabled-group">グループ内の添付資料</label>
            </div>
            <div class="ply-file-input" data-controller="file-input">
              <input
                name="group_attachment"
                id="hono-file-disabled-group"
                type="file"
                data-file-input-target="input"
                class="ply-input"
              /><span class="symbol" aria-hidden="true"
                ><svg
                  class="ply-icon"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="/assets/ply-icons.svg#ply-attach"></use></svg
              ></span>
              <p class="hint" data-file-input-target="hint" hidden="">
                ここにファイルをドロップ
              </p>
              <label
                class="ply-button choose"
                for="hono-file-disabled-group"
                data-variant="link"
                data-size="default"
                aria-hidden="true"
                >ファイルを選択</label
              >
              <ul
                class="files"
                aria-label="グループ内の添付資料で選択したファイル"
                role="list"
                data-file-input-target="files"
                hidden=""
              ></ul>
              <template data-file-input-target="template"
                ><li>
                  <div class="ply-file-item" data-state="ready">
                    <span class="icon"
                      ><svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/assets/ply-icons.svg#ply-file"></use></svg
                    ></span>
                    <div class="body">
                      <p class="title"><strong></strong></p>
                      <p class="description"></p>
                    </div>
                  </div></li></template
              ><button
                data-file-input-target="clear"
                data-action="file-input#clear"
                hidden=""
                class="ply-button clear"
                type="button"
                data-variant="link"
                data-size="compact"
              >
                選択を解除
              </button>
              <p class="status" role="status" data-file-input-target="status"></p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </details>
  <button class="ply-button" type="reset" data-variant="secondary" data-size="default">
    選択をリセット
  </button>
</form>
```

</details>
