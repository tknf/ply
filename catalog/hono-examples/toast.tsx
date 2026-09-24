import { Toast, Button, ActionLink } from "../../src/hono";
export default () => (
  <div>
    <div class="ply-cluster">
      <Button popovertarget="hono-toast">結果表示を試す</Button>
      <Button popovertarget="hono-toast-timed">5秒で閉じる通知</Button>
    </div>
    <Toast id="hono-toast" actions={<ActionLink href="/example">記事を確認する</ActionLink>}>
      「初めて仕事場を利用する方へのご案内」を下書きに保存しました。公開する前に内容を確認できます。
    </Toast>
    <Toast id="hono-toast-timed" duration={5000}>
      変更を保存しました。
    </Toast>
  </div>
);
