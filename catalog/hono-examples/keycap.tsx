import { Keycap } from "../../src/hono";
export default () => (
  <div class="ply-stack" data-space="small">
    <p>
      <Keycap keys={["⌘", "S"]} aria-label="CommandとS" /> で保存。Windowsでは{" "}
      <Keycap keys={["Ctrl", "S"]} /> を使います。
    </p>
    <p>
      <Keycap keys={["Esc"]} /> で編集に戻ります。
    </p>
    <p>
      次の項目へは <Keycap keys={["Tab"]} />
      、一つ前へは <Keycap keys={["Shift", "Tab"]} /> で移動します。
    </p>
  </div>
);
