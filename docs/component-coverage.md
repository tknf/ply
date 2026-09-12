# 部品の対象と実装状況

2026-09-10。第四版15点の指摘を受け、事例中心から部品中心へ変更する。26種類という既存の数は、必要範囲の網羅率を表していなかった。

今回の対象はCSS・標準HTML・Honoで提供する業務UIの基本部品50種類。Input・Textarea・Select・Choiceなど既存Field内の公開部品は重複して加算しない。以下24種類を追加する。

| 部品         | 用途                               |
| ------------ | ---------------------------------- |
| Avatar       | 人物やチームを名前と一緒に示す     |
| Breadcrumb   | 階層をたどって上位へ戻る           |
| Navigation   | 同じ領域のページを切り替える       |
| Steps        | 手順と現在の段階を示す             |
| Toolbar      | 対象に対する複数の操作をまとめる   |
| InputGroup   | 単位や接頭辞を入力と並べる         |
| Switch       | 二択の設定を切り替える             |
| Range        | 連続する数値を調整する             |
| Suggestion   | 自由入力に候補を添える             |
| DatePicker   | 単日・期間を選び明示した項目へ送る |
| Tag          | 分類や選択した条件を短く示す       |
| Statistic    | 集計値と単位をひとまとまりにする   |
| Card         | 関連する内容と操作を一つにまとめる |
| Timeline     | 出来事を時系列で読む               |
| TaskList     | 完了操作と担当・期日を並べる       |
| Calendar     | 日付と予定を月単位で見渡す         |
| Board        | 仕事を状態ごとの列で見る           |
| ErrorSummary | 送信時の問題と修正先をまとめる     |
| Loading      | 待っている処理を言葉で示す         |
| Toast        | 操作結果を閉じるまで読める形で示す |
| Popover      | 補足や小さな操作を必要な時に開く   |
| CodeBlock    | 設定や短いコードを改行を保って読む |
| Keycap       | キーボード操作の表記を揃える       |
| Divider      | 意味のある区切りと見出しを置く     |

既存26種類はSurface、ContextBar、PageHeader、Button、Field、FieldGroup、Badge、Notice、Table、Comparison、ValueList、FileInput、FileItem、ImageFrame、Disclosure、Progress、Pagination、FilterBar、DataList、ActionList、EmptyState、Dialog、DropdownMenu、Tabs、DangerZone、Icon。

各部品に配布CSS、Hono公開型、HTML表示・コピー用コード、実際にSSRするHono利用例を揃える。状態と業務保存は区別する。ボードのドラッグ、リッチテキスト編集、仮想スクロール表、グラフ描画、独自の複数選択comboboxはこの50種類には含まれず、全UIの完成と呼ばない。標準Select・Textarea・datalist等との違いを隠さない。

事例は共通部品を組み合わせて案件管理・設定・予定を構成する。サーバー保存・送信・権限管理の実装ではない。
