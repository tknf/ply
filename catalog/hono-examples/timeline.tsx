import { Timeline } from "../../src/hono";

export default () => (
  <Timeline
    label="変更履歴"
    items={[
      {
        datetime: "2026-09-10T10:00:00+09:00",
        time: "9月10日 10:00",
        title: "田中さんが本文を更新",
        content: <p>利用時間を追記しました。</p>,
      },
      { datetime: "2026-09-09T15:00:00+09:00", time: "9月9日 15:00", title: "記事を作成" },
    ]}
  />
);
