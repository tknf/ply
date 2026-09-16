import { Notice, ActionLink, Disclosure } from "../../src/hono";
export default () => (
  <div class="ply-stack" data-space="small">
    <Notice label="変更は保存後に反映されます">
      <p>入力を終えたら、このページの「設定を保存」を押してください。</p>
    </Notice>
    <Notice label="招待を送りました" tone="success">
      <p>相手が参加すると、メンバーの一覧に表示されます。</p>
    </Notice>
    <Notice label="公開期限は明日です" tone="warning">
      <p>9月16日を過ぎると、共有リンクから記事を閲覧できなくなります。</p>
      <ActionLink href="/example">公開設定を確認する</ActionLink>
    </Notice>
    <Notice label="添付ファイルを送信できませんでした" tone="danger">
      <p>入力した内容は残っています。接続を確認してから、もう一度送信してください。</p>
    </Notice>
    <Disclosure summary="入れ子の通知">
      <Notice label="外側の注意" tone="warning">
        <p>一部のファイルに確認が必要です。</p>
        <Notice label="内側の完了" tone="success">
          <p>本文の確認は完了しました。</p>
        </Notice>
      </Notice>
    </Disclosure>
  </div>
);
