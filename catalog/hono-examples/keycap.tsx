import { Keycap } from "../../src/hono";

export default () => (
  <p>
    <Keycap keys={["⌘ / Ctrl", "S"]} /> で保存。
    <Keycap keys={["Esc"]} /> で編集に戻ります。
  </p>
);
