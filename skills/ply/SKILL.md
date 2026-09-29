---
name: ply
description: "@tknf/ply（Ply）を使って、管理画面・業務システム・サービスの画面を組む、または変更する時に使う。コンポーネントの選び方、アプリの骨格（AppShell・CommandMenu・作業面）、CSSの読み込み順と上書き、Hono JSXのコンポーネント、Stimulus controllerの登録とイベント、アイコンの配置、操作コンポーネントの文字位置の注意点を扱う。"
---

# Plyで画面を組む（`@tknf/ply`）

Plyは、管理画面・業務システム・一般利用者向けのサービスで再利用するデザインシステムです。CSSとセマンティックHTMLを基盤に、同じHTMLを出力するHono JSXのSSRコンポーネントと、開閉・選択・キーボード操作を担うStimulus controllerを提供します。

コードを書く前に、使う版のパッケージ（`node_modules/@tknf/ply`）の型定義と、[コンポーネントのリファレンス](https://github.com/tknf/ply/blob/main/docs/components/README.md)でprops・登録名・イベントを確かめます。記憶でAPIを書きません。

## 層とimport

| 層                  | import                  | 使う時                                         |
| ------------------- | ----------------------- | ---------------------------------------------- |
| CSS                 | `@tknf/ply/css/*`       | どのフレームワークでも。HTMLは自分で書く       |
| Hono JSX            | `@tknf/ply/hono`        | HonoでSSRする。CSSと同じHTMLを出力する         |
| Stimulus controller | `@tknf/ply/controllers` | 開閉・選択・キーボード操作が要るコンポーネント |
| アイコン            | `@tknf/ply/icons.svg`   | `Icon`が参照するSVGスプライト                  |

peer dependencyは使う層だけ入れます。Hono JSXには`hono`、controllerには`@hotwired/stimulus`と`@tknf/stimulus-ui`です。TypeScriptでは`jsx: "react-jsx"`と`jsxImportSource: "hono/jsx"`を指定します。

## まずPlyのコンポーネントを探す

画面の要素ごとに、**Plyのコンポーネント → Plyのコンポーネントの組み合わせ → 独自の実装**の順に選びます。

- [references/components.md](references/components.md)で、分類ごとの一覧と一行の説明から候補を探します。
- 候補のリファレンスの「使いどころ」で、似たコンポーネントとの使い分けを確かめます。
- 独自の実装は、Plyのコンポーネントとその組み合わせで満たせない要件がある時だけにします。その要件と、確かめたコンポーネントの制約を説明できるようにします。
- ボタン・入力欄・バッジなどを独自に作り直しません。既存のコンポーネントを組み合わせ、まとまった塊は別の部品として切り出します。
- 業務データ・権限・通信・永続化は、利用するアプリが持ちます。Plyは表示と操作だけを持ちます。

## アプリの骨格

アプリの画面は`AppShell`で組みます。

- 上部中央に`CommandMenu`を一つ置き、中央に作業面を置きます。
- 常設のサイドバーは置きません。
  - 作業面の補助は`Wing`（作業面の左右に開閉するパネル）で添えます。
  - 同じ領域のページの切り替えは、作業面の中の`Navigation`や`Tabs`で行います。
- `AppShell`を使わない画面では、作業面に`Surface`を使います。

## CSSの読み込みと上書き

- 読み込み順は、次のとおりです。CSSの中では`@import`を使いません。
  1. `layers.css`
  2. `reset.css`・`tokens.css`・`base.css`・`layout.css`
  3. 使うコンポーネントの`components/*.css`
- 全てのコンポーネントを使う場合は、`@tknf/ply/hono`の`stylesheets`の順に`<link>`で読み込みます。
- コンポーネントを選んで読み込む場合は、リファレンスの「読み込むCSS」を上から順に読み込みます。
- カスケードレイヤーの優先順は`reset, base, tokens, layout, components, utilities, overrides`です。利用側の調整は`@layer overrides`に書きます。
- 色・大きさ・角丸・影は値を直接書かず、`--ply-*`のトークンを参照します。
- 余白や位置は論理プロパティで書きます。
- CSSだけで使う場合も、Honoのコンポーネントが出力するHTML構造と状態属性（`data-*`・`aria-*`）をそのまま書きます。
- クラス名の決まりは次のとおりです。
  - ルートは`ply-`付きのkebab-caseにする。
  - 内部の部分は、ルートからの直下の役割名で指定する。
  - バリエーションと状態は、クラスではなく属性で表す。

## 操作コンポーネントの文字位置

ButtonとInputの文字・行高・上下の余白は、そのコンポーネントのCSSが持ちます。

- 外側から`font`・`line-height`・上下の`padding`・文字の移動を上書きしません。上書きすると、文字が枠の中で上にずれます。
- 大きさを変える時は、`data-size`などのコンポーネントの指定を使います。
- ネイティブの`button`を追加する場合は、その文字の指定をどのCSSが持つかを決めてから書きます。
- DropdownMenuの項目は上揃えです。`align-items: center`で内容全体を中央へ寄せません。

## controllerを登録する

- controllerは自動で起動・登録しません。使うコンポーネントのcontrollerだけを、決まった登録名で登録します。
  - Honoのコンポーネントは、その登録名を`data-controller`に出力します。別の名前で登録すると動きません。
  - 一つのコンポーネントが複数のcontrollerを使うことがあります（Tableは`table`・`table-sort`・`table-select`）。全て登録します。
  - 登録名の一覧は、[references/components.md](references/components.md)の最後の表にあります。

```ts
import { Application } from "@hotwired/stimulus";
import { DialogController, DropdownMenuController } from "@tknf/ply/controllers";

const application = Application.start(); // 既存のApplicationがあればそれを使う
application.register("dialog", DialogController);
application.register("dropdown-menu", DropdownMenuController);
```

- controllerは、選択・移動・変更のたびに`<登録名>:<出来事>`のカスタムイベントを発火します（`dropdown-menu:select`、`board:move`など）。
- `before`で始まるイベントと、リファレンスで取り消せると書いたイベントは、`preventDefault()`で取り消せます。
- 保存・通信・権限の確認は、利用側でイベントを受けて行います。イベントの`detail`はサーバー側でも検証します。
- 通常のフォーム、リンク、`details`は、JavaScriptなしでも動きます。JavaScriptなしの振る舞いは、リファレンスの「使い方」にあります。

## アイコン

- `Icon`は外部のSVGスプライトを参照します。
- `@tknf/ply/icons.svg`を、利用するアプリと同じオリジンの`/assets/ply-icons.svg`に置きます。
- アイコンだけで意味を伝えず、名前や読み上げ名を添えます。

## 確かめること

- 狭い幅（375px前後）と文字200%で、はみ出しや重なりがないか。
- 右から左に読む言語（`dir="rtl"`）で、配置と矢印キーの向きが入れ替わるか。
- 強制カラーモードと、動きを減らす設定でも、状態と操作が分かるか。
- ブラウザはPopover APIに対応したものを前提にしています。Popover・Toast・DropdownMenu・CommandMenuが使います。

## 参照

- [references/components.md](references/components.md)：分類ごとのコンポーネントの一覧と、controllerの登録名。
- [導入](https://github.com/tknf/ply/blob/main/docs/getting-started.md)：CSSだけで使う、Honoで使う、controllerを登録する。
- [デザインの原則](https://github.com/tknf/ply/blob/main/docs/principles.md)：形・面・色・状態・余白・動きの決まり。
- [トークン](https://github.com/tknf/ply/blob/main/docs/tokens.md)：`--ply-*`の種類。
- [CSSの構造](https://github.com/tknf/ply/blob/main/docs/css.md)：読み込み順、レイヤー、クラス名。
- [controller](https://github.com/tknf/ply/blob/main/docs/controllers.md)：登録の決まりとイベントの規約。
- [アイコン](https://github.com/tknf/ply/blob/main/docs/icons.md)：大きさ、配置、ライセンス。
