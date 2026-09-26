import { Controller } from "@hotwired/stimulus";

/** チェックの変化に合わせて、見出しの未完了の数と進み具合を数え直す。 */
export class TaskListController extends Controller<HTMLElement> {
  static targets = ["remaining"];
  declare readonly remainingTarget: HTMLElement;
  declare readonly hasRemainingTarget: boolean;

  connect = () => {
    this.update();
  };

  update = () => {
    const boxes = Array.from(
      this.element.querySelectorAll<HTMLInputElement>(
        ".ply-task-list > .sheet > li > .ply-choice > input[type='checkbox']",
      ),
    );
    const done = boxes.filter((box) => box.checked).length;
    this.element.style.setProperty(
      "--ply-task-progress",
      String(boxes.length ? done / boxes.length : 0),
    );
    if (this.hasRemainingTarget)
      this.remainingTarget.textContent = `未完了${boxes.length - done}件`;
  };
}
