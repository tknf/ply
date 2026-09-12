import { Controller } from "@hotwired/stimulus";
export class ProjectDemoController extends Controller<HTMLElement> {
  connect = () => {
    const button = this.element.querySelector('button[type="submit"]');
    if (button instanceof HTMLButtonElement) button.disabled = false;
  };
  private refresh = (message: string) => {
    for (const column of this.element.querySelectorAll(".ply-board > section")) {
      const count = column.querySelector("h3 > small");
      if (count) count.textContent = String(column.querySelectorAll(".ply-card").length);
    }
    const status = this.element.querySelector('[data-project-demo-target="status"]');
    if (status) status.textContent = message;
  };
  move = (event: Event) => {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;
    const card = select.closest(".ply-card");
    const column = this.element
      .querySelectorAll(".ply-board > section > div")
      .item(Number(select.value));
    if (!card || !column) return;
    column.append(card);
    select.focus();
    this.refresh(
      `${card.querySelector("h3")?.textContent ?? "仕事"}を${select.selectedOptions.item(0)?.textContent ?? "選択した列"}へ移動しました。`,
    );
  };
  add = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const input = form.elements.namedItem("task");
    if (!(input instanceof HTMLInputElement)) return;
    const title = input.value.trim();
    if (!title) {
      input.setCustomValidity("仕事の名前を入力してください。");
      input.reportValidity();
      input.addEventListener("input", () => input.setCustomValidity(""), { once: true });
      return;
    }
    const template = this.element.querySelector(".ply-card");
    const column = this.element.querySelector(".ply-board > section > div");
    if (!template || !column) return;
    const card = template.cloneNode(true);
    if (!(card instanceof HTMLElement)) return;
    const heading = card.querySelector("h3");
    if (heading) heading.textContent = title;
    const description = card.querySelector(":scope > div");
    if (description) description.textContent = "この画面で追加した仕事です。";
    const select = card.querySelector("select");
    if (select) {
      select.value = "0";
      select.setAttribute("aria-label", `${title}の状態`);
    }
    column.append(card);
    input.value = "";
    input.focus();
    this.refresh(`${title}を追加しました。`);
  };
}
