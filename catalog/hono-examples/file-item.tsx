import { FileItem, ActionLink, Button } from "../../src/hono";
export default () => (
  <div>
    <FileItem
      name="仕事場の案内.pdf"
      description="PDF · 2.4 MB · 9月15日更新"
      href="/files"
      actions={<ActionLink href="/files">ファイルを確認する</ActionLink>}
    />
    <FileItem
      name="秋の読書会のお知らせと参加される皆さまへの詳しいご案内_2026年9月版.pdf"
      description="PDF · 1.8 MB"
      state="pending"
    />
    <FileItem
      name="project-2026-abcdefghijklmnopqrstuvwxyz0123456789.zip"
      description="接続を確認し、もう一度選択してください。"
      state="error"
      actions={<Button disabled>再送信する</Button>}
    />
  </div>
);
