<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Switch

二択の設定を切り替える

## 使いどころ

- 通知を受け取る・完了した仕事を表示する、のようなオン・オフの設定に使います。
- 規約への同意のように、送信の時に確かめる一つの確認は `Choice` のチェックボックスを使います。
- 二つ以上の状態から選ぶ時は `ToggleGroup` かラジオボタンの `Choice` を使います。

## 使い方

実体は標準のチェックボックスに `role="switch"` を付けたものです。`label` と `description` を並べ、全体を押せる範囲にします。`checked` は初期状態です。

オンの時だけ `name` と `value` を送信します。`value` を省略すると `on` を送ります。オフの時は何も送らないので、オフを保存するかは送信先で決めます。フォームのリセットと `disabled` も標準のまま動きます。

controllerの登録は要らず、JavaScriptが無い時も同じように動きます。切り替えてすぐ保存する画面では、利用側で `change` を受けて保存します。

`id` を省略すると生成します。祖先の `fieldset` の `disabled` でもまとめて使えなくできます。

## キーボード

| キー  | 動作                       |
| ----- | -------------------------- |
| Space | オン・オフを切り替えます。 |

## アクセシビリティ

- `role="switch"` なので、オン・オフの状態として読み上げます。
- `label` を読み上げ名、`description` を説明として関連付けます。`aria-label` か `aria-labelledby` を渡すとそちらを名前にし、渡した `aria-describedby` は説明の前に残します。

## API

### Switch

標準のcheckboxにrole="switch"を付けた、オン・オフの切り替え。残りの属性はinputへ渡す。

| 名前            | 型       | 既定値 | 説明                                                                                        |
| --------------- | -------- | ------ | ------------------------------------------------------------------------------------------- |
| `label`（必須） | `string` |        | 設定の名前。スイッチの読み上げ名になる（aria-labelかaria-labelledbyを渡すとそちらを使う）。 |
| `description`   | `string` |        | 名前の下に添える淡い説明。スイッチの説明として読み上げる。                                  |

ほかに、`<input>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/switch.css`

## コード

```tsx
import { Disclosure, Button, Switch } from "ply/hono";

export default () => (
  <form class="ply-stack" aria-label="通知と表示の設定">
    <div class="ply-stack" data-space="small">
      <Switch
        id="hono-switch-digest"
        label="週次のまとめ"
        name="digest"
        value="weekly"
        checked
        description="一週間の更新をまとめて受け取ります。"
      />
      <Switch
        id="hono-switch-completed"
        label="完了した仕事を表示"
        name="completed"
        value="show"
      />
    </div>
    <Disclosure summary="利用不可・長いラベル">
      <div class="ply-stack">
        <fieldset class="ply-choice-group" disabled>
          <legend>管理者が管理している設定</legend>
          <div class="list">
            <Switch label="お知らせを受け取る" name="locked-news" checked />
            <Switch label="外部への共有を許可" name="locked-sharing" disabled />
          </div>
        </fieldset>
        <Switch
          label="担当するすべてのプロジェクトについて、今週の更新をまとめて受け取る"
          description="毎週月曜日の朝に、各プロジェクトの変更をお知らせします。"
          name="all-projects"
        />
      </div>
    </Disclosure>
    <Button type="reset">初期値に戻す</Button>
    <a href="/apps/settings">設定画面で保存・復元を試す</a>
  </form>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<form class="ply-stack" aria-label="通知と表示の設定">
  <div class="ply-stack" data-space="small">
    <label class="ply-switch" for="hono-switch-digest"
      ><input
        name="digest"
        value="weekly"
        checked=""
        id="hono-switch-digest"
        type="checkbox"
        role="switch"
        aria-labelledby="hono-switch-digest-label"
        aria-describedby="hono-switch-digest-description"
      /><span
        ><span id="hono-switch-digest-label">週次のまとめ</span
        ><small id="hono-switch-digest-description"
          >一週間の更新をまとめて受け取ります。</small
        ></span
      ></label
    ><label class="ply-switch" for="hono-switch-completed"
      ><input
        name="completed"
        value="show"
        id="hono-switch-completed"
        type="checkbox"
        role="switch"
        aria-labelledby="hono-switch-completed-label"
      /><span
        ><span id="hono-switch-completed-label">完了した仕事を表示</span></span
      ></label
    >
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
      ><span class="label"><span class="title">利用不可・長いラベル</span></span>
    </summary>
    <div class="body">
      <div class="ply-stack">
        <fieldset class="ply-choice-group" disabled="">
          <legend>管理者が管理している設定</legend>
          <div class="list">
            <label class="ply-switch" for="ply-switch-:rb:"
              ><input
                name="locked-news"
                checked=""
                id="ply-switch-:rb:"
                type="checkbox"
                role="switch"
                aria-labelledby="ply-switch-:rb:-label"
              /><span
                ><span id="ply-switch-:rb:-label">お知らせを受け取る</span></span
              ></label
            ><label class="ply-switch" for="ply-switch-:rc:"
              ><input
                name="locked-sharing"
                disabled=""
                id="ply-switch-:rc:"
                type="checkbox"
                role="switch"
                aria-labelledby="ply-switch-:rc:-label"
              /><span
                ><span id="ply-switch-:rc:-label">外部への共有を許可</span></span
              ></label
            >
          </div>
        </fieldset>
        <label class="ply-switch" for="ply-switch-:rd:"
          ><input
            name="all-projects"
            id="ply-switch-:rd:"
            type="checkbox"
            role="switch"
            aria-labelledby="ply-switch-:rd:-label"
            aria-describedby="ply-switch-:rd:-description"
          /><span
            ><span id="ply-switch-:rd:-label"
              >担当するすべてのプロジェクトについて、今週の更新をまとめて受け取る</span
            ><small id="ply-switch-:rd:-description"
              >毎週月曜日の朝に、各プロジェクトの変更をお知らせします。</small
            ></span
          ></label
        >
      </div>
    </div>
  </details>
  <button class="ply-button" type="reset" data-variant="secondary" data-size="default">
    初期値に戻す</button
  ><a href="/apps/settings">設定画面で保存・復元を試す</a>
</form>
```

</details>
