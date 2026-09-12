import { EmptyState, ActionLink } from "../../src/hono";

export default () => (
  <EmptyState title="該当するデータはありません">
    <p>検索条件を変更してください。</p>
    <ActionLink href="/search" variant="link">
      検索例へ戻る
    </ActionLink>
  </EmptyState>
);
