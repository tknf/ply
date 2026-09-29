import type { Child } from "hono/jsx";
import { Badge } from "./badge";
import { Divider } from "./divider";
import { EmptyState, type EmptyStateProps } from "./empty-state";
import { Icon } from "./icon";
import { classes, type ElementProps } from "./types";

export type MessageListItem = {
  id: string;
  sender: string;
  title: string;
  preview?: string;
  href?: string;
  time?: string;
  datetime?: string;
  avatar?: Child;
  unread?: boolean;
  current?: boolean;
  threadCount?: number;
  attachments?: number;
  state?: "draft" | "sending" | "failed";
  unavailableReason?: string;
};
export type MessageListProps = ElementProps<"ul"> & {
  label: string;
  items: readonly MessageListItem[];
  state?: "ready" | "loading" | "error";
  stateContent?: Child;
  previewLines?: 1 | 2;
  /** この項目の直前に区切りの線とラベルを置き、ここから新しいことを示す。 */
  newSince?: { id: string; label?: string };
  /**
   * 連絡が一件もない時の表示。EmptyStateで描く。行を後から出し入れしても、行が一つもない時だけ見える。
   * 既定は「連絡はまだありません」。
   */
  empty?: { title: string; description?: Child; kind?: EmptyStateProps["kind"] };
};
export const MessageList = ({
  label,
  items,
  state = "ready",
  stateContent,
  previewLines = 1,
  newSince,
  empty = { title: "連絡はまだありません" },
  class: className,
  ...attributes
}: MessageListProps) => {
  const avatars = items.some((item) => item.avatar != null && item.avatar !== false);
  return (
    <ul
      {...attributes}
      class={classes("ply-message-list", className)}
      aria-label={label}
      aria-busy={state === "loading" ? "true" : undefined}
      data-state={state !== "ready" ? state : items.length === 0 ? "empty" : "ready"}
      data-avatars={String(avatars)}
      data-preview-lines={previewLines}
    >
      {state !== "ready" ? (
        <li class="state" role="status">
          {stateContent ??
            (state === "loading" ? "連絡を読み込んでいます…" : "連絡を読み込めませんでした。")}
        </li>
      ) : (
        <li class="state" data-empty="true" role="status">
          {stateContent ?? (
            <EmptyState title={empty.title} kind={empty.kind}>
              {empty.description}
            </EmptyState>
          )}
        </li>
      )}
      {state === "ready" &&
        items.map((item) => {
          const Row = item.href ? "a" : "div";
          const validDate = item.datetime && Number.isFinite(Date.parse(item.datetime));
          return (
            <>
              {newSince?.id === item.id && (
                <li class="divider" role="none">
                  <Divider label={newSince.label ?? "ここから新着"} />
                </li>
              )}
              <li
                data-message-id={item.id}
                data-unread={item.unread ? "true" : "false"}
                data-current={item.current ? "true" : undefined}
                data-state={item.state}
                data-unavailable={item.unavailableReason ? "true" : undefined}
              >
                <Row class="row" href={item.href} aria-current={item.current ? "page" : undefined}>
                  {avatars && (
                    <span class="avatar" aria-hidden="true">
                      {item.avatar ?? <Icon name="mail" />}
                    </span>
                  )}
                  <span class="body">
                    <strong class="title">
                      {/* 状態（「下書き」など）は、件名の前に共通のBadgeで置く。 */}
                      {(item.state || item.unavailableReason) && (
                        <Badge
                          class="state"
                          tone={
                            !item.unavailableReason && item.state === "failed"
                              ? "danger"
                              : "neutral"
                          }
                          draft={!item.unavailableReason && item.state === "draft"}
                        >
                          {item.unavailableReason
                            ? "閲覧不可"
                            : item.state === "draft"
                              ? "下書き"
                              : item.state === "sending"
                                ? "送信中"
                                : "送信失敗"}
                        </Badge>
                      )}
                      <span class="subject">{item.title.trim() || "（件名なし）"}</span>
                      {item.threadCount != null && item.threadCount > 1 && (
                        <span class="count" aria-label={`${item.threadCount}件の会話`}>
                          {item.threadCount}
                        </span>
                      )}
                      {item.attachments != null && item.attachments > 0 && (
                        <span class="attachment" aria-label={`添付ファイル${item.attachments}件`}>
                          <Icon name="file" />
                          {item.attachments}
                        </span>
                      )}
                    </strong>
                    <span class="summary">
                      <span class="sender">{item.sender.trim() || "差出人不明"}</span>
                      {(item.unavailableReason ?? item.preview) && (
                        <span class="preview">{item.unavailableReason ?? item.preview}</span>
                      )}
                    </span>
                  </span>
                  <span class="meta">
                    {item.time &&
                      (validDate ? (
                        <time datetime={item.datetime}>{item.time}</time>
                      ) : (
                        <span>{item.time}</span>
                      ))}
                    <span class="unread" hidden={!item.unread}>
                      <span class="ply-visually-hidden">未読</span>
                    </span>
                  </span>
                </Row>
              </li>
            </>
          );
        })}
    </ul>
  );
};
