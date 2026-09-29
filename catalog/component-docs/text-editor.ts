import type { ComponentDoc } from "../reference";

export default {
  id: "text-editor",
  name: "TextEditor",
  description: "書式の道具を並べた書く面",
  api: ["TextEditor"],
  guidance: [
    "返信・日記・コメントなど、太字や箇条書きの付いた文を書く面を置く時に使います。",
    "書式の要らない本文は `Textarea`、本文と添付・送信ボタンをまとめた入力面は `Composer` を使います。`Composer` の `editor` にこの部品を入れることもできます。",
  ],
  usage: [
    '`id` と `label` を渡します。書式の道具（太字・斜体・取り消し線・リンク・見出し・引用・コード・箇条書き・番号付きの箇条書き・ファイルを添える・元に戻す・やり直す）を並べ、その下に書く面を置きます。`tools` で並べる道具を選び、`"|"` で区切りを入れます。',
    '`placement="bottom"` にすると道具を書く面の下に置きます。`actions` に渡した送信・下書きの保存などの操作は、道具の並びの終わりに置きます。',
    'この部品は見た目と道具の並びだけを持ち、特定のエディターに依存しません。書式を付ける動きは利用側のエディターに任せます。`editor` に任意のリッチテキストのエディターが描く書く面（`contenteditable` の要素）を渡し、道具のボタンの `data-text-editor-tool`（`bold`・`italic`・`link`・`bullets` など）を読んでエディターの操作を呼びます。今の書式の道具に `data-active="true"` を付けると、淡い青の面で示します。',
    "`editor` を渡さなければ `textarea` を置きます。`name`・`placeholder`・`value`・`disabled` などの残りの属性は `textarea` に付き、`class` は外側の要素に付きます。`textarea` のままの時も、道具を働かせるのは利用側です（書式の記号を差し込むなど）。道具を働かせない時は `tools={[]}` にします。道具も `actions` も無い時は、道具の並びを描きません。`disabled` は道具も押せなくします。",
    "道具の並びは `ToolbarController` を `toolbar` として登録して使います。書式を付ける動きのcontrollerは持ちません。送信する値は `textarea` の本文か、`editor` の側で用意した値です。JavaScriptが無い時は `textarea` に書いた文を送ります。",
  ],
  accessibility: [
    '道具の並びは `role="toolbar"` で、「`label`の書式」を名前にし、`aria-controls` で `id` の書く面を指します。`editor` を渡す時は、書く面の要素に同じ `id` と、`aria-label` などの名前を付けます。',
    "道具のボタンは名前を持ち、指を載せると同じ名前を出します。",
    "道具の並びは一つのTab停止点で、Tabで入ると前にいた道具（初めは先頭の使える道具）に止まり、矢印キーで道具の間を移ります。`actions` の操作は道具とは別のTab停止点です。",
    '道具はJavaScriptで働くものなので、controllerが付くまでは全ての道具を `tabindex="-1"` にして、Tabで止めません。',
  ],
  keyboard: [
    ["Tab", "道具の並びへは一か所だけで入ります。"],
    ["←・→", "前後の道具へ移ります。端では反対の端へ回ります。右から左に読む時は逆です。"],
    ["Home・End", "最初・最後の使える道具へ移ります。"],
    ["Enter・Space", "フォーカスのある道具を押します。"],
  ],
} satisfies ComponentDoc;
