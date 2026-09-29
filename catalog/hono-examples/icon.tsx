import { Icon, Button, ActionLink, Disclosure, DisclosureGroup } from "../../src/hono";

const names = [
  "pencil",
  "search",
  "calendar",
  "files",
  "file",
  "chart",
  "check",
  "layers",
  "arrow",
  "eye",
  "eye-slash",
  "compare",
  "caret",
  "trash",
  "x",
  "x-circle",
  "info",
  "mail",
  "chat",
  "grid",
  "grip",
  "equals",
  "plus",
] as const;
export default () => (
  <div class="ply-stack">
    <div class="ply-cluster">
      <Button>
        <Icon name="pencil" class="icon" />
        編集する
      </Button>
      <ActionLink href="/apps/search">
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
    <DisclosureGroup label="印の一覧と塗りつぶしの形">
      <Disclosure summary="すべての印（通常の形と塗りつぶしの形）">
        <ul class="catalog-icon-grid">
          {names.map((name) => (
            <li>
              <span class="pair">
                <Icon name={name} />
                <Icon name={name} fill />
              </span>
              <code>{name}</code>
            </li>
          ))}
        </ul>
      </Disclosure>
      <Disclosure summary="塗りつぶしの印で項目を見分ける（HEYの一覧と同じ）">
        <ul class="catalog-icon-rows">
          <li>
            <Icon name="mail" fill />
            受信箱
          </li>
          <li>
            <Icon name="calendar" fill />
            予定
          </li>
          <li>
            <Icon name="files" fill />
            すべてのファイル
          </li>
        </ul>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
