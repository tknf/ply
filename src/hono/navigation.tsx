import { NavigationItems, type NavigationItem } from "./navigation-items";

export type { NavigationItem } from "./navigation-items";
export type NavigationProps = {
  label: string;
  items: readonly NavigationItem[];
};
export const Navigation = ({ label, items }: NavigationProps) => (
  <nav class="ply-navigation" aria-label={label}>
    <NavigationItems items={items} />
  </nav>
);
