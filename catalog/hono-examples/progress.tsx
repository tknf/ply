import { Progress } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <Progress label="処理待ち" value={0} />
    <Progress label="添付ファイルを送信しています" value={3} max={5} />
    <Progress label="送信完了直前" value={99.5} max={100} />
    <Progress label="送信が完了しました" value={100} />
    <Progress label="残り時間を確認中" />
    <Progress
      label="すべての添付ファイルと画像の変換が完了するまでお待ちください"
      value={7}
      max={12}
    />
  </div>
);
