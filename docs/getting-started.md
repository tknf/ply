# 導入

Plyは三つの層で提供します。必要な層だけを使えます。

| 層                  | 内容                                              | 入口              |
| ------------------- | ------------------------------------------------- | ----------------- |
| CSS                 | フレームワークに依存しないCSSとセマンティックHTML | `ply/css/*`       |
| Hono JSX            | 同じHTMLを出力するSSRコンポーネントと型           | `ply/hono`        |
| Stimulus controller | 開閉・選択・キーボード操作などの動作              | `ply/controllers` |

HonoのコンポーネントはブラウザのJavaScriptをimportしません。controllerは自動で起動・登録しないので、使うものだけを登録します。

## インストール

Plyは公開パッケージにしていません。リポジトリをビルドし、利用するアプリからローカルの依存として参照します。

```sh
# Plyのリポジトリで
vp install
vp run build
```

```json
{
  "dependencies": {
    "ply": "file:../ply"
  }
}
```

配布物は`dist/hono`・`dist/controllers`・`dist/css`・`dist/icons.svg`です。使う層に応じて`hono`・`@hotwired/stimulus`・`@tknf/stimulus-ui`も利用するアプリに導入します。

## 動作環境

- Node.js 22以降（ビルドする場合）
- ブラウザはPopover APIに対応したもの。Popover・Toast・DropdownMenu・CommandMenuが使います。
- 通常のフォームと`details`は、JavaScriptなしでも操作できます。

## CSSだけで使う

ビルドした`dist/css`を利用アプリの静的配信先へコピーし、`layers.css`を先頭にして読み込みます。

```html
<link rel="stylesheet" href="/ply/layers.css" />
<link rel="stylesheet" href="/ply/reset.css" />
<link rel="stylesheet" href="/ply/tokens.css" />
<link rel="stylesheet" href="/ply/base.css" />
<link rel="stylesheet" href="/ply/layout.css" />
<link rel="stylesheet" href="/ply/components/button.css" />

<button class="ply-button" type="submit" data-variant="primary">保存する</button>
```

- 読み込み順は`layers.css`、reset・tokens・base・layout、必要なcomponentsです。CSS内では`@import`を使いません。
- カスケードレイヤーの優先順は`reset, base, tokens, layout, components, utilities, overrides`です。利用側の上書きは`@layer overrides`に書きます。
- reset・baseはページ全体に効くので、既存のアプリにはページ単位で導入してください。
- 全ての部品を使う場合の読み込み順は、`ply/hono`の`stylesheets`にまとまっています。
- 部品を選んで読み込む場合は、各部品のページの「API」にある「読み込むCSS」を、上から順に読み込みます。中で使う別の部品のCSS（DatePickerの中のButtonなど）も含んでいます。

CSSだけで使う場合も、Honoのコンポーネントが出力するHTML構造と状態属性（`data-*`・`aria-*`）をそのまま書きます。各コンポーネントのHTMLはカタログのページに掲載しています。各部品のHTMLは[コンポーネントのリファレンス](components/README.md)の「コード」にもあります。クラス名の決まりは[CSSの構造](css.md)を参照してください。

## Honoで使う

利用アプリでこのパッケージを依存に追加し（[インストール](#インストール)）、`hono`を導入します。TypeScriptでは`jsx: "react-jsx"`と`jsxImportSource: "hono/jsx"`を指定します。これはHonoの構文設定で、Reactには依存しません。

```tsx
import { Hono } from "hono";
import { Button, Field, Input } from "ply/hono";

const app = new Hono();
app.get("/edit", (c) =>
  c.html(
    <form method="post" action="/items">
      <Field id="title" label="名前" help="一覧に表示する名前です。">
        {(attributes) => <Input {...attributes} name="title" required />}
      </Field>
      <Button type="submit" variant="primary" name="intent" value="save">
        保存する
      </Button>
    </form>,
  ),
);
```

- Fieldの`id`はページ内で一意にします。Fieldはラベル、補足・エラーのID、`aria-invalid`と`data-invalid`の対応を組み立てます。
- Input等には標準のHTML属性を渡せます。検証や保存は利用アプリが行います。
- CSSは`stylesheets`の順に`<link>`で読み込みます。

```tsx
import { stylesheets } from "ply/hono";

const Head = () => (
  <head>
    {stylesheets.map((file) => (
      <link rel="stylesheet" href={`/ply/${file}`} />
    ))}
  </head>
);
```

## controllerを登録する

開閉・選択・キーボード操作などが必要なコンポーネントは、対応するcontrollerを利用側のStimulus Applicationへ登録します。

```ts
import { Application } from "@hotwired/stimulus";
import { DialogController, FileInputController } from "ply/controllers";

const application = Application.start(); // 既存のApplicationがあればそれを使う
application.register("dialog", DialogController);
application.register("file-input", FileInputController);
```

登録名は各部品のページの「API」と[controllerの登録名](components/README.md#controllerの登録名)、登録の決まりは[controller](controllers.md)を参照してください。controllerは`@tknf/stimulus-ui`と`@hotwired/stimulus`をpeer dependencyとして使います。

## アイコンを配置する

`Icon`は外部SVGスプライトを参照します。`ply/icons.svg`を同一オリジンの`/assets/ply-icons.svg`へ配置してください。詳しくは[アイコン](icons.md)を参照してください。

## データと保存

業務データ・権限・通信・永続化は利用アプリが持ちます。Plyのコンポーネントは表示と操作だけを持ち、選択・移動・変更は標準のフォーム送信か、キャンセル可能なカスタムイベントで利用側へ知らせます。
