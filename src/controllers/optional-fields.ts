import { Controller } from "@hotwired/stimulus";

/** 足せる項目のチップを押すと、その欄を出してチップを隠し、欄の最初の入力へ移る。 */
export class OptionalFieldsController extends Controller<HTMLElement> {
  add = (event: Event) => {
    const chip = event.currentTarget;
    if (!(chip instanceof HTMLButtonElement)) return;
    const slot = document.getElementById(chip.getAttribute("aria-controls") ?? "");
    if (!slot || !this.element.contains(slot)) return;
    slot.hidden = false;
    chip.setAttribute("aria-expanded", "true");
    chip.hidden = true;
    slot.querySelector<HTMLElement>("input, select, textarea, [contenteditable], button")?.focus();
    this.dispatch("add", { detail: { id: slot.id.replace(/-slot$/, "") } });
  };
}
