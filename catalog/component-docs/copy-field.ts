import type { ComponentDoc } from "../reference";

export default {
  id: "copy-field",
  name: "CopyField",
  description: "写して使う値の欄と、写す丸い印",
  api: ["CopyField"],
  guidance: [
    "公開リンクや招待リンク、APIの鍵のように、ほかの場所へ写して使う値を見せる時に使います。",
    "書き換える値は `Field` と `Input`、長いコードの断片を写す時は `CodeBlock` を使います。",
  ],
  usage: [
    "`value` を読み取り専用の欄に出し、欄の終わりに写す操作の丸い印を置きます。写せると印がペンで描くチェックに変わり、1.8秒ほどで元の印に戻ります。長い値は欄の中で省略します。",
    "`actions` には、リンクを作り直すなどの操作を写す印の後に並べます。作り直した値の取得と保存は利用側が行い、新しい `value` で描き直します。",
    "欄に `name` は無く、フォームで送信しません。",
    "写す動きは `ClipboardController`、写した時の印と読み上げは `CopyFieldController` が持つので、`clipboard` と `copy-field` の両方を登録します。写す印はcontrollerが接続してから出し、クリップボードへ書き込めないブラウザでは隠したままにします。写せなかった時は印を変えず、欄の下に `failedLabel`（既定は「写せませんでした。欄の値を選んでコピーしてください。」）を出し、次に写す操作をするまで残します。",
    "欄にフォーカスすると値を全て選ぶので、キーボードではそのままブラウザのコピーでも写せます。",
    "JavaScriptが無い時は、写す印を出しません。欄の値を選んで、ブラウザのコピーで写します。",
  ],
  accessibility: [
    "写す印はアイコンだけのボタンで、`copyLabel` を読み上げ名とツールチップにします。",
    '写せた時は `copiedLabel`、写せなかった時は `failedLabel` を、見えない `role="status"` の領域で読み上げます。写せなかった知らせは色だけでなく、アイコンと文でも示します。',
  ],
  events: [
    [
      "clipboard:beforecopy",
      "写す前に出します。取り消せます。detailは `text`（写す値）・`source`・`reason`（`pointer` か `keyboard`）です。",
    ],
    [
      "clipboard:copy",
      "写し終えた後に出します。detailは `text`・`source`・`reason`・`ok`（写せたか）・`error`（写せなかった時の `DOMException`）です。",
    ],
  ],
} satisfies ComponentDoc;
