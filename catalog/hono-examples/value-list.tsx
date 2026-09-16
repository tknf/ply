import { ValueList, Badge, ActionLink } from "../../src/hono";
export default () => (
  <ValueList
    items={[
      { label: "公開状態", value: <Badge tone="success">公開中</Badge> },
      {
        label: "公開日時",
        value: <time datetime="2026-09-15T10:00:00+09:00">2026年9月15日 10:00</time>,
      },
      { label: "予約件数", value: 0, description: "今月の受付分です。" },
      { label: "担当者", value: null },
      {
        label: "利用規約とキャンセル条件",
        value: (
          <>
            <p>前日までのキャンセルは無料です。当日の変更は受付にご相談ください。</p>
            <ActionLink href="/reservation">予約内容を確認する</ActionLink>
          </>
        ),
      },
      { label: "管理番号", value: "workspace-autumn-2026-abcdefghijklmnopqrstuvwxyz0123456789" },
    ]}
  />
);
