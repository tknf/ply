import { Toast, Button, ActionLink } from "../../src/hono";
export default () => (
  <div>
    <Button popovertarget="hono-toast">結果表示を試す</Button>
    <Toast id="hono-toast" actions={<ActionLink href="/example">記事を確認する</ActionLink>}>
      「初めて仕事場を利用する方へのご案内」を下書きに保存しました。公開する前に内容を確認できます。
    </Toast>
  </div>
);
