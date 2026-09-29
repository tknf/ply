# 対象範囲

2026年9月15日。カタログ全56分類と、Field内のInput・Textarea・Select・Choice・PasswordField・CountedTextarea・Combobox・CheckboxGroup・NumberField・DateField・TimeFieldを対象とする。

[分類と全件一覧](../catalog/component-groups.ts)、[公開API](../src/hono/index.ts)、[採否・変更・追加提案](component-audit.md)を参照する。カタログ上の分類数を、独立した公開関数の数や完成率と混同しない。

CSS、標準HTML、Hono JSX、必要なStimulus controllerを提供する。各コンポーネントのページは、実表示、同じ表示のHTML、Honoの利用コードを持つ。カタログの入口（`/`）では全コンポーネントを分類ごとに案内し、利用例のアプリ（`/apps/project`など）では組み合わせを確認できる。

業務データの保存・認証・通信、リッチテキスト編集、仮想スクロール表、グラフ描画、非同期の複数選択Pickerは提供していない。Boardの列間移動・並べ替えは9月16日に追加した。各アプリの機能完成や、全OS・実機での確認完了を意味しない。
