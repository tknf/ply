import { Timeline, ActionLink } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <section class="ply-stack" data-space="small">
      <h3>変更履歴</h3>
      <Timeline
        label="記事の変更履歴"
        items={[
          {
            datetime: "2026-09-15T10:00:00+09:00",
            time: "9月15日 10:00",
            title: "田中さんが案内文を更新",
            content: <p>利用時間とキャンセル条件を追記しました。</p>,
          },
          {
            datetime: "2026-09-14T15:30:00+09:00",
            time: "9月14日 15:30",
            title: "佐藤さんが添付資料を確認",
            content: <ActionLink href="/files">資料を開く</ActionLink>,
          },
        ]}
      />
    </section>
    <section class="ply-stack" data-space="small">
      <h3>公開までの節目</h3>
      <Timeline
        label="公開までの節目"
        variant="milestones"
        items={[
          { datetime: "2026-09-12", time: "9月12日", title: "原稿を作成", state: "complete" },
          { datetime: "2026-09-24", time: "今日", title: "内容を確認", state: "current" },
          { datetime: "2026-09-28", time: "9月28日", title: "公開する", state: "upcoming" },
        ]}
      />
    </section>
    <section class="ply-stack" data-space="small">
      <h3>短い変更履歴</h3>
      <Timeline
        label="短い変更履歴"
        variant="compact"
        items={[
          {
            datetime: "2026-09-24T10:00:00+09:00",
            time: "9月24日 10:00",
            title: "本文を更新",
          },
          {
            datetime: "2026-09-24T14:00:00+09:00",
            time: "9月24日 14:00",
            title: "添付資料を差し替え",
          },
        ]}
      />
    </section>
  </div>
);
