import { Dialog } from "../../src/hono";

export default () => (
  <Dialog
    id="hono-dialog"
    title="内容を確認する"
    trigger="確認画面を開く"
    description="データは変更しません。"
  >
    <p>確認後、閉じるボタンまたはEscapeで戻れます。</p>
  </Dialog>
);
