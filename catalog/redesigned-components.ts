import { componentGroups } from "./component-groups";

/** カタログ全体。Field配下の公開コントロールもFieldの見本で確認する。 */
export const redesignedComponentIds = componentGroups.flatMap((group) => group.ids);
