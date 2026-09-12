import { Breadcrumb } from "../../src/hono";

export default () => (
  <Breadcrumb
    items={[{ label: "道具箱", href: "/" }, { label: "記事", href: "/search" }, { label: "編集" }]}
  />
);
