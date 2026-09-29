import type { Child } from "hono/jsx";
import { Divider } from "./divider";
import { classes, type ElementProps } from "./types";

export type TimelineProps = ElementProps<"ol"> & {
  label: string;
  variant?: "activity" | "milestones" | "compact";
  items: readonly {
    datetime: string;
    time: string;
    title: string;
    content?: Child;
    state?: "complete" | "current" | "upcoming";
    /** 出来事を起こした人。HEY・Fizzyの出来事と同じく、線の上の印の代わりに人の円を置く。 */
    avatar?: Child;
    /** 起こした人の名前。題名の前に太字で置き、題名は普通の太さにする。 */
    actor?: string;
    /** この出来事から始まる日の名前（「今日」「9月14日（月）」など）。縦の線から伸びるDividerで日を区切る。 */
    day?: string;
    /**
     * eventは人の出来事（既定）。systemは移動・自動で閉じたなどの仕組みの出来事で、Fizzyと同じく斜線の帯の中央に書く。
     * gapは何もなかった期間で、線を破線にして淡い文だけを置く（「60日間、出来事はありません」）。
     */
    kind?: "event" | "system" | "gap";
  }[];
};
export const Timeline = ({
  label,
  items,
  variant = "activity",
  class: className,
  ...attributes
}: TimelineProps) => (
  <ol
    {...attributes}
    class={classes("ply-timeline", className)}
    aria-label={label}
    data-variant={variant}
    data-avatars={items.some((item) => item.avatar != null) ? "true" : undefined}
  >
    {items.map((item) => (
      <>
        {item.day && (
          <li class="day" role="none">
            <Divider label={item.day} />
          </li>
        )}
        <li
          data-state={item.state}
          data-actor={item.actor ? "true" : undefined}
          data-kind={item.kind && item.kind !== "event" ? item.kind : undefined}
        >
          <span class="marker" aria-hidden={item.avatar == null ? "true" : undefined}>
            {item.avatar}
          </span>
          <time datetime={item.datetime}>{item.time}</time>
          <div class="body">
            <p class="title">
              {item.state && (
                <span class="ply-visually-hidden">
                  {item.state === "complete"
                    ? "完了："
                    : item.state === "current"
                      ? "進行中："
                      : "予定："}
                </span>
              )}
              {item.actor && <strong class="actor">{item.actor}</strong>}
              {item.title}
            </p>
            {item.content}
          </div>
        </li>
      </>
    ))}
  </ol>
);
