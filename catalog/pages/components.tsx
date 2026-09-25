import { Surface, ContextBar, PageHeader, Tag } from "../../src/hono";
import { componentGroups } from "../component-groups";
export type ComponentEntry = { id: string; name: string; description: string };
export const Components = ({ components }: { components: readonly ComponentEntry[] }) => (
  <Surface
    context={
      <ContextBar items={[{ label: "道具箱", href: "/" }, { label: "コンポーネント一覧" }]} />
    }
  >
    <PageHeader
      title="コンポーネントから組み立てる"
      description={`${components.length}種類。入力、操作、一覧、予定まで、同じ作法で組み合わせます。`}
    />
    <nav class="catalog-component-jump" aria-label="コンポーネントの分類">
      {componentGroups.map((group, index) => (
        <a href={`#component-group-${index}`}>{group.name}</a>
      ))}
    </nav>
    {componentGroups.map((group, index) => (
      <section class="ply-stack" id={`component-group-${index}`}>
        <h2>
          {group.name} <Tag label={`${group.ids.length}種類`} />
        </h2>
        <ul class="catalog-component-index">
          {group.ids.map((id) => {
            const item = components.find((entry) => entry.id === id);
            return (
              item && (
                <li>
                  <a href={`/components/${id}`}>{item.name}</a>
                  <p>{item.description}</p>
                </li>
              )
            );
          })}
        </ul>
      </section>
    ))}
  </Surface>
);
