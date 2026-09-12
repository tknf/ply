import { Badge } from "../../src/hono";

export default () => (
  <div class="ply-cluster">
    {(["neutral", "info", "success", "warning", "danger"] as const).map((tone) => (
      <Badge tone={tone}>{tone}の状態</Badge>
    ))}
    <Badge aria-label="検索結果0件">0件</Badge>
  </div>
);
