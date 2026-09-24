import { Controller } from "@hotwired/stimulus";
import { getProgressState } from "../../src/internal/progress";
export class ProjectDemoController extends Controller<HTMLElement> {
  connect = () => {
    const button = this.element.querySelector('button[type="submit"]');
    if (button instanceof HTMLButtonElement) button.disabled = false;
  };
  filter = (event: Event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of this.element.querySelectorAll<HTMLElement>(".ply-board .ply-card")) {
      card.hidden = !(card.querySelector("h3")?.textContent ?? "")
        .toLocaleLowerCase()
        .includes(query);
      if (!card.hidden) visible += 1;
    }
    const status = this.element.querySelector('[data-project-demo-target="filterStatus"]');
    if (status) status.textContent = query ? `${visible}件のタスクが見つかりました。` : "";
  };
  check = () => {
    const checks = Array.from(
      this.element.querySelectorAll<HTMLInputElement>(
        '[data-project-demo-target="checklist"] input[type="checkbox"]',
      ),
    );
    const completed = checks.filter((input) => input.checked).length;
    const progress = this.element.querySelector('[data-project-demo-target="progress"] progress');
    if (progress instanceof HTMLProgressElement) {
      const state = getProgressState(completed, checks.length);
      const percentageLabel = state.label ?? "0%";
      progress.max = state.limit;
      progress.value = state.current ?? 0;
      progress.textContent = percentageLabel;
      const presentation = progress.closest(".ply-progress");
      const label = presentation?.querySelector(".value");
      if (label) label.textContent = percentageLabel;
      const track = presentation?.querySelector<HTMLElement>(".track");
      if (track) track.dataset.state = state.complete ? "complete" : "determinate";
      const fill = track?.querySelector<HTMLElement>(".fill");
      if (fill && state.percentage !== undefined) fill.style.inlineSize = `${state.percentage}%`;
    }
  };
  private refresh = (message: string) => {
    for (const column of this.element.querySelectorAll(".ply-board > section")) {
      const count = column.querySelector("h3 > small");
      if (count) count.textContent = String(column.querySelectorAll(".ply-card").length);
    }
    for (const status of this.element.querySelectorAll('[data-project-demo-target="status"]'))
      status.textContent = message;
  };
  move = (event: Event) => {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;
    const card = select.closest(".ply-card");
    const column = this.element
      .querySelectorAll(".ply-board > section > .items")
      .item(Number(select.value));
    if (!card || !column) return;
    column.append(card);
    if (card instanceof HTMLElement)
      card.dataset.state = select.value === "2" ? "complete" : "active";
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
    const column = this.element.querySelector(".ply-board > section > .items");
    if (!template || !column) return;
    const card = template.cloneNode(true);
    if (!(card instanceof HTMLElement)) return;
    const heading = card.querySelector("h3");
    if (heading) heading.textContent = title;
    const description = card.querySelector(":scope > .body");
    if (description) description.textContent = "";
    card.removeAttribute("hidden");
    card.dataset.state = "new";
    const category = card.querySelector(":scope > .eyebrow");
    if (category) category.remove();
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
