import { Loading, Button, Progress } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <Loading label="次の記事を読み込んでいます…" />
    <Loading
      variant="wave"
      label="プロジェクトに添付されたすべてのファイルと画像を確認しています。もう少しお待ちください。"
    />
    <Loading
      variant="halo"
      layout="region"
      label="資料一覧を準備しています。表示できるまで、この領域でお待ちください。"
    />
    <div class="ply-cluster">
      <Button busy busyLabel="保存しています…">
        保存する
      </Button>
      <span>操作の待ち時間は、その操作のそばに表示します。</span>
    </div>
    <Progress label="添付ファイルの処理量を確認しています" />
  </div>
);
