import { DropdownMenu } from "../../src/hono";

export default () => (
  <DropdownMenu
    id="hono-menu"
    label="項目の操作"
    items={[
      { label: "確認する", value: "inspect" },
      { label: "選べない操作", value: "disabled", disabled: true },
      { label: "複製する", value: "copy" },
    ]}
  />
);
