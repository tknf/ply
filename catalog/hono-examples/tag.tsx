import { Tag, TagGroup } from "../../src/hono";
export default () => (
  <TagGroup label="記事の分類">
    <Tag label="暮らし" />
    <Tag label="読書会" accent="blue" />
    <Tag label="仕事場の記事" href="/search?q=仕事場" />
    <Tag label="公開済み" accent="green" />
    <Tag label="確認中" accent="amber" />
  </TagGroup>
);
