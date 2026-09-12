import { Toast } from "../../src/hono";

export default () => (
  <div>
    <button type="button" class="ply-button" popovertarget="hono-toast">
      結果表示を試す
    </button>
    <Toast id="hono-toast">表示を更新しました。</Toast>
  </div>
);
