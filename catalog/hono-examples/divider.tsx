import { Divider } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <p>現在の設定</p>
    <Divider label="補足" />
    <p>必要な場合だけ変更してください。</p>
    <Divider />
    <p>ここまでは公開済みの内容です。</p>
    <Divider label="ここから下書き" line="dashed" />
    <p>まだ確定していない内容は、破線の下に置きます。</p>
    <Divider line="dashed" />
    <Divider label="補足と説明を含む長い区切りの見出しは、狭い場所では折り返します" />
    <p>見出しが長い時も、線は残りの幅に引きます。</p>
    <div dir="rtl" lang="ar" class="ply-stack">
      <Divider label="ملاحظة" />
      <Divider label="مسودة" line="dashed" />
    </div>
  </div>
);
