import { Timeline, ActionLink } from "../../src/hono";
export default () => (
  <Timeline
    label="記事の変更履歴"
    items={[
      {
        datetime: "2026-09-15T10:00:00+09:00",
        time: "9月15日 10:00",
        title: "田中さんが案内文を更新しました",
        content: <p>利用時間とキャンセル条件を追記しました。</p>,
      },
      {
        datetime: "2026-09-14T15:30:00+09:00",
        time: "9月14日 15:30",
        title: "佐藤さんが写真と添付ファイルの公開前の確認を終えました",
        content: (
          <>
            <p>使用許可を確認できた写真を追加しています。</p>
            <ActionLink href="/files">添付ファイルを確認する</ActionLink>
          </>
        ),
      },
      { datetime: "2026-09-12", time: "9月12日", title: "記事を作成しました" },
    ]}
  />
);
