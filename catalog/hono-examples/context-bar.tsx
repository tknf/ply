import { ContextBar } from "../../src/hono";

export default () => (
  <ContextBar items={[{ label: "カタログ", href: "/" }, { label: "現在の作業" }]}>
    <a href="/reservation">関連する予約例</a>
  </ContextBar>
);
