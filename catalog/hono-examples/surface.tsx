import { Surface, Badge } from "../../src/hono";
export default () => (
  <div class="ply-split">
    <Surface>
      <p>通常の白い作業面。</p>
    </Surface>
    <Surface kind="panel" tone="warm">
      <Badge>公開設定</Badge>
      <p>関連する設定を、温かい補助面にまとめます。</p>
    </Surface>
    <Surface kind="panel" tone="cool">
      <p>プレビューや補足を区別する青い面。</p>
    </Surface>
  </div>
);
