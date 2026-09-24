import { Controller } from "@hotwired/stimulus";
type Location = { column: HTMLElement; index: number };
export class BoardController extends Controller<HTMLElement> {
  private item: HTMLElement | null = null;
  private origin: Location | null = null;
  private snapshot: { column: HTMLElement; items: HTMLElement[] }[] = [];
  private pointer: {
    id: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
    handle: HTMLButtonElement;
  } | null = null;
  private mode: "pointer" | "keyboard" | null = null;
  private ghost: HTMLElement | null = null;
  private frame = 0;
  private suppressClick = false;
  connect = () => {
    this.element.addEventListener("pointerdown", this.down);
    this.element.addEventListener("keydown", this.key);
    this.element.addEventListener("click", this.click);
    document.addEventListener("pointermove", this.move);
    document.addEventListener("pointerup", this.up);
    document.addEventListener("pointercancel", this.cancel);
    document.addEventListener("turbo:before-cache", this.cancel);
    window.addEventListener("blur", this.cancel);
    this.refresh();
  };
  disconnect = () => {
    this.cancel();
    this.element.removeEventListener("pointerdown", this.down);
    this.element.removeEventListener("keydown", this.key);
    this.element.removeEventListener("click", this.click);
    document.removeEventListener("pointermove", this.move);
    document.removeEventListener("pointerup", this.up);
    document.removeEventListener("pointercancel", this.cancel);
    document.removeEventListener("turbo:before-cache", this.cancel);
    window.removeEventListener("blur", this.cancel);
  };
  private columns = () =>
    Array.from(this.element.querySelectorAll<HTMLElement>(":scope > section"));
  private items = (column: HTMLElement) =>
    Array.from(column.querySelectorAll<HTMLElement>(":scope > .items > [data-board-id]"));
  private handle = (target: EventTarget | null) => {
    const button =
      target instanceof Element
        ? target.closest<HTMLButtonElement>("button[data-board-handle]")
        : null;
    return button && !button.disabled && button.closest(".ply-board") === this.element
      ? button
      : null;
  };
  private locate = (item: HTMLElement): Location | null => {
    const column = item.parentElement?.parentElement;
    return column instanceof HTMLElement && column.parentElement === this.element
      ? { column, index: this.items(column).indexOf(item) }
      : null;
  };
  private say = (message: string) => {
    const status = this.element.querySelector(":scope > [data-board-announcement]");
    if (status) status.textContent = message;
  };
  refresh = () => {
    for (const column of this.columns()) {
      if (!column.querySelector(':scope > .items[role="list"]')) continue;
      const count = column.querySelector(":scope > .title > small");
      if (count) count.textContent = String(this.items(column).length);
      for (const item of this.items(column)) {
        const button = item.querySelector<HTMLButtonElement>(":scope > [data-board-handle]");
        if (button) button.disabled = item.dataset.disabled === "true";
      }
    }
  };
  private begin = (handle: HTMLButtonElement, mode: "pointer" | "keyboard") => {
    const item = handle.closest<HTMLElement>("[data-board-id]");
    if (!item) return;
    const origin = this.locate(item);
    if (!origin) return;
    this.item = item;
    this.origin = origin;
    this.mode = mode;
    this.snapshot = this.columns().map((column) => ({ column, items: this.items(column) }));
    item.dataset.moving = "true";
    if (mode === "pointer") document.documentElement.dataset.plyBoardDragging = "true";
    handle.focus({ preventScroll: true });
    this.say((item.dataset.boardLabel ?? "項目") + "を持ち上げました。");
    return item;
  };
  private place = (column: HTMLElement, before: HTMLElement | null) => {
    if (!this.item || column.dataset.dropDisabled === "true" || before === this.item) return;
    const container = column.querySelector(":scope > .items");
    if (
      !container ||
      (this.item.parentElement === container && this.item.nextElementSibling === before)
    )
      return;
    container.insertBefore(this.item, before);
    for (const other of this.columns()) other.removeAttribute("data-over");
    column.dataset.over = "true";
    this.refresh();
    if (this.mode === "keyboard") {
      this.item
        .querySelector<HTMLButtonElement>(":scope > [data-board-handle]")
        ?.focus({ preventScroll: true });
      this.item.scrollIntoView({ block: "nearest", inline: "nearest" });
      this.say(
        (column.querySelector(".label")?.textContent ?? "") +
          "、" +
          ((this.locate(this.item)?.index ?? 0) + 1) +
          "番目",
      );
    }
  };
  private restore = () => {
    for (const { column, items } of this.snapshot)
      column.querySelector(":scope > .items")?.append(...items);
  };
  private finish = (commit: boolean) => {
    const item = this.item,
      origin = this.origin;
    const wasPointer = this.mode === "pointer";
    const destination = item ? this.locate(item) : null;
    let accepted = commit;
    if (item && origin && destination && commit) {
      const changed = origin.column !== destination.column || origin.index !== destination.index;
      if (changed) {
        const detail = {
          id: item.dataset.boardId,
          fromColumn: origin.column.dataset.columnId,
          toColumn: destination.column.dataset.columnId,
          fromIndex: origin.index,
          toIndex: destination.index,
        };
        accepted = this.element.dispatchEvent(
          new CustomEvent("board:beforemove", { bubbles: true, cancelable: true, detail }),
        );
        if (accepted)
          this.element.dispatchEvent(new CustomEvent("board:move", { bubbles: true, detail }));
      }
    }
    if (!accepted) this.restore();
    if (item) {
      item.removeAttribute("data-moving");
      item
        .querySelector<HTMLButtonElement>(":scope > [data-board-handle]")
        ?.focus({ preventScroll: true });
      this.say(accepted ? "移動を確定しました。" : "移動を取り消しました。");
    }
    for (const column of this.columns()) column.removeAttribute("data-over");
    this.ghost?.remove();
    this.ghost = null;
    cancelAnimationFrame(this.frame);
    this.item = null;
    this.origin = null;
    this.mode = null;
    if (wasPointer) delete document.documentElement.dataset.plyBoardDragging;
    this.pointer = null;
    this.snapshot = [];
    this.refresh();
  };
  private cancel = () => this.finish(false);
  private down = (event: PointerEvent) => {
    const handle = this.handle(event.target);
    if (!handle || event.button !== 0 || !event.isPrimary) return;
    if (this.item) this.cancel();
    this.pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      handle,
    };
  };
  private move = (event: PointerEvent) => {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (!this.item && Math.hypot(pointer.x - pointer.startX, pointer.y - pointer.startY) >= 6) {
      const item = this.begin(pointer.handle, "pointer");
      if (!item) {
        this.pointer = null;
        return;
      }
      this.ghost = document.createElement("div");
      this.ghost.className = "drag-preview";
      this.ghost.setAttribute("aria-hidden", "true");
      this.ghost.textContent = item?.dataset.boardLabel ?? "";
      this.element.append(this.ghost);
      this.frame = requestAnimationFrame(this.tick);
    }
    if (this.mode === "pointer") event.preventDefault();
  };
  private tick = () => {
    const pointer = this.pointer;
    if (!pointer || this.mode !== "pointer") return;
    if (this.ghost)
      this.ghost.style.transform = `translate(${pointer.x + 12}px, ${pointer.y + 12}px)`;
    const rect = this.element.getBoundingClientRect();
    if (
      pointer.x > rect.left &&
      pointer.x < rect.right &&
      pointer.y > rect.top &&
      pointer.y < rect.bottom
    ) {
      this.element.scrollBy({
        left: pointer.x > rect.right - 32 ? 10 : pointer.x < rect.left + 32 ? -10 : 0,
      });
      const target = document.elementFromPoint(pointer.x, pointer.y);
      const column = target?.closest<HTMLElement>("[data-column-id]");
      if (column?.parentElement === this.element) {
        const before =
          this.items(column)
            .filter((item) => item !== this.item)
            .find((item) => {
              const box = item.getBoundingClientRect();
              return pointer.y < box.top + box.height / 2;
            }) ?? null;
        this.place(column, before);
      }
    }
    if (pointer.y < 32 || pointer.y > window.innerHeight - 32)
      window.scrollBy({ top: pointer.y < 32 ? -10 : 10 });
    this.frame = requestAnimationFrame(this.tick);
  };
  private up = (event: PointerEvent) => {
    if (!this.pointer || event.pointerId !== this.pointer.id) return;
    if (this.mode === "pointer") {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      const column = target?.closest<HTMLElement>("[data-column-id]");
      this.suppressClick = true;
      this.finish(column?.parentElement === this.element && column.dataset.dropDisabled !== "true");
      window.setTimeout(() => {
        this.suppressClick = false;
      }, 0);
    } else this.pointer = null;
  };
  private click = (event: MouseEvent) => {
    const handle = this.handle(event.target);
    if (!handle || this.suppressClick) return;
    if (this.item) this.finish(true);
    else this.begin(handle, "keyboard");
  };
  private key = (event: KeyboardEvent) => {
    const handle = this.handle(event.target);
    if (!handle) return;
    if (event.key === "Escape" && this.item) {
      event.preventDefault();
      this.cancel();
      return;
    }
    if (event.key === "Tab" && this.item) {
      this.cancel();
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (this.item) this.finish(true);
      else this.begin(handle, "keyboard");
      return;
    }
    if (!this.item || this.mode !== "keyboard" || !event.key.startsWith("Arrow")) return;
    event.preventDefault();
    const location = this.locate(this.item);
    if (!location) return;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const items = this.items(location.column).filter((item) => item !== this.item);
      const index = Math.max(
        0,
        Math.min(items.length, location.index + (event.key === "ArrowUp" ? -1 : 1)),
      );
      this.place(location.column, items[index] ?? null);
    } else {
      const columns = this.columns();
      const direction = getComputedStyle(this.element).direction === "rtl" ? -1 : 1;
      const step = event.key === "ArrowRight" ? direction : -direction;
      let index = columns.indexOf(location.column) + step;
      while (columns[index]?.dataset.dropDisabled === "true") index += step;
      const next = columns[index];
      if (next) this.place(next, this.items(next)[location.index] ?? null);
    }
  };
}
