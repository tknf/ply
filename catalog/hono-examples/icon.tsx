import { Icon, Button, ActionLink } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <div class="ply-cluster">
      <Button>
        <Icon name="pencil" class="icon" />
        編集する
      </Button>
      <ActionLink href="/search">
        <Icon name="search" class="icon" />
        記事を探す
      </ActionLink>
      <Button aria-label="削除する" data-icon-only="true" variant="danger">
        <Icon name="trash" class="icon" />
      </Button>
    </div>
    <div class="ply-cluster">
      <span>
        <Icon name="calendar" /> 9月25日の予定
      </span>
      <span>
        <Icon name="file" /> 添付ファイル
      </span>
    </div>
    <div class="ply-cluster">
      <Button disabled>
        <Icon name="check" class="icon" />
        確認済み
      </Button>
      <Button size="large">
        <Icon name="pencil" class="icon" />
        記事を書く
      </Button>
    </div>
  </div>
);
