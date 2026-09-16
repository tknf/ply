import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type MessageProps = PropsWithChildren<
  ElementProps<"article"> & {
    author: string;
    layout?: "conversation" | "document";
    avatar?: Child;
    time: string;
    datetime: string;
    actions?: Child;
    replies?: Child;
  }
>;
export const Message = ({
  author,
  layout = "conversation",
  avatar,
  time,
  datetime,
  actions,
  replies,
  children,
  class: className,
  ...attributes
}: MessageProps) => (
  <article {...attributes} class={classes("ply-message", className)} data-layout={layout}>
    {avatar != null && avatar !== false && (
      <div class="avatar" aria-hidden="true">
        {avatar}
      </div>
    )}
    <header class="heading">
      <strong>{author}</strong>
      <time datetime={datetime}>{time}</time>
    </header>
    <div class="body">{children}</div>
    {actions != null && actions !== false && <footer class="actions">{actions}</footer>}
    {replies != null && replies !== false && <div class="replies">{replies}</div>}
  </article>
);
