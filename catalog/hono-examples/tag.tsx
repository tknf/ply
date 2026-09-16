import { Tag, TagGroup } from "../../src/hono";
export default () => (
  <TagGroup label="記事の分類">
    <Tag label="暮らし" />
    <Tag label="読書会" />
    <Tag label="仕事場の記事" href="/search?q=仕事場" />

    <Tag label="初めて仕事場を利用する方に向けた案内" />
    <Tag label="autumn-editorial-project-2026-abcdefghijklmnopqrstuvwxyz" href="/search" />
  </TagGroup>
);
