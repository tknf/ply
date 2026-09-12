import { DataList, Badge } from "../../src/hono";

export default () => (
  <DataList
    items={[
      {
        title: "長い名前のデータも省略せずに表示します",
        href: "/example",
        description: "2026年9月9日更新",
        end: <Badge tone="success">公開中</Badge>,
      },
      { title: "0件の状態", end: 0 },
    ]}
  />
);
