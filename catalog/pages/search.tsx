import { Surface, ContextBar, PageHeader, Input, Button, ActionLink, Icon } from "../../src/hono";
import { articles } from "../data/articles";
export const SearchExample = ({
  empty = false,
  query = "",
  state = "",
}: {
  empty?: boolean;
  query?: string;
  state?: string;
}) => {
  const q = empty ? "見つからない記事" : query;
  const matches = (article: (typeof articles)[number]) =>
    (!state || article.state === state) &&
    `${article.title} ${article.body} ${article.category}`
      .toLocaleLowerCase()
      .includes(q.toLocaleLowerCase());
  const count = articles.filter(matches).length;
  return (
    <Surface
      layout="document"
      data-controller="article-search"
      context={<ContextBar items={[{ label: "道具箱", href: "/" }, { label: "記事" }]} />}
    >
      <PageHeader
        title="記事"
        actions={
          <ActionLink href="/example" variant="primary">
            <Icon name="pencil" />
            下書きを開く
          </ActionLink>
        }
      />
      <form
        action="/search"
        method="get"
        class="catalog-search ply-workbar"
        data-action="input->article-search#filter compositionend->article-search#filter submit->article-search#submit"
      >
        <label for="search-query">キーワード</label>
        <div class="catalog-search-input">
          <Input
            id="search-query"
            type="search"
            name="q"
            value={q}
            placeholder="記事名や本文から探す"
            autocomplete="off"
          />
          <Button type="submit">検索</Button>
        </div>
        <div class="catalog-search-options">
          <label for="search-state">状態</label>
          <select id="search-state" name="state" class="ply-input">
            <option value="" selected={!state}>
              すべて
            </option>
            <option selected={state === "下書き"}>下書き</option>
            <option selected={state === "公開中"}>公開中</option>
          </select>
          <span role="status" data-search-count>
            {count}件の記事
          </span>
        </div>
      </form>
      <ul class="catalog-articles" aria-label="検索結果">
        {articles.map((article) => (
          <li
            hidden={!matches(article)}
            data-article-id={article.id}
            data-search-text={`${article.title} ${article.body} ${article.category}`}
            data-state={article.state}
          >
            <div>
              <span class="catalog-article-state">{article.state} · </span>
              <span class="catalog-article-category" data-article-category>
                {article.category}
              </span>
              <a href={`/example?id=${article.id}`} data-article-title>
                {article.title}
              </a>
              <p class="catalog-article-excerpt">{article.body.split("\n")[0]}</p>
            </div>
            <span class="catalog-article-date">{article.date}</span>
          </li>
        ))}
      </ul>
      <div class="catalog-search-empty" hidden={count > 0} data-search-empty>
        <h2>見つかりませんでした</h2>
        <p>言葉を短くするか、状態を「すべて」にして探してみてください。</p>
        <a href="/search" data-action="article-search#clear">
          条件をクリアする
        </a>
      </div>
      <p class="catalog-footnote">6件のサンプル記事と、このブラウザで保存した下書きが対象です。</p>
    </Surface>
  );
};
