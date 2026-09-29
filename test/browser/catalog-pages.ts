import { componentGroups } from "../../catalog/component-groups";
import { screens } from "../../catalog/apps/frame";

/** カタログの全部品のid。部品のページは`/components/<id>`。 */
export const componentIds: readonly string[] = componentGroups.flatMap((group) => group.ids);

/** 利用例のアプリの全画面のパス。 */
export const appPaths: readonly string[] = [
  ...screens.map((screen) => `/apps/${screen.id}`),
  "/apps/inbox/meeting",
  "/apps/docs?article=export",
  "/apps/search?q=招待",
];
