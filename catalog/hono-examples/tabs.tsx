import { Tabs } from "../../src/hono";

export default () => (
  <div class="ply-stack">
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
    <Tabs id="hono-tabs-empty" label="項目がないタブ" items={[]} />
    <Tabs
      id="hono-tabs-unavailable"
      label="利用できないタブ"
      items={[{ value: "locked", label: "利用不可", content: <p>利用不可</p>, disabled: true }]}
    />
  </div>
);
