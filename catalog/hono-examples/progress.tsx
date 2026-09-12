import { Progress } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <Progress label="処理待ち：0%" value={0} />
    <Progress label="処理中：60%" value={3} max={5} />
    <Progress label="完了：100%" value={100} />
    <Progress label="残り時間を確認中" />
  </div>
);
