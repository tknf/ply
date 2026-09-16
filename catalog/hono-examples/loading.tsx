import { Loading, Button } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <Loading label="次の記事を読み込んでいます…" />
    <Loading label="プロジェクトに添付されたすべてのファイルと画像を確認しています。もう少しお待ちください。" />
    <div class="ply-cluster">
      <Button busy busyLabel="保存しています…">
        保存する
      </Button>
      <span>操作の待ち時間は、その操作のそばに表示します。</span>
    </div>
  </div>
);
