import { Navigation } from "../../src/hono";

export default () => (
  <Navigation
    label="記事の分類"
    items={[
      { label: "すべての記事", href: "/search", current: true, count: 6 },
      { label: "下書き", href: "/search?state=draft", count: 2 },
      { label: "道具箱へ", href: "/" },
    ]}
  />
);
