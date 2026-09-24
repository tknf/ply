import { EditableProperty } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <EditableProperty id="property-owner" label="担当者" name="owner" value="田中 遥" required />
    <EditableProperty id="property-note" label="メモ" name="note" emptyLabel="未登録" />
  </div>
);
