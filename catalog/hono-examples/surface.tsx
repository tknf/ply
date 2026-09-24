import { Surface, Badge } from "../../src/hono";
export default () => (
  <div class="ply-split">
    <Surface>
      <p>通常の白い作業面。</p>
      <p>本文と操作を一つの面にまとめ、上から順に進めます。</p>
    </Surface>
    <Surface kind="panel" tone="warm">
      <Badge>公開設定</Badge>
      <p>関連する設定を、温かい補助面にまとめます。</p>
    </Surface>
    <Surface kind="panel" tone="cool">
      <p>プレビューや補足を区別する青い面。</p>
      <p>主な作業と視覚的に分け、必要なときに確認します。</p>
    </Surface>
  </div>
);
