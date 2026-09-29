# 変更履歴

このプロジェクトの利用者に関わる変更を記録します。

書式は[Keep a Changelog](https://keepachangelog.com/ja/1.1.0/)に、版の付け方は[Semantic Versioning](https://semver.org/lang/ja/)に従います。

## [Unreleased]

## [1.1.0] - 2026-09-29

### 追加

- `AppShell`に、作業面の幅を選ぶ`size`（`compact`・`default`・`wide`）を追加した。`compact`は46rem、`default`は68rem、`wide`は112remを上限にする。

### 変更

- `AppShell`の作業面の上下の余白を広げた（広い画面で3.5rem、狭い画面で2rem）。
- `Wing`の幅が56rem以上の時、パネルが開く時にDialog・Popoverと同じく少し行き過ぎてから戻るようにした。
- `AppShell`の作業面で、横スクロールする`Board`・`Table`・`Grid`・`Calendar`が、作業面の左右の余白の分だけ外側に広がり、作業面の端までスクロールできるようにした。スクロールしていない時の表示位置は変わらない。段組みや`Card`などの中では広げない。

### 修正

- `PageHeader`に`description`があると、`icon`と`actions`が見出しと補足文を合わせた高さの中央に表示されていた。見出しの1行目の上端に揃えるようにした。
- `AppShell`のバーの下端で、作業面の影が直線的に途切れていた。バーの下に背景色から透明へのグラデーションを置き、バーと作業面の間を0.5remから1.5remに広げた。
- `AppShell`でスクロールすると、`z-index`を持つ作業面の中の要素（ButtonGroupの選択中のボタン、`wings`を指定した時の作業面など）がバーの上に表示されていた。
- `AppShell`の作業面の先頭に`ContextBar`を置くと、パンくずの上下が空きすぎ、見出しより右にずれていた。`Surface`と同じく、見出しと同じ左右の位置に置いて区切り線を消し、作業面の上の余白を詰めるようにした。
- `Wing`を閉じる時、加速したまま急に止まり、最後にパネルが跳んで見えていた。減速して止まるようにした。
- `AppShell`の中の`Wing`を開く時、行き過ぎたパネルが画面の外へ出て、一瞬だけ横スクロールが出ていた。
- `Board`で、カードの影が下端で切れていた。また、列が収まらない時に、たたんだ列の幅が0になり、ピルが隣の列にはみ出していた。

## [1.0.0] - 2026-09-29

### 変更

- 公開APIを安定版とした。以降、互換性のない変更はmajorの版で出す。配布するコード・CSS・型・アイコンは0.1.0と同じ。
- Agent Skill（`skills/ply`）とコンポーネントのリファレンスの説明を、平易な日本語に直した。

## [0.1.0] - 2026-09-29

### 追加

- 最初の公開。フレームワークに依存しないCSS（`@tknf/ply/css/*`）、同じHTMLを出力するHono JSXのSSRコンポーネント（`@tknf/ply/hono`）、Stimulus controller（`@tknf/ply/controllers`）、アイコンのSVGスプライト（`@tknf/ply/icons.svg`）を提供する。
- Plyで画面を組むためのAgent Skillを、リポジトリの`skills/ply`に同梱する（npmのパッケージには含まない）。

[Unreleased]: https://github.com/tknf/ply/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/tknf/ply/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/tknf/ply/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/tknf/ply/releases/tag/v0.1.0
