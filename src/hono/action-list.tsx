import type { Child } from "hono/jsx";
import { classes, type ElementProps, type Accent } from "./types";

/** 入口の一件。行（またはタイル）全体が一つのリンクになる。 */
export type ActionListItem = {
  /** 入口の名前。移る先で行う作業を動詞で書く。 */
  title: string;
  /** 移る先。行全体をこのリンクにする。 */
  href: string;
  /** 名前の下に淡い文字で添える一文。 */
  description?: string;
  /** 名前の前に置く印。accentの色を淡く敷いた丸に載せる。塗りつぶしのIconを想定する。 */
  icon?: Child;
  /** 説明の下に置く中身の見本（直近の数件など）。リンクの中に入るので、ボタンやリンクを入れない。 */
  preview?: Child;
  /** 印の色。用途を見分けるためだけに使い、状態の色には使わない。 */
  accent?: Accent;
  /** 手当てが要る行（確かめていない予備の連絡先など）。名前と説明を危険の色で書く。 */
  attention?: boolean;
};
export type ActionListProps = ElementProps<"ul"> & {
  /** 並べる入口。 */
  items: readonly ActionListItem[];
  /** listは淡い板に行を積み、行の間を細い線で区切る。gridは各入口を角丸のタイルにして格子に並べる。 */
  layout?: "list" | "grid";
};
export const ActionList = ({
  items,
  layout = "list",
  class: className,
  ...attributes
}: ActionListProps) => (
  <ul {...attributes} class={classes("ply-action-list", className)} data-layout={layout}>
    {items.map(({ title, href, description, icon, preview, accent = "blue", attention }) => (
      <li>
        <a
          href={href}
          data-accent={attention ? "coral" : accent}
          data-attention={attention ? "true" : undefined}
        >
          {icon && <span class="icon">{icon}</span>}
          <span class="title">{title}</span>
          {description && <small class="description">{description}</small>}
          {preview != null && preview !== false && <div class="preview">{preview}</div>}
        </a>
      </li>
    ))}
  </ul>
);
