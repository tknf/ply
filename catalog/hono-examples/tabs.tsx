import { Tabs } from "../../src/hono";

export default () => (
  <Tabs
    id="hono-tabs"
    label="項目の補足"
    selected="unavailable"
    items={[
      { value: "content", label: "内容", content: <p>最初の有効なパネルを表示します。</p> },
      {
        value: "unavailable",
        label: "受付停止中",
        disabled: true,
        content: <p>選択できません。</p>,
      },
      { value: "settings", label: "設定", content: <p>設定のパネルです。</p> },
    ]}
  />
);
