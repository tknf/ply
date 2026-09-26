import { Composer, FileInput } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <Composer
      id="message-composer"
      label="メッセージ"
      name="body"
      action="/examples/contact"
      method="get"
      placeholder="メッセージを書く"
      submitLabel="送信する"
      attachments={<FileInput id="message-file" name="files" label="添付ファイル" multiple />}
      required
    />
    <Composer
      id="composer-editor"
      label="メモ"
      name="memo"
      submitLabel="保存する"
      editor={
        <div
          contenteditable
          role="textbox"
          aria-multiline="true"
          aria-label="メモの本文"
          data-placeholder="ここに書いた内容は、利用側の編集部品が送信用の値へ移します。"
        />
      }
    />
    <Composer
      id="composer-error"
      label="返信"
      name="reply"
      submitLabel="再送する"
      error="送信できませんでした。内容を確認して、もう一度送信してください。"
    />
  </div>
);
