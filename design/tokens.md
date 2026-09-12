# トークンの利用

定義と現在値は[src/css/tokens.css](../src/css/tokens.css)を参照する。数値表を別途複製しない。

- 公開語彙は`--ply-*`。primitiveから用途トークンへ参照し、必要な部品だけ専用トークンを持つ。
- 背景・本文・リンク・状態色は用途トークンで指定する。部品の背景に応じて利用側でもコントラストを確認する。
- 書体は`--ply-font`。Hiraginoを持たない環境ではシステムフォントへフォールバックする。
- Buttonは`--ply-button-font`のfluid値を基準に、高さ・余白をemで追従させる。通常とcompactは左右余白、largeは文字サイズと高さの比率が異なる。
- Buttonの比率の根拠は[Basecampの実測](../docs/references/37signals-20260910/button-measurements-20260911.md)。fluidの式はPlyの設計値で、Basecampから取得した式ではない。
- `--ply-duration`はreduced-motion時に0となる。現在の対象テーマはライト。
