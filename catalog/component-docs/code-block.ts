import type { ComponentDoc } from "../reference";

export default {
  id: "code-block",
  name: "CodeBlock",
  description: "設定や短いコードを改行を保って読む",
  api: ["CodeBlock"],
  guidance: [
    "設定・コマンド・短いコードを、改行と字下げを保って読ませる時に使います。",
    "一行の値を写させる欄は `CopyField`、キー操作の表記は `Keycap` を使います。",
  ],
  usage: [
    "`code` と `label` を渡します。名前とコピーの操作は `LayerCard` の層の見出しの行に、コードは層の上の紙に置きます。",
    "`tokens` に色分けした区切りを渡すと着色します。改行も含めて、全ての `content` をつないだ文字列を `code` と一致させます。一致しない時は着色せずに元の `code` を書きます。ライブラリは整形器やハイライターを持たないので、`tokens` は利用側で作ります（見本はサーバー側でShikiの `codeToTokens` を使います）。`tokens` もHTMLも、文字としてエスケープして書きます。",
    "`lineNumbers` で行の頭に番号を振り、`highlight` に1から数えた行の番号を渡すと、その行を淡い黄色の地で目印にします。行番号はコピーする内容に含めません。",
    "長い行は横に、高さが28remを超えるコードは縦に、コード領域の中でスクロールします。右から左に読むページでも、コードは左から右に書きます。",
    "`copy` を付ける時は、`ClipboardController` を `clipboard`、`CodeBlockController` を `code-block`、`ToastController` を `toast` として登録します。コピーの操作はクリップボードに書き込める環境でだけ表示し、表示した全文をコピーして結果をToastで知らせます。成功の知らせは4秒で閉じ、指やフォーカスが載っている間は待ちます。失敗の知らせは、コードを選んでコピーするよう促して閉じるまで残します。",
    "JavaScriptがない時はコピーの操作を出さず、コードは読めます。",
  ],
  keyboard: [
    [
      "Tab",
      "コード領域とコピーの操作へ移ります。フォーカスのあるコード領域は矢印キーでスクロールできます。",
    ],
    [
      "Esc",
      "コピーの結果の知らせが開いている時、フォーカスがCodeBlockの中にあれば知らせを閉じます。",
    ],
  ],
  accessibility: [
    'コード領域は `pre` に `role="region"`・`tabindex="0"` を付け、`label` を名前にします。',
    'コピーの操作は「`label`をコピー」を名前に持ちます。結果は `role="status"` の知らせで読み上げます。',
    "知らせを閉じた時、フォーカスが知らせの中にあればコピーの操作へ戻します。",
    "行番号はCSSで描き、選択とコピーに含めません。",
  ],
  events: [
    [
      "clipboard:beforecopy",
      "コピーの操作を押した時、書き込む前に知らせます。取り消せます。detailは `text`（コピーする全文）・`source`・`reason`（`pointer`・`keyboard`）です。",
    ],
    [
      "clipboard:copy",
      "書き込みを試みた後に知らせます。detailは `text`・`source`・`reason`・`ok`（書き込めたか）・`error`（失敗した時の `DOMException`）です。",
    ],
  ],
} satisfies ComponentDoc;
