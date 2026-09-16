import { ActionLink } from "./button";
import type { Child } from "hono/jsx";

export type NavigationItem = {
  label: string;
  href: string;
  current?: boolean;
  count?: number;
  icon?: Child;
};

/** 現在地のARIA・状態属性と0件の扱いを、ナビゲーション間で揃える。 */
export const NavigationItems = ({
  items,
  appearance = "plain",
}: {
  items: readonly NavigationItem[];
  appearance?: "plain" | "button";
}) => {
  const Link = appearance === "button" ? ActionLink : "a";
  return (
    <>
      {items.map((item) => (
        <Link
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          data-current={item.current ? "true" : undefined}
        >
          {item.icon != null && <span class="icon">{item.icon}</span>}
          <span>{item.label}</span>
          {item.count !== undefined && <small>{item.count}</small>}
        </Link>
      ))}
    </>
  );
};
