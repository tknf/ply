import { componentGroups } from "../../catalog/component-groups";

/** カタログの全部品のid。部品のページは`/components/<id>`。 */
export const componentIds: readonly string[] = componentGroups.flatMap((group) => group.ids);
