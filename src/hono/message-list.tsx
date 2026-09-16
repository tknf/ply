import type { Child } from "hono/jsx";
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
};
export const MessageList = ({
  label,
  items,
  state = "ready",
  stateContent,
  previewLines = 2,
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
      data-avatars={String(avatars)}
      data-preview-lines={previewLines}
    >
      {state !== "ready" || items.length === 0 ? (
        <li class="state" role="status">
          {stateContent ??
            (state === "loading"
              ? "連絡を読み込んでいます…"
              : state === "error"
                ? "連絡を読み込めませんでした。"
                : "連絡はまだありません。")}
        </li>
      ) : (
        items.map((item) => {
          const Row = item.href ? "a" : "div";
          const validDate = item.datetime && Number.isFinite(Date.parse(item.datetime));
          return (
            <li
              data-message-id={item.id}
              data-unread={item.unread ? "true" : "false"}
              data-current={item.current ? "true" : undefined}
              data-state={item.state}
            >
              <Row class="row" href={item.href} aria-current={item.current ? "page" : undefined}>
                {avatars && (
                  <span class="avatar" aria-hidden="true">
                    {item.avatar ?? <Icon name="mail" />}
                  </span>
                )}
                <span class="sender">{item.sender.trim() || "差出人不明"}</span>
                <span class="body">
                  <strong class="title">
                    {item.title.trim() || "（件名なし）"}
                    {item.threadCount != null && item.threadCount > 1 && (
                      <span class="count" aria-label={`${item.threadCount}件の会話`}>
                        {item.threadCount}
                      </span>
                    )}
                  </strong>
                  {item.preview && <span class="preview">{item.preview}</span>}
                  {(item.state || item.unavailableReason) && (
                    <span class="status">
                      {item.unavailableReason ??
                        (item.state === "draft"
                          ? "下書き"
                          : item.state === "sending"
                            ? "送信中…"
                            : "送信できませんでした")}
                    </span>
                  )}
                </span>
                <span class="meta">
                  {item.time &&
                    (validDate ? (
                      <time datetime={item.datetime}>{item.time}</time>
                    ) : (
                      <span>{item.time}</span>
                    ))}
                  {item.attachments != null && item.attachments > 0 && (
                    <span class="attachment" aria-label={`添付ファイル${item.attachments}件`}>
                      <Icon name="file" />
                      {item.attachments}
                    </span>
                  )}
                  <span class="unread" hidden={!item.unread}>
                    <span class="ply-visually-hidden">未読</span>
                  </span>
                </span>
              </Row>
            </li>
          );
        })
      )}
    </ul>
  );
};
