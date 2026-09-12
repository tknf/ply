# BasecampのButton実測とPlyへの反映

2026-09-11。ログイン済みBasecampのDocs & Files、文書新規作成、To-dosで、表示中の操作要素に対して`getBoundingClientRect()`と`getComputedStyle()`を実行した。以下は画像からの推測ではなくCSS pxでのDOM実測。文書の投稿・保存、To-doの追加は行っていない。

## 実測値

| 画面・操作                                   | 高さ | 文字 / 行高 | ウェイト | 上下 / 左右padding | 角丸 |
| -------------------------------------------- | ---- | ----------- | -------- | ------------------ | ---- |
| Docs & Files / Sort manually                 | 32px | 14 / 21px   | 400      | 0 / 10.5px         | 8px  |
| 文書作成・上部 / Save a draft、Post this doc | 32px | 14 / 21px   | 400      | 0 / 7px            | 8px  |
| 文書作成・下部 / Save a draft、Post this doc | 40px | 16 / 24px   | 400      | 0 / 13.6px         | 8px  |
| To-dos / New list、View as、Update           | 32px | 14 / 21px   | 400      | 0 / 10.5px         | 8px  |
| To-dos / Add a to-do（文字リンク型）         | 31px | 18 / 27px   | 400      | 2 / 0px            | 0px  |

文書上部の幅はSave a draftが92.546875px、Post this docが99.046875px。下部ではそれぞれ116.84375px、124.28125px。文字列とフォントに依存するため、幅そのものをPlyへ固定しない。

文書の主操作背景・文字リンクは`rgb(35, 119, 210)`。補助操作は白地で、境界は同じ青のalpha 0.25。Plyの青・コントラスト方針は今回変更せず、寸法・文字の強さ・角丸を反映する。

## Plyの変更

変更前のDOM実測は通常44px、compact36px。両方とも文字14px・行高21px・ウェイト600・角丸6px。左右paddingは通常16px、compact12pxだった。文字に対する面積と太さがBasecampより大きかった。

変更後は通常32px・左右10.5px、compact32px・左右7px。largeを追加し40px・文字16px・左右13.6pxとする。ウェイト400、角丸8px。通常を一覧操作、compactを上部の狭い操作、largeをフォーム末尾等で明示的に選ぶ。primaryを自動的にlargeにはしない。

ChromeのPly実画面でも高さ32 / 32 / 40px、文字14 / 14 / 16px、行高21 / 21 / 24px、左右10.5 / 7 / 13.6px、ウェイト400、角丸8pxを確認。日本語「保存する」の幅は79 / 72 / 93.1875pxだった。

高さは固定heightではなくmin-block-sizeとし、長文・文字拡大で伸びる。Grid内で単独のButtonが全幅へ伸びていた点も`justify-self: start`で修正する。他部品の44pxトークンはButtonの合意対象から分離して維持する。

これは今回観察した操作の実測であり、Basecampの全ボタンが同寸法という主張ではない。PlyのButtonはユーザー確認待ち。

## 文字位置の追加補正

ユーザーの「文字が若干上付き」に対応。Chromeの通常・compactで文字領域の上余白8.5px、下余白9.5pxを実測した。開始側paddingを1px加えて文字の中央位置を0.5px下げ、上下9pxへ揃えた。高さ32pxは維持。largeは補正せず上下12px。日本語「保存する」と英字混在「primaryの操作」「secondaryの操作」で確認した。これはDOMの文字領域の測定で、個々の字形のインク部分の重心ではない。
