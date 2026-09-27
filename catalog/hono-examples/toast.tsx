import { Toast, Button, ActionLink } from "../../src/hono";
export default () => (
  <div>
    <div class="ply-cluster">
      <Button popovertarget="hono-toast">結果表示を試す</Button>
      <Button popovertarget="hono-toast-timed">5秒で閉じる通知</Button>
      <Button popovertarget="hono-toast-short">短い知らせ</Button>
      <Button popovertarget="hono-toast-warning">注意の知らせ</Button>
      <Button popovertarget="hono-toast-danger">失敗の知らせ</Button>
      <Button popovertarget="hono-toast-rtl">右から左に読む知らせ</Button>
    </div>
    <Toast
      id="hono-toast"
      tone="success"
      actions={<ActionLink href="/example">記事を確認する</ActionLink>}
    >
      「初めて仕事場を利用する方へのご案内」を下書きに保存しました。公開する前に内容を確認できます。
    </Toast>
    <Toast id="hono-toast-timed" duration={5000}>
      変更を保存しました。
    </Toast>
    <Toast id="hono-toast-short" tone="success">
      コピーしました
    </Toast>
    <Toast id="hono-toast-warning" tone="warning">
      通信が不安定です。保存は続けています。
    </Toast>
    <Toast
      id="hono-toast-danger"
      tone="danger"
      live="assertive"
      actions={<Button>もう一度保存する</Button>}
    >
      保存できませんでした。接続を確認してください。
    </Toast>
    <div dir="rtl" lang="ar">
      <Toast id="hono-toast-rtl" closeLabel="إغلاق">
        تم حفظ التغييرات.
      </Toast>
    </div>
  </div>
);
