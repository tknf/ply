# 開発ガイド

Ply自体を開発するための手順と決まりです。使い方は[README](README.md)と[docs](docs/)を参照してください。

## 準備

Node.js 22.18以降または24.11以降と、Vite+（`vp`）を使います。

```sh
vp install
vp run dev
```

`vp run dev`はCSSの検査とアイコンの生成を行ってから、`http://127.0.0.1:5173`でカタログを起動します。ポートは`vp run dev --port 5178`のように変えられます。

## ソースの構成

| パス              | 内容                                                                 | 公開入口          |
| ----------------- | -------------------------------------------------------------------- | ----------------- |
| `src/css`         | フレームワークに依存しないCSS                                        | `ply/css/*`       |
| `src/hono`        | HonoのSSRコンポーネントと型                                          | `ply/hono`        |
| `src/controllers` | Stimulus controllerの公開入口                                        | `ply/controllers` |
| `src/internal`    | アイコンの一覧や計算など、内部で共有する処理                         | —                 |
| `catalog`         | カタログのHonoアプリと利用例のアプリ                                 | 配布に含めない    |
| `public`          | カタログが配信するアイコンのスプライトと見本の画像                   | 配布に含めない    |
| `scripts`         | ビルド・検査・アイコン生成のスクリプト                               | —                 |
| `test`            | 単体テスト（`test/*.test.ts`）と表示・操作のテスト（`test/browser`） | —                 |

- `index.ts`は再exportだけを持ちます。
- Honoのコンポーネントはブラウザ用のコードをimportしません。
- controllerは自動で起動・登録しません。`@tknf/stimulus-ui`の機能を利用・継承し、Ply固有の配置と操作は追加のcontrollerが持ちます。
- カタログは部品だけで組みます。部品の説明は`catalog/component-docs/<id>.ts`、見本は`catalog/hono-examples/<id>.tsx`、分類は`catalog/component-groups.ts`です。見本のファイルがそのままカタログのHonoのコードとして掲載されます。
- 利用例のアプリの保存処理はカタログの中のデモ（`catalog/controllers`）で、配布物に含めません。

## コンポーネントを足す

1. `src/css/components/<名前>.css`を書き、`src/hono/stylesheets.ts`に加えます。
2. `src/hono/<名前>.tsx`を書き、`src/hono/index.ts`から再exportします。
3. 動作が要る場合は`src/controllers`に書き、`src/controllers/index.ts`から再exportします。
4. `catalog/component-docs/<id>.ts`に説明、`catalog/hono-examples/<id>.tsx`に見本、`catalog/component-groups.ts`に分類を加えます。propsには全てJSDocを書きます（[リファレンス](#リファレンス)）。
5. 既存の部品（Button・Keycap・Badgeなど）を組み合わせ、ボタンや入力欄を作り直しません。まとまった塊は別の部品に切り出します。
6. [デザインの原則](docs/principles.md)に沿っているか、状態・長い文字・狭い場所・使えない時・右から左に読む場合を見本に並べて確かめます。

## リファレンス

各部品のページ（カタログの`/components/<id>`と`docs/components/<id>.md`）は、二つの一次情報から作ります。

| 内容                                                                 | 一次情報                                                  |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| 使いどころ・使い方・キーボード・アクセシビリティ・イベント           | `catalog/component-docs/<id>.ts`                          |
| propsの型・既定値・必須、参照する型、登録するcontroller、読み込むCSS | `src/hono`の型とJSDoc（`scripts/component-api.ts`が読む） |

- propsと、propsが参照する型の項目には、全てJSDocを書きます。標準のHTML属性や`children`のようにJSDocを書けないものは、`propNotes`に書きます。
- 公開する全てのコンポーネントは、いずれか一つのページの`api`に載せます。
- `docs/components/`は生成物です。説明や型を変えたら`vp run docs:components`で生成し直します。
- `vp run test`は、載っていないコンポーネント、説明の無いprops、古い`docs/components/`を検出して失敗します。

## 検証

```sh
vp run check          # 型・lint・format・CSSの規約
vp run test           # 単体テスト
vp run build          # 配布物とカタログの生成
vp run check:package  # 配布物の型で見本をコンパイル
```

- `check:css`（`check`に含む）は、論理プロパティ、ネスト、レイヤー、禁止記法、未定義のトークン、部品のクラス名、操作コンポーネントの文字指定を検査します。
- `check:package`はカタログの見本を`ply/hono`の配布型でもコンパイルし、ソースと公開型の食い違いを検出します。
- 表示と操作のテストはPlaywrightで、Chromium・Firefox・WebKitを使います。

```sh
vp run browsers:install
vp run test:visual
```

`test:visual`は専用の5178番のサーバーを起動・終了し、スクリーンショット・失敗時のtrace・結果を`test-results`に出力します。

### 確認の範囲

- 静的検査、実ブラウザでの寸法・操作、字形のピクセル検査、目での確認は別の証拠として扱います。静的検査の成功を、見た目の確認と言い換えません。
- WebKitのテスト結果は、実機のSafariの確認を代替しません。文字200%の試験はCSSの文字サイズの拡大で、OSの設定やブラウザのズームを代替しません。
- 他のOSのフォント、スクリーンリーダー、実機での確認は、それぞれ別に行います。

## 配布物

```sh
vp run build
vp run preview
```

`dist/hono`・`dist/controllers`・`dist/css`・`dist/icons.svg`がライブラリ、`dist/catalog`が静的なカタログです。配布するCSSとカタログは同じファイルを使います。

アイコンを足す場合は`src/internal/icon-manifest.json`に加え、`vp run icons:build`でスプライト・CSS用のSVG・`IconName`型を生成し直します。

## 操作コンポーネントの文字位置

Button・Input・DatePickerなどの操作コンポーネントでは、文字が枠の中央より上に見える「上付き」を既知の不具合として扱います。UIを変える前にこの節を読み、再発させないでください。

### 原因

CSSの行の箱が枠の中央にあっても、字形の見た目の中心が一致するとは限りません。行の上下の位置は、フォントのascent・descentと行間の情報で決まります（[CSSの行高の計算](https://www.w3.org/TR/CSS2/visudet.html#line-height)）。macOSのWebKitには、Hiraginoのdescentを増やしてlineGapを減らす補正があり（[WebKitの実装](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/platform/graphics/coretext/FontCoreText.cpp#L155)）、これが字形と行の箱の中心をずらします。高さや行高を変えるだけでは直りません。

### 対策

操作コンポーネントは[tokens.css](src/css/tokens.css)の共通フォント定義を使います。

```css
--ply-control-font-family:
  "Ply UI Latin", "Ply UI Japanese", "Helvetica Neue", Arial, var(--ply-font);
```

- ローカルのHelvetica NeueとHiragino Sansに別名を付け、両方の行メトリクスをascent 89%・descent 11%・line gap 0%にそろえます（[フォントの行メトリクスの指定](https://drafts.csswg.org/css-fonts-4/#font-metrics-override-desc)）。90%以上では16pxで下へ寄るため、89%にしています。
- 太さ400と600〜900を別のローカル書体へ対応付けます。InputとInputGroupは太さ400を持ち、親の太字を継承しません。
- フォントのダウンロードは行いません。該当する書体が無い環境はシステムフォントへフォールバックします。
- 本文用の`--ply-font`はHiragino優先のままです。
- Buttonの文字は通常14px・largeは16pxです。largeの文字を大きくすると中心が1px下へずれるため、この大きさを保ちます。

### 検査

- [control-text.mjs](scripts/control-text.mjs)は、共通Buttonのフォント・太さ・行高・中央揃え・上下余白を検査します。派生コンポーネントからの上書き、ラベルの子要素だけの移動、状態別・メディア条件内の変更、操作用フォントのトークンを本文用に戻す変更、`font: inherit`、共通コンポーネントを迂回する生のbuttonも検出します。既存の専用操作の例外は、このファイルで宣言単位に管理します。
- `vp run check`・`vp run dev`・`vp run build`の開始時に検査します。[Viteプラグイン](scripts/control-text-plugin.ts)は起動中のサーバーでの変更もエラーにします。
- [回帰テスト](test/control-text.test.ts)は既知の崩れ方を混入させ、拒否されることを確かめます。文字の指定を変えたら`vp run test test/control-text.test.ts`を実行します。
- [描画の回帰テスト](test/browser/control-text.spec.ts)は、2倍密度の描画から字形の上下端を求め、枠の中心との差が0.5px以内であることを確かめます。Hiraginoを読み込める環境だけが対象で、無い環境ではスキップします。

静的な検査は、既知のソース上の退行を検出するものです。実際のフォールバックフォントやブラウザが描く字形のピクセルまでは再現しません。

### 守ること

- Buttonの文字・縦配置は`src/css/components/button.css`が持ちます。コンポーネント固有のCSSからfont shorthand・太さ・行高・上下余白・文字の移動で上書きしません。
- 新しいコンポーネントでボタンや入力欄を作り直さず、共通のコンポーネントと操作用フォントを使います。ネイティブのbuttonを足す場合は、文字の指定をどこが持つかを明示します。
- `font: inherit`はfont-familyも上書きします。親が本文用フォントの場合に基準を失わないか確かめます。
- `text-box`、非対称なpadding、負の余白、文字の`translate`による個別の補正を足しません。枠・余白・行高をどこが持つかを確かめ、二重に足しません。
- DropdownMenuの項目は上揃えです。上下の余白は「一行時の高さ − 行高 − 上下の枠線」の半分ずつにし、一行なら中央に見え、複数行なら同じ上端から下へ伸びるようにします。`align-items: center`で内容全体を中央へ寄せません。
- 検査に失敗したら実装を直します。検査を通すために基準や例外を増やしません。基準を変える必要がある場合は、影響するコンポーネント、変更の理由、既知の崩れ方を検出し続ける回帰テストをそろえます。
- 再発した時は、共通フォントの適用・上書き・フォールバックを先に調べ、次に高さ・行高・上下余白・枠線の組み合わせを確かめます。
