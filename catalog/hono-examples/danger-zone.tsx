import { DangerZone, Notice, ActionLink } from "../../src/hono";

export default () => (
  <DangerZone title="公開を取り消す">
    <Notice tone="warning" label="影響範囲">
      <p>利用中の内容が見られなくなります。</p>
    </Notice>
    <ActionLink href="/review" variant="danger">
      影響を確認する
    </ActionLink>
  </DangerZone>
);
