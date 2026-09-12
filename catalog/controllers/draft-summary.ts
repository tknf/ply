import { Controller } from "@hotwired/stimulus";
import { draftKey, parseDraft } from "../data/articles";
export class DraftSummaryController extends Controller<HTMLElement> {
  connect = () => {
    try {
      const stored = localStorage.getItem(draftKey("daily"));
      const draft = stored ? parseDraft(stored) : null;
      if (!draft) return;
      const title = this.element.querySelector("strong");
      const body = this.element.querySelector("p");
      if (title) title.textContent = draft.title;
      if (body) body.textContent = draft.body.slice(0, 90) + (draft.body.length > 90 ? "…" : "");
      this.element.setAttribute("aria-label", `${draft.title} 下書きを開く`);
    } catch {
      /* ブラウザ保存が使えない場合はサンプルを表示する。 */
    }
  };
}
