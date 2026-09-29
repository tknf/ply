import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type BadgeProps = PropsWithChildren<
  ElementProps<"span"> & {
    /** 状態の役割。地と文字をその色にする。業務の状態（審査中・予約済みなど）は利用側でこの役割へ変換する。 */
    tone?: Tone;
    /** 下書きなど、まだ確定していない状態。役割の色を持たせず、中立の見た目で示す。 */
    draft?: boolean;
    /** smallはタイルの印の上などに重ねる小さな札。 */
    size?: "default" | "small";
  }
>;
export const Badge = ({
  children,
  tone = "neutral",
  draft = false,
  size = "default",
  class: className,
  ...attributes
}: BadgeProps) => (
  <span
    {...attributes}
    class={classes("ply-badge", className)}
    data-tone={tone}
    data-draft={draft ? "true" : undefined}
    data-size={size === "default" ? undefined : size}
  >
    {children}
  </span>
);
