export type PageLink = {
  /** 表示する文字（「1」「次へ」など）。「…」は省略の印として、無効の扱いにせず文字だけを出す。 */
  label: string;
  /** 移動先のURL。省略した項目は押せない送りとして、aria-disabled="true"の斜線のピルで出す。 */
  href?: string;
  /** 今のページ。hrefがあってもリンクにせず、aria-current="page"を付けて塗りのピルで出す。 */
  current?: boolean;
};
export const Pagination = ({
  items,
  label = "ページ送り",
}: {
  /** 左から順に並べる送り。前後の送り・番号・省略の印を利用側が組み立てて渡す。 */
  items: readonly PageLink[];
  /** navの読み上げ名。 */
  label?: string;
}) => (
  <nav class="ply-pagination" aria-label={label}>
    <ul>
      {items.map(({ label: text, href, current }) => (
        <li>
          {href && !current ? (
            <a href={href}>{text}</a>
          ) : (
            <span
              data-current={current ? "true" : undefined}
              data-disabled={!current && text !== "…" ? "true" : undefined}
              aria-current={current ? "page" : undefined}
              aria-disabled={!current && text !== "…" ? "true" : undefined}
            >
              {text}
            </span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
