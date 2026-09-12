import { TaskList } from "../../src/hono";

export default () => (
  <TaskList
    label="公開前の確認"
    items={[
      { name: "proof", label: "本文を校正する", detail: "田中 · 9月12日" },
      { name: "photo", label: "写真を選ぶ", checked: true, detail: "佐藤 · 完了" },
      { name: "approval", label: "管理者の確認", disabled: true },
    ]}
  />
);
