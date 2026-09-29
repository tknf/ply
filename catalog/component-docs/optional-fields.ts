import type { ComponentDoc } from "../reference";

export default {
  id: "optional-fields",
  name: "OptionalFields",
  description: "必要な時だけ足す欄と、足せる項目のチップ",
  api: ["OptionalFields"],
  guidance: [
    "予定のリンク・場所・招待・メモ・繰り返しのように、多くの場合は空のままの欄を隠し、要る時だけ足してフォームを短く見せる時に使います。",
    '検索の条件を一つずつ足す列は、`layout="stack"` でチップを縦に並べます。',
    "いつも入力する欄は隠さず `Field` で並べます。見出しの下の詳しい内容をまとめて開閉する時は `Disclosure` を使います。",
  ],
  usage: [
    "`items` の一件ごとに、押すと現れる欄（`field`）とチップを作ります。足した欄は上に積み、チップは下に並べます。チップを押すとその欄が現れ、チップは消えて、欄の最初の入力へフォーカスが移ります。足した欄をまた隠す操作はありません。",
    "値が入っている項目は `open` で最初から欄を出し、チップを出しません。保存した値から `open` を決めるのは利用側です。",
    "隠れている欄の入力もフォームに含まれ、空の値のまま送信されます。空の値を「未入力」として扱うのは送信先で行います。",
    "`OptionalFieldsController` を `optional-fields` として登録します。欄を足すたびに `optional-fields:add` を出します。",
    "JavaScriptが無い時は、チップを押しても欄は現れません。`open` の欄だけを使えます。",
  ],
  accessibility: [
    'チップの並びは `role="group"` で、`label` を読み上げ名にします。',
    "チップは `aria-controls` で現れる欄を指し、`aria-expanded` で欄を出したかを伝えます。押した後はチップが消えるので、欄の最初の入力へフォーカスを移します。",
  ],
  events: [
    [
      "optional-fields:add",
      "チップを押して欄を出した後に出します。detailは `id`（足した項目の `id`）です。取り消せません。",
    ],
  ],
} satisfies ComponentDoc;
