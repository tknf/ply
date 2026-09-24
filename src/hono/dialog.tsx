import type { Child, PropsWithChildren } from "hono/jsx";
import { Button } from "./button";
import type { ButtonVariant } from "./types";
import { OverlayClose, OverlayContent } from "./overlay-content";

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
      class="panel ply-overlay"
      closedby="any"
      data-dialog-target="dialog"
      data-state="closed"
      data-size={size}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <OverlayContent
        title={
          <h2
            id={`${id}-title`}
            data-dialog-target="title"
            tabindex={-1}
            autofocus={initialFocus === "title"}
          >
            {title}
          </h2>
        }
        description={description && <p id={`${id}-description`}>{description}</p>}
        close={<OverlayClose label={closeLabel} data-dialog-target="close" />}
        actions={
          actions != null &&
          actions !== false && (
            <>
              <Button data-dialog-target="close">{closeLabel}</Button>
              {actions}
            </>
          )
        }
      >
        {children}
      </OverlayContent>
    </dialog>
  </div>
);
