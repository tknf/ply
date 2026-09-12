import { ActionLink } from "./button";

export type NavigationItem = {
  label: string;
  href: string;
  current?: boolean;
  count?: number;
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
          <span>{item.label}</span>
          {item.count !== undefined && <small>{item.count}</small>}
        </Link>
      ))}
    </>
  );
};
