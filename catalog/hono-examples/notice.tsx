import { Notice, Button } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    {(["info", "success", "warning", "danger"] as const).map((tone) => (
      <Notice tone={tone} label={`${tone}の通知`}>
        <p>{tone}：事実と次の操作を説明します。</p>
      </Notice>
    ))}
    <Notice label="外側の注意" tone="warning">
      <p>内側に別の部品を置いても、固有の状態を保ちます。</p>
      <Notice label="内側の完了" tone="success">
        <p>確認が完了しました。</p>
        <Button variant="primary">次の操作</Button>
      </Notice>
    </Notice>
  </div>
);
