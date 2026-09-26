import { Badge } from "../../src/hono";
export default () => (
  <div class="ply-stack" data-space="small">
    <div class="ply-cluster">
      <Badge draft>下書き</Badge>
      <Badge tone="info">確認待ち</Badge>
      <Badge tone="success">公開中</Badge>
      <Badge tone="warning">期限が近づいています</Badge>
      <Badge tone="danger">送信失敗</Badge>
    </div>
    <p>
      今月の予約 <Badge aria-label="検索結果0件">0件</Badge>
    </p>
    <Badge tone="info">担当者と管理者による公開前の最終確認を待っています</Badge>
  </div>
);
