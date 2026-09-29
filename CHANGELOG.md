# 変更履歴

このプロジェクトの利用者に関わる変更を記録します。

書式は[Keep a Changelog](https://keepachangelog.com/ja/1.1.0/)に、版の付け方は[Semantic Versioning](https://semver.org/lang/ja/)に従います。

## [Unreleased]

## [1.0.0] - 2026-09-29

### 変更

- 公開APIを安定版とした。以降、互換性のない変更はmajorの版で出す。配布するコード・CSS・型・アイコンは0.1.0と同じ。
- Agent Skill（`skills/ply`）とコンポーネントのリファレンスの説明を、平易な日本語に直した。

## [0.1.0] - 2026-09-29

### 追加

- 最初の公開。フレームワークに依存しないCSS（`@tknf/ply/css/*`）、同じHTMLを出力するHono JSXのSSRコンポーネント（`@tknf/ply/hono`）、Stimulus controller（`@tknf/ply/controllers`）、アイコンのSVGスプライト（`@tknf/ply/icons.svg`）を提供する。
- Plyで画面を組むためのAgent Skillを、リポジトリの`skills/ply`に同梱する（npmのパッケージには含まない）。

[Unreleased]: https://github.com/tknf/ply/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/tknf/ply/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/tknf/ply/releases/tag/v0.1.0
