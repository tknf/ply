<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Toast

操作結果を閉じるまで読める形で示す

## 使いどころ

- 保存・送信・コピーなど、今した操作の結果を、作業を止めずに短く知らせる時に使います。
- 読み続けてほしい事実や注意は、本文のそばに置く `Notice` を使います。
- 送信で直すところがある時は、入力の近くのエラーと `ErrorSummary` で示します。Toastだけに残しません。
- 確認や判断を求める時は `Dialog` を使います。

## 使い方

Toastはページに置いておき、閉じた状態（`popover="manual"`）で描きます。開くのは、`popovertarget` にToastの `id` を指したボタンか、スクリプトからの `showPopover()` です。開いてもフォーカスは移しません。`ToastController` を `toast` として登録すると、閉じるボタンと `duration` が働きます。

`tone` で知らせの種類を選び、面をその色で塗ります。印は `success` でチェック、`danger` で丸の中のバツ、他はiです。`actions` を渡すと、知らせの後に操作を置きます。

既定では閉じるボタンを押すまで残します。`duration` にミリ秒を渡すと、開いてからその時間で閉じます。フォーカスがToastの中にある間は数えず、外へ出てから数え直します。失敗の知らせは `live="assertive"` にして自動で閉じず、重要なエラーは入力の近くや `ErrorSummary` にも残します。

単独のToastは、画面の下の書き終わりの側（左から右に読む画面では右下）に浮かべます。

複数のToastは `ToastStack` で囲み、`ToastStackController` を `toast-stack` として登録します。開いた順に、新しいものを手前にして束ねます。二枚以上の時、束を押すと上へ広がり、外を押すかEscapeで畳みます。キーボードでフォーカスが束の中へ入った時も広がります。Toastの中のボタンやリンクを押しても、束は開閉しません。`placement` で置き場所を選びます。

閉じるボタンで閉じた時だけ、`toast:beforehide` と `toast:hide` を知らせます。`popovertarget`・`hidePopover()`・`duration` で閉じた時は知らせません。

JavaScriptが無い時も、`popovertarget` のボタンでToastを開閉できます。閉じるボタンと `duration`、束ねる動きは働きません。

## キーボード

| キー   | 動作                                                        |
| ------ | ----------------------------------------------------------- |
| Tab    | `ToastStack` の中へフォーカスが入ると、束を広げます。       |
| Escape | 広げた `ToastStack` を畳みます。Toastそのものは閉じません。 |

## アクセシビリティ

- `live` に合わせて、`polite` は `role="status"`、`assertive` は `role="alert"` と `aria-live` を付けます。
- 開いてもフォーカスを移さないので、作業を続けたまま読み上げで結果を伝えます。
- 閉じるボタンは `closeLabel` を読み上げ名にします。
- 操作を持つToastに `duration` を付ける時は、読んで操作するまでに閉じない長さにします。フォーカスが中にある間は閉じません。
- 知らせの色は見分けの補助です。成功か失敗かは文言で伝えます。

## イベント

| イベント           | 内容                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `toast:beforehide` | 取り消せます。閉じるボタンで閉じる前に知らせ、`preventDefault()` で閉じません。`detail` は `{ reason }` で、`reason` は `pointer` か `keyboard` です。 |
| `toast:hide`       | 閉じるボタンで閉じた時に知らせます。`detail` は `toast:beforehide` と同じです。                                                                        |

## API

### Toast

通知の可視性・消去時間・ライブ領域はstimulus-uiのToastControllerが管理する。

| 名前         | 型                         | 既定値     | 説明                                                                                                                      |
| ------------ | -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| `id`（必須） | `string`                   |            | popoverのid。開く操作のpopovertargetや、showPopover()で開く時に指す。画面の中で一意にする。                               |
| `actions`    | `Child`                    |            | 知らせの下に置く操作（「記事を確認する」「もう一度保存する」など）。                                                      |
| `closeLabel` | `string`                   | `"閉じる"` | 閉じるボタンの読み上げ名。                                                                                                |
| `duration`   | `number`                   | `0`        | 開いてから自動で閉じるまでのミリ秒。0は閉じるボタンを押すまで残す。フォーカスが中にある間は数えず、外へ出てから数え直す。 |
| `live`       | `"polite" \| "assertive"`  | `"polite"` | 読み上げの急ぎ方。politeはrole="status"、assertiveはrole="alert"にする。失敗の知らせはassertiveにする。                   |
| `tone`       | `Exclude<Tone, "neutral">` | `"info"`   | 知らせの種類。面をその役割の色で塗る。                                                                                    |
| `children`   | `Child`                    |            | 知らせの文。印の隣に書きます。                                                                                            |

登録するcontroller：`toast`（`ToastController`）

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/button.css`、`components/overlay.css`、`components/icon.css`、`components/toast.css`

#### `Tone`

値：`"neutral" | "info" | "success" | "warning" | "danger"`

### ToastStack

開いているToastを、新しいものを手前にして束ねる。押すと広げ、外を押すかEscで畳む。重ね方と広げ方はToastStackControllerが扱う。childrenにはToastだけを置く。

| 名前        | 型                             | 既定値  | 説明                                                                   |
| ----------- | ------------------------------ | ------- | ---------------------------------------------------------------------- |
| `placement` | `"start" \| "center" \| "end"` | `"end"` | 束を置く場所。既定は書き終わりの側の下（左から右に読む画面では右下）。 |
| `children`  | `Child`                        |         | 束ねる `Toast`。Toastだけを置きます。                                  |

ほかに、`<div>`へ標準のHTML属性を渡せます。

登録するcontroller：`toast-stack`（`ToastStackController`）

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/toast-stack.css`

## コード

```tsx
import {
  Toast,
  ToastStack,
  Button,
  ActionLink,
  Disclosure,
  DisclosureGroup,
} from "ply/hono";
export default () => (
  <div class="ply-stack">
    <p>続けて開くと右下に束なります。束を押すと広がり、外を押すかEscで畳みます。</p>
    <div class="ply-cluster">
      <Button popovertarget="hono-toast">結果表示を試す</Button>
      <Button popovertarget="hono-toast-timed">5秒で閉じる通知</Button>
      <Button popovertarget="hono-toast-short">短い知らせ</Button>
      <Button popovertarget="hono-toast-warning">注意の知らせ</Button>
      <Button popovertarget="hono-toast-danger">失敗の知らせ</Button>
    </div>
    <ToastStack>
      <Toast
        id="hono-toast"
        tone="success"
        actions={<ActionLink href="/apps/docs">記事を確認する</ActionLink>}
      >
        「初めて仕事場を利用する方へのご案内」を下書きに保存しました。公開する前に内容を確認できます。
      </Toast>
      <Toast id="hono-toast-timed" duration={5000}>
        変更を保存しました。
      </Toast>
      <Toast id="hono-toast-short" tone="success">
        コピーしました
      </Toast>
      <Toast id="hono-toast-warning" tone="warning">
        通信が不安定です。保存は続けています。
      </Toast>
      <Toast
        id="hono-toast-danger"
        tone="danger"
        live="assertive"
        actions={<Button>もう一度保存する</Button>}
      >
        保存できませんでした。接続を確認してください。
      </Toast>
    </ToastStack>
    <DisclosureGroup label="置き場所と読む向きの違い">
      <Disclosure summary="下の中央・左下に置く">
        <div class="ply-cluster">
          <Button popovertarget="hono-toast-center">下の中央に出す</Button>
          <Button popovertarget="hono-toast-start">左下に出す</Button>
        </div>
        <ToastStack placement="center">
          <Toast id="hono-toast-center">下の中央に出す知らせです。</Toast>
        </ToastStack>
        <ToastStack placement="start">
          <Toast id="hono-toast-start">左下に出す知らせです。</Toast>
        </ToastStack>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <Button popovertarget="hono-toast-rtl">右から左に読む知らせ</Button>
        <div dir="rtl" lang="ar">
          <ToastStack>
            <Toast id="hono-toast-rtl" closeLabel="إغلاق">
              تم حفظ التغييرات.
            </Toast>
          </ToastStack>
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
  <p>続けて開くと右下に束なります。束を押すと広がり、外を押すかEscで畳みます。</p>
  <div class="ply-cluster">
    <button
      popovertarget="hono-toast"
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      結果表示を試す</button
    ><button
      popovertarget="hono-toast-timed"
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      5秒で閉じる通知</button
    ><button
      popovertarget="hono-toast-short"
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      短い知らせ</button
    ><button
      popovertarget="hono-toast-warning"
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      注意の知らせ</button
    ><button
      popovertarget="hono-toast-danger"
      class="ply-button"
      type="button"
      data-variant="secondary"
      data-size="default"
    >
      失敗の知らせ
    </button>
  </div>
  <div class="ply-toast-stack" data-controller="toast-stack" data-placement="end">
    <aside
      id="hono-toast"
      class="ply-toast ply-overlay"
      popover="manual"
      role="status"
      aria-live="polite"
      data-controller="toast"
      data-toast-duration-value="0"
      data-toast-live-value="polite"
      data-state="hidden"
      data-tone="success"
    >
      <header class="heading">
        <div class="heading-row">
          <div class="message">
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-check-fill"></use></svg
            ><span
              >「初めて仕事場を利用する方へのご案内」を下書きに保存しました。公開する前に内容を確認できます。</span
            >
          </div>
          <span class="close"
            ><button
              data-toast-target="dismiss"
              data-icon-only="true"
              aria-label="閉じる"
              class="ply-button"
              type="button"
              data-variant="primary"
              data-size="default"
            >
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use>
              </svg></button
          ></span>
        </div>
      </header>
      <div class="body"></div>
      <footer class="actions">
        <a
          href="/apps/docs"
          class="ply-button"
          data-variant="secondary"
          data-size="default"
          >記事を確認する</a
        >
      </footer>
    </aside>
    <aside
      id="hono-toast-timed"
      class="ply-toast ply-overlay"
      popover="manual"
      role="status"
      aria-live="polite"
      data-controller="toast"
      data-toast-duration-value="5000"
      data-toast-live-value="polite"
      data-state="hidden"
      data-tone="info"
    >
      <header class="heading">
        <div class="heading-row">
          <div class="message">
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg
            ><span>変更を保存しました。</span>
          </div>
          <span class="close"
            ><button
              data-toast-target="dismiss"
              data-icon-only="true"
              aria-label="閉じる"
              class="ply-button"
              type="button"
              data-variant="primary"
              data-size="default"
            >
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use>
              </svg></button
          ></span>
        </div>
      </header>
      <div class="body"></div>
    </aside>
    <aside
      id="hono-toast-short"
      class="ply-toast ply-overlay"
      popover="manual"
      role="status"
      aria-live="polite"
      data-controller="toast"
      data-toast-duration-value="0"
      data-toast-live-value="polite"
      data-state="hidden"
      data-tone="success"
    >
      <header class="heading">
        <div class="heading-row">
          <div class="message">
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-check-fill"></use></svg
            ><span>コピーしました</span>
          </div>
          <span class="close"
            ><button
              data-toast-target="dismiss"
              data-icon-only="true"
              aria-label="閉じる"
              class="ply-button"
              type="button"
              data-variant="primary"
              data-size="default"
            >
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use>
              </svg></button
          ></span>
        </div>
      </header>
      <div class="body"></div>
    </aside>
    <aside
      id="hono-toast-warning"
      class="ply-toast ply-overlay"
      popover="manual"
      role="status"
      aria-live="polite"
      data-controller="toast"
      data-toast-duration-value="0"
      data-toast-live-value="polite"
      data-state="hidden"
      data-tone="warning"
    >
      <header class="heading">
        <div class="heading-row">
          <div class="message">
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg
            ><span>通信が不安定です。保存は続けています。</span>
          </div>
          <span class="close"
            ><button
              data-toast-target="dismiss"
              data-icon-only="true"
              aria-label="閉じる"
              class="ply-button"
              type="button"
              data-variant="primary"
              data-size="default"
            >
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use>
              </svg></button
          ></span>
        </div>
      </header>
      <div class="body"></div>
    </aside>
    <aside
      id="hono-toast-danger"
      class="ply-toast ply-overlay"
      popover="manual"
      role="alert"
      aria-live="assertive"
      data-controller="toast"
      data-toast-duration-value="0"
      data-toast-live-value="assertive"
      data-state="hidden"
      data-tone="danger"
    >
      <header class="heading">
        <div class="heading-row">
          <div class="message">
            <svg
              class="ply-icon"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/assets/ply-icons.svg#ply-x-circle-fill"></use></svg
            ><span>保存できませんでした。接続を確認してください。</span>
          </div>
          <span class="close"
            ><button
              data-toast-target="dismiss"
              data-icon-only="true"
              aria-label="閉じる"
              class="ply-button"
              type="button"
              data-variant="primary"
              data-size="default"
            >
              <svg
                class="ply-icon"
                viewBox="0 0 256 256"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <use href="/assets/ply-icons.svg#ply-x"></use>
              </svg></button
          ></span>
        </div>
      </header>
      <div class="body"></div>
      <footer class="actions">
        <button
          class="ply-button"
          type="button"
          data-variant="secondary"
          data-size="default"
        >
          もう一度保存する
        </button>
      </footer>
    </aside>
  </div>
  <div class="ply-disclosure-group" role="group" aria-label="置き場所と読む向きの違い">
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
        ><span class="label"><span class="title">下の中央・左下に置く</span></span>
      </summary>
      <div class="body">
        <div class="ply-cluster">
          <button
            popovertarget="hono-toast-center"
            class="ply-button"
            type="button"
            data-variant="secondary"
            data-size="default"
          >
            下の中央に出す</button
          ><button
            popovertarget="hono-toast-start"
            class="ply-button"
            type="button"
            data-variant="secondary"
            data-size="default"
          >
            左下に出す
          </button>
        </div>
        <div
          class="ply-toast-stack"
          data-controller="toast-stack"
          data-placement="center"
        >
          <aside
            id="hono-toast-center"
            class="ply-toast ply-overlay"
            popover="manual"
            role="status"
            aria-live="polite"
            data-controller="toast"
            data-toast-duration-value="0"
            data-toast-live-value="polite"
            data-state="hidden"
            data-tone="info"
          >
            <header class="heading">
              <div class="heading-row">
                <div class="message">
                  <svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg
                  ><span>下の中央に出す知らせです。</span>
                </div>
                <span class="close"
                  ><button
                    data-toast-target="dismiss"
                    data-icon-only="true"
                    aria-label="閉じる"
                    class="ply-button"
                    type="button"
                    data-variant="primary"
                    data-size="default"
                  >
                    <svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-x"></use>
                    </svg></button
                ></span>
              </div>
            </header>
            <div class="body"></div>
          </aside>
        </div>
        <div
          class="ply-toast-stack"
          data-controller="toast-stack"
          data-placement="start"
        >
          <aside
            id="hono-toast-start"
            class="ply-toast ply-overlay"
            popover="manual"
            role="status"
            aria-live="polite"
            data-controller="toast"
            data-toast-duration-value="0"
            data-toast-live-value="polite"
            data-state="hidden"
            data-tone="info"
          >
            <header class="heading">
              <div class="heading-row">
                <div class="message">
                  <svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg
                  ><span>左下に出す知らせです。</span>
                </div>
                <span class="close"
                  ><button
                    data-toast-target="dismiss"
                    data-icon-only="true"
                    aria-label="閉じる"
                    class="ply-button"
                    type="button"
                    data-variant="primary"
                    data-size="default"
                  >
                    <svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-x"></use>
                    </svg></button
                ></span>
              </div>
            </header>
            <div class="body"></div>
          </aside>
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
        <button
          popovertarget="hono-toast-rtl"
          class="ply-button"
          type="button"
          data-variant="secondary"
          data-size="default"
        >
          右から左に読む知らせ
        </button>
        <div dir="rtl" lang="ar">
          <div
            class="ply-toast-stack"
            data-controller="toast-stack"
            data-placement="end"
          >
            <aside
              id="hono-toast-rtl"
              class="ply-toast ply-overlay"
              popover="manual"
              role="status"
              aria-live="polite"
              data-controller="toast"
              data-toast-duration-value="0"
              data-toast-live-value="polite"
              data-state="hidden"
              data-tone="info"
            >
              <header class="heading">
                <div class="heading-row">
                  <div class="message">
                    <svg
                      class="ply-icon"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/assets/ply-icons.svg#ply-info-fill"></use></svg
                    ><span>تم حفظ التغييرات.</span>
                  </div>
                  <span class="close"
                    ><button
                      data-toast-target="dismiss"
                      data-icon-only="true"
                      aria-label="إغلاق"
                      class="ply-button"
                      type="button"
                      data-variant="primary"
                      data-size="default"
                    >
                      <svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/assets/ply-icons.svg#ply-x"></use>
                      </svg></button
                  ></span>
                </div>
              </header>
              <div class="body"></div>
            </aside>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
```

</details>
