import { Pagination } from "../../src/hono";

export default () => (
  <Pagination
    items={[
      { label: "前へ" },
      { label: "1", current: true, href: "/sales" },
      { label: "別の一覧例", href: "/search" },
    ]}
  />
);
