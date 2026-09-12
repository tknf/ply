import { ValueList } from "../../src/hono";

export default () => (
  <ValueList
    items={[
      { label: "件数", value: 0 },
      { label: "未設定", value: null },
      { label: "現在値", value: "判断に必要な情報", description: "補足は値の下に置きます。" },
    ]}
  />
);
