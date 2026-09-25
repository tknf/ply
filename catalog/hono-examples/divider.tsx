import { Divider } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <p>現在の設定</p>
    <Divider label="補足" />
    <p>必要な場合だけ変更してください。</p>
    <Divider />
    <p>ここまでは公開済みの内容です。</p>
    <Divider label="ここから下書き" line="dashed" />
    <p>まだ確定していない内容は、ミシン目の下に置きます。</p>
    <Divider line="dashed" />
    <Divider label="ここから新着" line="wavy" />
    <p>前回から届いた新しい連絡です。</p>
    <Divider line="wavy" />
  </div>
);
