import { Controller } from "@hotwired/stimulus";
import { articleFor, draftKey, parseDraft, type Draft } from "../data/articles";

// 保存先はカタログ専用。ライブラリの利用者へ保存方式を強制しない。
export class DraftController extends Controller<HTMLElement> {
  private saved: Draft | null = null;
  private original: Draft = articleFor(undefined);
  private key = "";
  private dirty = false;
  private undo: Draft | null = null;
  private field = (name: string) => {
    const element = this.element.querySelector(`[name="${name}"]`);
    if (
      !(
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      )
    )
      throw new Error(`入力欄がありません: ${name}`);
    return element;
  };
  private target = (name: string) => {
    const element = this.element.querySelector<HTMLElement>(`[data-draft-target="${name}"]`);
    if (!element) throw new Error(`表示先がありません: ${name}`);
    return element;
  };
  private value = (): Draft => ({
    title: this.field("title").value,
    body: this.field("body").value,
    category: this.field("category").value,
  });
  private setValue = (value: Draft) => {
    for (const name of ["title", "body", "category"] as const) this.field(name).value = value[name];
  };
  private status = (text: string, state = "idle") => {
    const status = this.target("status");
    if (status.textContent !== text) status.textContent = text;
    status.dataset.state = state;
  };
  private update = () => {
    this.dirty = JSON.stringify(this.value()) !== JSON.stringify(this.saved);
    const restore = this.target("restore");
    if (restore instanceof HTMLButtonElement)
      restore.disabled = !this.undo && (!this.saved || !this.dirty);
    this.target("count").textContent = `${this.field("body").value.length}文字`;
  };
  connect = () => {
    const article = articleFor(new URL(location.href).searchParams.get("id") ?? undefined);
    this.key = draftKey(article.id);
    this.original = article;
    const from = new URL(location.href).searchParams.get("from");
    if (from)
      for (const link of this.element.querySelectorAll<HTMLAnchorElement>('a[href="/search"]'))
        link.href = `/search?${new URLSearchParams(from)}`;
    this.setValue(article);
    let message = "未保存";
    try {
      const stored = localStorage.getItem(this.key);
      this.saved = stored ? parseDraft(stored) : null;
      if (this.saved) {
        this.setValue(this.saved);
        message = "このブラウザに保存済み";
      } else if (stored) message = "下書きを読み込めませんでした";
    } catch {
      message = "保存領域を利用できません";
    }
    this.target("controls").hidden = false;
    this.target("fallback").hidden = true;
    const button = this.target("save");
    if (button instanceof HTMLButtonElement) button.disabled = false;
    this.update();
    this.dirty = false;
    this.status(message);
    this.fit();
    if (this.element.dataset.initialMode === "compare") {
      this.renderComparison();
      this.mode("compare");
    }
  };
  change = () => {
    this.undo = null;
    this.target("restore").textContent = "保存時に戻す";
    this.update();
    this.status(this.dirty ? "未保存の変更があります" : "このブラウザに保存済み");
    this.fit();
    if (!this.target("preview").hidden) this.renderPreview();
    if (!this.target("comparison").hidden) this.renderComparison();
  };
  save = (event: Event) => {
    event.preventDefault();
    const form = this.target("form");
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.checkValidity() || !this.field("title").value.trim()) this.mode("write");
    if (!form.reportValidity()) return;
    if (!this.field("title").value.trim()) {
      this.field("title").setCustomValidity("記事名を入力してください。");
      this.field("title").reportValidity();
      this.field("title").setCustomValidity("");
      return;
    }
    const value = this.value();
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
      this.saved = value;
      this.undo = null;
      this.target("restore").textContent = "保存時に戻す";
      this.update();
      this.status("✓ このブラウザに保存しました", "saved");
      if (!this.target("comparison").hidden) this.renderComparison();
    } catch {
      this.status("保存できませんでした。本文をコピーして残してください。", "error");
    }
  };
  private renderPreview = () => {
    this.target("previewTitle").textContent = this.field("title").value.trim() || "タイトル未入力";
    this.target("previewBody").textContent = this.field("body").value || "本文はまだありません。";
    this.target("previewCategory").textContent = this.field("category").value;
  };
  read = () => {
    this.renderPreview();
    this.mode("read");
    this.target("preview").focus({ preventScroll: true });
  };
  write = () => {
    this.mode("write");
    this.fit();
    this.field("body").focus({ preventScroll: true });
  };
  private renderComparison = () => {
    const before = this.saved ?? this.original;
    const after = this.value();
    this.target("beforeLabel").textContent = this.saved ? "前回の保存" : "サンプルの初期内容";
    this.target("comparisonStatus").textContent =
      JSON.stringify(before) === JSON.stringify(after)
        ? "変更はありません。"
        : "保存する前に、変更した内容を確認できます。";
    for (const [side, value] of [
      ["before", before],
      ["after", after],
    ] as const) {
      this.target(`${side}Title`).textContent = value.title || "タイトル未入力";
      this.target(`${side}Body`).textContent = value.body || "本文はまだありません。";
      this.target(`${side}Category`).textContent = value.category;
    }
  };
  compare = () => {
    this.renderComparison();
    this.mode("compare");
    this.target("comparison").focus({ preventScroll: true });
  };
  private mode = (mode: "write" | "read" | "compare") => {
    this.target("fields").hidden = mode !== "write";
    this.target("preview").hidden = mode !== "read";
    this.target("comparison").hidden = mode !== "compare";
    for (const [name, active] of [
      ["writeButton", mode === "write"],
      ["readButton", mode === "read"],
      ["compareButton", mode === "compare"],
    ] as const) {
      this.target(name).setAttribute("aria-pressed", String(active));
      this.target(name).dataset.current = String(active);
    }
  };
  restore = () => {
    if (this.undo) {
      this.setValue(this.undo);
      this.undo = null;
      this.target("restore").textContent = "保存時に戻す";
      this.status("変更を復元しました");
    } else if (this.saved) {
      this.undo = this.value();
      this.setValue(this.saved);
      this.target("restore").textContent = "取り消しを戻す";
      this.status("保存時の内容に戻しました");
    }
    this.update();
    this.fit();
    if (!this.target("preview").hidden) this.renderPreview();
    if (!this.target("comparison").hidden) this.renderComparison();
  };
  shortcut = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") this.save(event);
    if (event.key === "Escape" && this.target("fields").hidden) this.write();
  };
  invalid = () => {
    this.mode("write");
    this.fit();
  };
  leave = (event: Event) => {
    if (this.dirty && !window.confirm("未保存の変更があります。保存せずに移動しますか？"))
      event.preventDefault();
  };
  unload = (event: BeforeUnloadEvent) => {
    if (this.dirty) event.preventDefault();
  };
  beforeCache = () => {
    this.mode("write");
  };
  fit = () => {
    if (this.target("fields").hidden) return;
    for (const name of ["title", "body"]) {
      const field = this.field(name);
      if (!(field instanceof HTMLTextAreaElement)) continue;
      field.style.blockSize = "0px";
      field.style.blockSize = `${field.scrollHeight + 2}px`;
    }
  };
}
