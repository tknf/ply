import { Avatar } from "../../src/hono";
export default () => (
  <div class="ply-cluster">
    <div class="catalog-person">
      <Avatar name="田中 遥" initials="田" />
      <span>田中 遥</span>
    </div>
    <div class="catalog-person">
      <Avatar name="佐藤 健" initials="佐" size="small" tone="green" />
      <span>佐藤 健</span>
    </div>
    <div class="catalog-person">
      <Avatar name="編集チーム" initials="編" tone="amber" />
      <span>仕事場の案内を担当する編集チーム</span>
    </div>
    <div class="catalog-person">
      <Avatar name="Alex Morgan" initials="AM" tone="coral" />
      <span>Alex Morgan</span>
    </div>
    <div class="catalog-person">
      <Avatar name="田中 遥" initials="田" size="inline" />
      <span>行内の担当者</span>
    </div>
    <div class="catalog-person">
      <Avatar name="プロフィール" initials="編" size="large" tone="green" />
      <span>プロフィール</span>
    </div>
  </div>
);
