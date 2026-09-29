import type { Child, PropsWithChildren } from "hono/jsx";
import { Icon } from "./icon";
import { OverlayClose, OverlayContent } from "./overlay-content";
import { classes, type ElementProps, type Tone } from "./types";

export type ToastProps = PropsWithChildren<{
  id: string;
  actions?: Child;
  closeLabel?: string;
  duration?: number;
  live?: "polite" | "assertive";
  /** 知らせの種類。面をその役割の色で塗る。 */
  tone?: Exclude<Tone, "neutral">;
}>;
/** 通知の可視性・消去時間・ライブ領域はstimulus-uiのToastControllerが管理する。 */
export const Toast = ({
  id,
  children,
  actions,
  closeLabel = "閉じる",
  duration = 0,
  live = "polite",
  tone = "info",
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
    data-tone={tone}
  >
    <OverlayContent
      title={
        <div class="message">
          <Icon
            name={tone === "success" ? "check" : tone === "danger" ? "x-circle" : "info"}
            fill
          />
          <span>{children}</span>
        </div>
      }
      close={<OverlayClose label={closeLabel} data-toast-target="dismiss" />}
      actions={actions}
    />
  </aside>
);

export type ToastStackProps = PropsWithChildren<
  ElementProps<"div"> & {
    /** 束を置く場所。既定は書き終わりの側の下（左から右に読む画面では右下）。 */
    placement?: "start" | "center" | "end";
  }
>;
/**
 * 開いているToastを、新しいものを手前にして束ねる。押すと広げ、外を押すかEscで畳む。
 * 重ね方と広げ方はToastStackControllerが扱う。childrenにはToastだけを置く。
 */
export const ToastStack = ({
  placement = "end",
  children,
  class: className,
  ...attributes
}: ToastStackProps) => (
  <div
    {...attributes}
    class={classes("ply-toast-stack", className)}
    data-controller="toast-stack"
    data-placement={placement}
  >
    {children}
  </div>
);
