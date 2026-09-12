import { ActionList, Icon, Badge } from "../../src/hono";
export default () => (
  <ActionList
    layout="grid"
    items={[
      {
        title: "記事を書く",
        href: "/example",
        description: "内容と公開設定を整えます。",
        icon: <Icon name="pencil" />,
        accent: "yellow",
        preview: (
          <>
            <Badge tone="warning">下書き</Badge>
            <p>編集中の記事を確認できます。</p>
          </>
        ),
      },
      {
        title: "予約条件を確認する",
        href: "/reservation",
        icon: <Icon name="calendar" />,
        accent: "green",
      },
    ]}
  />
);
