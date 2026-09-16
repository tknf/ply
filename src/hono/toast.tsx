import type { Child, PropsWithChildren } from "hono/jsx";
import { Button } from "./button";
import { Icon } from "./icon";

export type ToastProps = PropsWithChildren<{ id: string; actions?: Child; closeLabel?: string }>;
/** 自動消去せず、通知文と任意の操作を標準Popoverへ表示する。 */
export const Toast = ({ id, children, actions, closeLabel = "閉じる" }: ToastProps) => (
  <aside id={id} class="ply-toast" popover="manual">
    <div class="message" role="status">
      {children}
    </div>
    {actions != null && actions !== false && <div class="actions">{actions}</div>}
    <Button
      class="close"
      variant="link"
      size="compact"
      aria-label={closeLabel}
      data-icon-only="true"
      popovertarget={id}
      popovertargetaction="hide"
    >
      <Icon name="x-circle" />
    </Button>
  </aside>
);
