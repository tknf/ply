import { Controller } from "@hotwired/stimulus";
import { formatFileSize } from "../../src/file-size";

export class FilePreviewController extends Controller<HTMLElement> {
  private target = (name: string) => {
    const target = this.element.querySelector<HTMLElement>(`[data-file-preview-target="${name}"]`);
    if (!target) throw new Error(`ファイル確認の要素がありません: ${name}`);
    return target;
  };
  private input = () => {
    const input = this.element.querySelector('input[type="file"]');
    if (!(input instanceof HTMLInputElement)) throw new Error("ファイル入力がありません");
    return input;
  };
  connect = () => {
    const choose = this.target("choose");
    if (choose instanceof HTMLButtonElement) choose.disabled = false;
  };
  choose = () => {
    const form = this.target("form");
    if (form instanceof HTMLDetailsElement) form.open = true;
    this.input().focus();
    this.input().click();
  };
  select = () => {
    const file = this.input().files?.[0];
    const form = this.target("form");
    if (file && form instanceof HTMLDetailsElement) form.open = true;
    const apply = this.target("apply");
    if (apply instanceof HTMLButtonElement) apply.disabled = !file;
    this.target("status").textContent = file
      ? `${file.name} · ${formatFileSize(file.size)}を選択中`
      : "PDFか画像を選択してください。";
  };
  apply = () => {
    const file = this.input().files?.[0];
    if (!file) return;
    const current = this.target("current");
    const name = current.querySelector("strong");
    const description = current.querySelector("p:last-child");
    if (name) name.textContent = file.name;
    if (description) description.textContent = `この画面で選択 · ${formatFileSize(file.size)}`;
    this.target("status").textContent = "この画面に反映しました。";
    const apply = this.target("apply");
    if (apply instanceof HTMLButtonElement) apply.disabled = true;
  };
  clear = () => {
    const input = this.input();
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.focus();
  };
  inspect = () => {
    const information = this.target("information");
    if (information instanceof HTMLDetailsElement) {
      information.open = true;
      information.querySelector("summary")?.focus();
    }
  };
}
