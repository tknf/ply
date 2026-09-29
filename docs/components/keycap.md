<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Keycap

キーボード操作の表記を揃える

## 使いどころ

- 文中や操作の横で、キーボードの操作を示す時に使います。キーの印を出す所は、どの部品でもこの印を使います。
- `DropdownMenu`・`FilterMenu` の `shortcut`、`ActionTile`・`ActionDock` の `shortcut` は、中でこの印の小さい形を使います。

## 使い方

表記だけのコンポーネントです。`keys` の各キーを `kbd` にして並べます。ショートカットの登録と実行は利用側が行います。

`size="small"` はタイルの角やメニューの行の終わりに添える小さな印です。`inverse` は青のメニューや塗った面の上に置く時に使い、地を塗らず、文字と同じ色の淡い縁にします。

文字の基準線に揃えて文中に置き、幅が足りなければキーの間で折り返します。

## アクセシビリティ

- キーは `kbd` として並べます。「⌘」のような記号だけの表記は読み上げで伝わりにくいため、文中に読める名前を添えるか、`aria-label` を付けます。
- 操作の横に添えた表記が操作の名前と重なる時は、`aria-hidden="true"` で読み上げから外します。

## API

### Keycap

| 名前           | 型                     | 既定値      | 説明                                                                                              |
| -------------- | ---------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `keys`（必須） | `readonly string[]`    |             | 同時に押すキーの表記。一つずつ`kbd`にして並べる。記号だけの時は読み上げ用に`aria-label`を添える。 |
| `size`         | `"default" \| "small"` | `"default"` | smallはタイルの角やメニューの行の終わりに添える小さな印。                                         |
| `inverse`      | `boolean`              | `false`     | 青のメニューや塗った面の上に置く時。地を塗らず、文字と同じ色の淡い縁にする。                      |

ほかに、`<span>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/keycap.css`

## コード

```tsx
import { Keycap } from "ply/hono";
export default () => (
  <div class="ply-stack" data-space="small">
    <p>
      <Keycap keys={["⌘", "S"]} aria-label="CommandとS" /> で保存。Windowsでは{" "}
      <Keycap keys={["Ctrl", "S"]} /> を使います。
    </p>
    <p>
      <Keycap keys={["Esc"]} /> で編集に戻ります。
    </p>
    <p>
      次の項目へは <Keycap keys={["Tab"]} />
      、一つ前へは <Keycap keys={["Shift", "Tab"]} /> で移動します。
    </p>
  </div>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<div class="ply-stack" data-space="small">
  <p>
    <span aria-label="CommandとS" class="ply-keycap"><kbd>⌘</kbd><kbd>S</kbd></span>
    で保存。Windowsでは
    <span class="ply-keycap"><kbd>Ctrl</kbd><kbd>S</kbd></span> を使います。
  </p>
  <p>
    <span class="ply-keycap"><kbd>Esc</kbd></span> で編集に戻ります。
  </p>
  <p>
    次の項目へは <span class="ply-keycap"><kbd>Tab</kbd></span
    >、一つ前へは
    <span class="ply-keycap"><kbd>Shift</kbd><kbd>Tab</kbd></span> で移動します。
  </p>
</div>
```

</details>
