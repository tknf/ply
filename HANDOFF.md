# 再開時の確認

- Toolbarはユーザー確認済み。次はDropdownMenuの制作・確認へ進む。順序は`catalog/component-groups.ts`を参照。
- 次の確認先は`http://127.0.0.1:5179/components/dropdown-menu`。必要なら`vp run dev --port 5179`で起動する。
- 入口は`src/hono/dropdown-menu.tsx`、`src/css/components/dropdown-menu.css`、`catalog/hono-examples/dropdown-menu.tsx`。controllerは`src/controllers/index.ts`から上流実装を公開している。実装詳細はソースを読む。
- Toolbarは操作をまとめる配置部品、FilterBarは現在の条件・件数を示す絞り込み部品として残す。中身には共通Button・ActionLinkを使う。
- 上付き対策は[操作部品の文字位置](docs/control-text-alignment.md)を読む。直近の共通フォント変更後にユーザーが確認したのはToolbar。他部品・全ブラウザの表示も確認済みとは扱わない。
- ユーザーはComputer useを禁止している。ブラウザ操作・Playwrightは実行していない。静的検査やSSRの成功を、表示・操作確認済みと言い換えない。
- 「次へ」「続き」は次のコンポーネントの制作を進める指示。確認質問や比較ページへの誘導を繰り返さず、通常の設計判断は自分で行う。トークン使用量と作業時間を抑える。
- 既存Button・Input・ActionLink・Stimulus-ui controllerを調べて再利用する。リポジトリ全体の重複を解消済みとは扱わない。
- Basecampを根拠にする場合は実物を測る。文字位置を`text-box`や非対称paddingで補正しない。余白の二重加算・打ち消しを避ける。
- プロジェクト内への無断のログ・計測記録は禁止。handoffも明示依頼時だけ更新し、実装詳細・作業履歴・テスト成功件数を転記しない。
- 将来ブラウザ検証が明示的に許可された場合は`--reporter=line --output=/tmp/ply-check`を指定する。既定の出力先はプロジェクト内なので使わない。
- `package.json`を先に読み、既存scriptを`vp run`で実行する。説明だけで止めず、依頼された修正を進める。
- Git未初期化。初期化・commit・公開は別途依頼された場合のみ行う。古いdocsの調整案を現行実装へ戻さない。
