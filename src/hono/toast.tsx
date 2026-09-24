import type { Child, PropsWithChildren } from "hono/jsx";
import { OverlayClose, OverlayContent } from "./overlay-content";

export type ToastProps = PropsWithChildren<{
  id: string;
  actions?: Child;
  closeLabel?: string;
  duration?: number;
  live?: "polite" | "assertive";
}>;
/** 通知の可視性・消去時間・ライブ領域はstimulus-uiのToastControllerが管理する。 */
export const Toast = ({
  id,
  children,
  actions,
  closeLabel = "閉じる",
  duration = 0,
  live = "polite",
}: ToastProps) => (
  <aside
    id={id}
    class="ply-toast ply-overlay"
    popover="manual"
    role={live === "assertive" ? "alert" : "status"}
    aria-live={live}
    data-controller="toast"
    data-toast-duration-value={duration}
    data-toast-live-value={live}
    data-state="hidden"
  >
    <OverlayContent
      title={<div class="message">{children}</div>}
      close={<OverlayClose label={closeLabel} data-toast-target="dismiss" />}
      actions={actions}
    />
  </aside>
);
