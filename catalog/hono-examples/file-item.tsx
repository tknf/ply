import { FileItem } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <FileItem name="登録済みの資料.pdf" description="PDF・2.4 MB" href="/files" />
    <FileItem name="選択した資料.pdf" description="送信待ちです。" state="pending" />
    <FileItem
      name="送信できなかった資料.pdf"
      description="接続を確認し、もう一度選択してください。"
      state="error"
    />
  </div>
);
