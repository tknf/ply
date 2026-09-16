import type { Child, PropsWithChildren } from "hono/jsx";
import { Button } from "./button";
import type { ButtonVariant } from "./types";

export type DialogProps = PropsWithChildren<{
  id: string;
  title: string;
  trigger: string;
  description?: string;
  triggerVariant?: ButtonVariant;
  triggerDisabled?: boolean;
  size?: "compact" | "default" | "wide";
  closeLabel?: string;
  actions?: Child;
  /** contentでは本文内のautofocus、または最初の操作へ移る。 */
  initialFocus?: "title" | "content";
}>;
/** 閉じたnative dialogを出力する。保存や削除の処理は利用側で実装する。 */
export const Dialog = ({
  id,
  title,
  trigger,
  description,
  triggerVariant = "secondary",
  triggerDisabled,
  size = "default",
  closeLabel = "閉じる",
  actions,
  initialFocus = "title",
  children,
}: DialogProps) => (
  <div class="ply-dialog" data-controller="dialog" data-state="closed">
    <Button
      variant={triggerVariant}
      disabled={triggerDisabled}
      data-dialog-target="trigger"
      aria-controls={id}
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
    >
      {trigger}
    </Button>
    <dialog
      id={id}
      class="panel"
      closedby="any"
      data-dialog-target="dialog"
      data-state="closed"
      data-size={size}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <header class="heading">
        <h2
          id={`${id}-title`}
          data-dialog-target="title"
          tabindex={-1}
          autofocus={initialFocus === "title"}
        >
          {title}
        </h2>
        {description && <p id={`${id}-description`}>{description}</p>}
      </header>
      <div class="body">{children}</div>
      <footer class="actions">
        <Button data-dialog-target="close">{closeLabel}</Button>
        {actions}
      </footer>
    </dialog>
  </div>
);
