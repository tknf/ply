import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type SearchResult = {
  title: string;
  href: string;
  /** 本文の抜粋。文字で渡すと、queryに一致した語を強調する。 */
  excerpt?: Child;
  /** 置き場所・日付などの補足。 */
  meta?: Child;
  /** 人の円や種類の印。 */
  leading?: Child;
};
export type SearchResultsProps = ElementProps<"ol"> & {
  label: string;
  /** 一致した語。題名と文字の抜粋の中で強調する。 */
  query?: string;
  results: readonly SearchResult[];
};

/** 文字を一致した語の前後で分け、一致した部分をmarkで包む（大文字と小文字は区別しない）。 */
const highlight = (text: string, query?: string): Child => {
  const needle = query?.trim();
  if (!needle) return text;
  const lower = text.toLocaleLowerCase();
  const target = needle.toLocaleLowerCase();
  const parts: Child[] = [];
  let from = 0;
  for (let at = lower.indexOf(target); at !== -1; at = lower.indexOf(target, from)) {
    if (at > from) parts.push(text.slice(from, at));
    parts.push(<mark>{text.slice(at, at + needle.length)}</mark>);
    from = at + needle.length;
  }
  parts.push(text.slice(from));
  return <>{parts}</>;
};

/**
 * HEYやFizzyの検索の結果と同じく、題名・抜粋・補足を並べ、一致した語をHEYのように淡い黄の面で強調する。
 * 条件を足す列はOptionalFieldsのstackで、ページの側に置く。
 */
export const SearchResults = ({
  label,
  query,
  results,
  class: className,
  ...attributes
}: SearchResultsProps) => (
  <ol {...attributes} class={classes("ply-search-results", className)} aria-label={label}>
    {results.map((result) => (
      <li data-leading={result.leading != null ? "true" : undefined}>
        {result.leading != null && <span class="leading">{result.leading}</span>}
        <a class="title" href={result.href}>
          {highlight(result.title, query)}
        </a>
        {result.excerpt != null && result.excerpt !== false && (
          <p class="excerpt">
            {typeof result.excerpt === "string" ? highlight(result.excerpt, query) : result.excerpt}
          </p>
        )}
        {result.meta != null && result.meta !== false && <p class="meta">{result.meta}</p>}
      </li>
    ))}
  </ol>
);
