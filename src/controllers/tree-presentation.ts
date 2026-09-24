import { Controller } from "@hotwired/stimulus";

/** TreeControllerの開閉状態をCSSで使うdata属性へ写す。 */
export class TreePresentationController extends Controller<HTMLElement> {
  private observer: MutationObserver | null = null;

  connect = () => {
    this.observer = new MutationObserver(this.sync);
    this.observer.observe(this.element, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });
    this.sync();
  };

  disconnect = () => {
    this.observer?.disconnect();
    this.observer = null;
    for (const item of this.items()) delete item.dataset.expanded;
  };

  private items = () =>
    Array.from(this.element.querySelectorAll<HTMLLIElement>("li[data-tree-value]"));

  private sync = () => {
    for (const item of this.items()) {
      const expanded = item.getAttribute("aria-expanded");
      if (expanded === "true" || expanded === "false") item.dataset.expanded = expanded;
      else delete item.dataset.expanded;
    }
  };
}
