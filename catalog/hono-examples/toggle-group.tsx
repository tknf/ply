import { ToggleGroup } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <ToggleGroup
      label="表示密度"
      items={[
        { value: "comfortable", label: "標準" },
        { value: "compact", label: "コンパクト" },
      ]}
      selected={["comfortable"]}
    />
    <ToggleGroup
      label="表示する項目"
      items={[
        { value: "date", label: "日付" },
        { value: "owner", label: "担当者" },
        { value: "status", label: "状態" },
      ]}
      selected={["date", "status"]}
      multiple
    />
  </div>
);
