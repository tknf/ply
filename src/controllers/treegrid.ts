import { TreegridController as BaseTreegridController } from "@tknf/stimulus-ui";

/**
 * 上流の選択は行の無効を見ないので、`data-disabled="true"`の行を押して選ぶ・外す変更を、
 * 選択が変わる前のtreegrid:beforechangeの段階で止める。利用側にはこの変更を知らせない。
 * JavaScriptがない間は開閉できないので、開閉のつまみは接続した後（行にdata-stateが付いた後）だけ見せる。
 */
export class TreegridController extends BaseTreegridController {
  constructor(...args: ConstructorParameters<typeof BaseTreegridController>) {
    super(...args);
    const connectTreegrid = this.connect;
    const disconnectTreegrid = this.disconnect;
    this.connect = () => {
      // 同じ要素の他の受け手より先に見るため、捕捉の段階で受ける。
      this.element.addEventListener("treegrid:beforechange", this.guardDisabled, true);
      connectTreegrid();
    };
    this.disconnect = () => {
      this.element.removeEventListener("treegrid:beforechange", this.guardDisabled, true);
      disconnectTreegrid();
    };
  }

  private guardDisabled = (event: Event) => {
    if (event.target !== this.element || !(event instanceof CustomEvent)) return;
    const detail: unknown = event.detail;
    if (
      !detail ||
      typeof detail !== "object" ||
      !("selected" in detail) ||
      !("previousSelected" in detail) ||
      !Array.isArray(detail.selected) ||
      !Array.isArray(detail.previousSelected)
    )
      return;
    const selected: unknown[] = detail.selected,
      previous: unknown[] = detail.previousSelected;
    // 押した行は、singleでは新しく選ばれる行、multipleでは選択を切り替える行。
    const changed = [
      ...selected.filter((value) => !previous.includes(value)),
      ...(this.selectionValue === "multiple"
        ? previous.filter((value) => !selected.includes(value))
        : []),
    ];
    const disabled = this.rowTargets.some(
      (row) => row.dataset.disabled === "true" && changed.includes(row.dataset.treegridValue),
    );
    if (!disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
}
