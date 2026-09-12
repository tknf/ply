import type { PropsWithChildren } from "hono/jsx";
import { Button } from "./button";
import type { ButtonVariant } from "./types";

export type DialogProps = PropsWithChildren<{
  id: string;
  title: string;
  trigger: string;
  description?: string;
  triggerVariant?: ButtonVariant;
}>;
/** 初期HTMLは閉じたnative dialog。業務上の確認処理はchildrenで渡す。 */
export const Dialog = ({
  id,
  title,
  trigger,
  description,
  triggerVariant = "secondary",
  children,
}: DialogProps) => (
  <div class="ply-dialog-root" data-controller="dialog" data-state="closed">
    <Button
      variant={triggerVariant}
      data-dialog-target="trigger"
      aria-controls={id}
      aria-expanded="false"
      data-state="closed"
    >
      {trigger}
    </Button>
    <dialog
      id={id}
      class="ply-dialog"
      data-dialog-target="dialog"
      data-state="closed"
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <div class="ply-dialog-body">
        <h2 id={`${id}-title`} data-dialog-target="title">
          {title}
        </h2>
        {description && <p id={`${id}-description`}>{description}</p>}
        {children}
        <div class="ply-cluster">
          <Button data-dialog-target="close" autofocus>
            閉じる
          </Button>
        </div>
      </div>
    </dialog>
  </div>
);
