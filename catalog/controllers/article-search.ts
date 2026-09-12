import { Controller } from "@hotwired/stimulus";
import { draftKey, parseDraft } from "../data/articles";
export class ArticleSearchController extends Controller<HTMLElement> {
  private control = (name: string) => {
    const input = this.element.querySelector(`[name="${name}"]`);
    if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement))
      throw new Error(`検索条件がありません: ${name}`);
    return input;
  };
  connect = () => {
    const params = new URL(location.href).searchParams;
    if (location.pathname !== "/search/empty") this.control("q").value = params.get("q") ?? "";
    this.control("state").value = params.get("state") ?? "";
    for (const row of this.element.querySelectorAll<HTMLElement>("[data-article-id]")) {
      try {
        const stored = localStorage.getItem(draftKey(row.dataset.articleId ?? ""));
        const draft = stored ? parseDraft(stored) : null;
        if (!draft) continue;
        const title = row.querySelector("[data-article-title]");
        const category = row.querySelector("[data-article-category]");
        const state = row.querySelector(".catalog-article-state");
        const date = row.querySelector(".catalog-article-date");
        if (title) title.textContent = draft.title;
        if (category) category.textContent = draft.category;
        if (state) state.textContent = "下書き · ";
        const excerpt = row.querySelector(".catalog-article-excerpt");
        if (excerpt) excerpt.textContent = draft.body.split("\n")[0] ?? "";
        if (date) date.textContent = "ブラウザに保存";
        row.dataset.state = "下書き";
        row.dataset.searchText = `${draft.title} ${draft.body} ${draft.category}`;
      } catch {
        /* 保存領域が無効でもサンプル記事の検索は使える。 */
      }
    }
    this.filter();
  };
  filter = (event?: Event) => {
    if (event instanceof InputEvent && event.isComposing) return;
    const query = this.control("q").value.trim().toLocaleLowerCase();
    const state = this.control("state").value;
    let count = 0;
    for (const row of this.element.querySelectorAll<HTMLElement>("[data-article-id]")) {
      row.hidden = !(
        (row.dataset.searchText ?? "").toLocaleLowerCase().includes(query) &&
        (!state || row.dataset.state === state)
      );
      if (!row.hidden) count++;
    }
    const status = this.element.querySelector("[data-search-count]");
    if (status) status.textContent = `${count}件の記事`;
    const empty = this.element.querySelector<HTMLElement>("[data-search-empty]");
    if (empty) empty.hidden = count > 0;
    const url = new URL(location.href);
    url.pathname = "/search";
    for (const [name, value] of [
      ["q", this.control("q").value],
      ["state", state],
    ]) {
      if (name && value) url.searchParams.set(name, value);
      else if (name) url.searchParams.delete(name);
    }
    history.replaceState(history.state, "", url);
    for (const link of this.element.querySelectorAll<HTMLAnchorElement>("[data-article-title]")) {
      const destination = new URL(link.href);
      destination.searchParams.set("from", url.searchParams.toString());
      link.href = destination.href;
    }
  };
  submit = (event: Event) => {
    event.preventDefault();
    this.filter();
  };
  clear = (event: Event) => {
    event.preventDefault();
    this.control("q").value = "";
    this.control("state").value = "";
    this.filter();
    this.control("q").focus();
  };
}
