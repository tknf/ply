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
  /** 行の頭に番号を振る。番号はコピーする内容に含めない。 */
  lineNumbers?: boolean;
  /** 蛍光ペンを引いて目印にする行（1から数える）。 */
  highlight?: readonly number[];
};

/** トークンも通常の文字としてエスケープし、表示とコピーの内容を一致させる。 */
export const CodeBlock = ({
  code,
  label,
  tokens,
  copy = false,
  lineNumbers = false,
  highlight,
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
  // 行ごとに分け、改行は各行の末尾に残して、表示とコピーの内容を元のコードと一致させる。
  const lines: CodeToken[][] = [[]];
  for (const segment of highlighted ? segments : [{ content: code }]) {
    segment.content.split("\n").forEach((part, index) => {
      if (index) lines.push([]);
      if (part) lines.at(-1)?.push({ ...segment, content: part });
    });
  }
  return (
    <figure
      {...attributes}
      class={classes("ply-code-block", className)}
      data-line-numbers={lineNumbers ? "true" : undefined}
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
          {lines.map((line, index) => (
            <span
              class="line"
              data-highlighted={highlight?.includes(index + 1) ? "true" : undefined}
            >
              {line.map(({ content, color }) =>
                color && content.trim() ? <span style={{ color }}>{content}</span> : content,
              )}
              {index < lines.length - 1 && "\n"}
            </span>
          ))}
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
