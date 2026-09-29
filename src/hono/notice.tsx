import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";
import { Icon } from "./icon";

export type NoticeProps = PropsWithChildren<
  ElementProps<"aside"> & { tone?: Exclude<Tone, "neutral">; label: string; heading?: boolean }
>;
/** 通知は本文のそばへ置く。読み上げを必要とする動的な更新では利用側でroleを指定する。 */
export const Notice = ({
  children,
  tone = "info",
  label,
  heading = false,
  class: className,
  ...attributes
}: NoticeProps) => (
  <aside
    {...attributes}
    class={classes("ply-notice", className)}
    data-tone={tone}
    aria-label={label}
  >
    {/* 印と題名を一つのピルにまとめ、紙の上の縁にまたがせる。 */}
    <div class="heading">
      <span class="symbol" aria-hidden="true">
        <Icon name={tone === "success" ? "check" : tone === "danger" ? "x" : "info"} />
      </span>
      {heading ? <h2 class="title">{label}</h2> : <p class="title">{label}</p>}
    </div>
    <div class="body">{children}</div>
  </aside>
);
