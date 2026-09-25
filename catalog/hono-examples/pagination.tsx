import { Pagination } from "../../src/hono";

export default () => (
  <Pagination
    items={[
      { label: "前へ" },
      { label: "1", current: true, href: "/search" },
      { label: "2", href: "/search?page=2" },
      { label: "3", href: "/search?page=3" },
      { label: "次へ", href: "/search?page=2" },
    ]}
  />
);
