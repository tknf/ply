import { Button } from "./button";
import { useId } from "hono/jsx";
import { Toast } from "./toast";
import { classes, type ElementProps } from "./types";

export type CodeToken = { content: string; color?: string };
export type CodeBlockProps = ElementProps<"figure"> & {
  code: string;
  label: string;
  tokens?: readonly CodeToken[];
  copy?: boolean;
};

/** トークンも通常の文字としてエスケープし、表示とコピーの内容を一致させる。 */
export const CodeBlock = ({
  code,
  label,
  tokens,
  copy = false,
  class: className,
  ...attributes
}: CodeBlockProps) => {
  const highlighted = tokens?.map(({ content }) => content).join("") === code ? tokens : undefined;
  const notificationId = `code-copy-${useId()}`;
  const segments: CodeToken[] = [];
  for (const token of highlighted ?? []) {
    const previous = segments.at(-1);
    if (previous && previous.color === token.color) previous.content += token.content;
    else segments.push({ ...token });
  }
  return (
    <figure
      {...attributes}
      class={classes("ply-code-block", className)}
      data-controller={
        copy
          ? classes("clipboard code-block", attributes["data-controller"])
          : attributes["data-controller"]
      }
    >
      <figcaption data-copy={copy ? "true" : undefined}>
        <span class="label">{label}</span>
        {copy && (
          <>
            <Button
              size="compact"
              aria-label={`${label}をコピー`}
              data-clipboard-target="trigger"
              data-code-block-target="copy"
              hidden
            >
              コピー
            </Button>
          </>
        )}
      </figcaption>
      <pre tabindex={0} role="region" aria-label={label}>
        <code data-clipboard-target={copy ? "source" : undefined}>
          {highlighted
            ? segments.map(({ content, color }) =>
                color && content.trim() ? <span style={{ color }}>{content}</span> : content,
              )
            : code}
        </code>
      </pre>
      {copy && (
        <Toast id={notificationId} closeLabel="コピー結果の通知を閉じる">
          <span data-code-block-target="status" />
        </Toast>
      )}
    </figure>
  );
};
