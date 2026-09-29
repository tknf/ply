import { raw } from "hono/html";
import {
  ActionLink,
  ActionList,
  CodeBlock,
  ContextBar,
  Disclosure,
  DisclosureGroup,
  Icon,
  LayerCard,
  PageHeader,
  Section,
} from "../../src/hono";
import { appPath, screens } from "../apps/frame";
import { componentGroups } from "../component-groups";
import { CatalogFrame, groupAnchor, type ComponentEntry } from "../layout";

/** カタログの入口。利用例のアプリの画面と、分類ごとの全部品を並べる。 */
export const CatalogIndex = ({ components }: { components: readonly ComponentEntry[] }) => (
  <CatalogFrame components={components}>
    <PageHeader
      title="Ply"
      description={`${components.length}種類の部品。上部中央のコマンドから名前で探せます。`}
    />
    <LayerCard
      title="実務アプリの利用例"
      actions={<ActionLink href={appPath("project")}>アプリを開く</ActionLink>}
    >
      <ActionList
        layout="grid"
        items={screens.map((screen) => ({
          title: screen.label,
          description: screen.description,
          href: appPath(screen.id),
          icon: <Icon name={screen.icon} fill />,
          accent: screen.accent,
        }))}
      />
    </LayerCard>
    {componentGroups.map((group, index) => (
      <Section id={groupAnchor(index)} title={group.name} count={group.ids.length}>
        <ActionList
          layout="grid"
          aria-label={group.name}
          items={group.ids.flatMap((id) => {
            const entry = components.find((component) => component.id === id);
            return entry
              ? [
                  {
                    title: entry.name,
                    description: entry.description,
                    href: `/components/${entry.id}`,
                  },
                ]
              : [];
          })}
        />
      </Section>
    ))}
  </CatalogFrame>
);

type Code = Awaited<ReturnType<typeof import("../code-format").formatExample>>;

/** 部品のページ。見本・使い方・同じ見本のHTMLとHono JSXを並べ、分類の中で前後の部品へ移れる。 */
export const ComponentPage = ({
  components,
  entry,
  usage,
  markup,
  htmlCode,
  jsxCode,
}: {
  components: readonly ComponentEntry[];
  entry: ComponentEntry;
  usage: string;
  markup: string;
  htmlCode: Code;
  jsxCode: Code;
}) => {
  const idsOf = (ids: readonly string[]) => ids;
  const groupIndex = componentGroups.findIndex((group) => idsOf(group.ids).includes(entry.id));
  const group = componentGroups[groupIndex];
  const order = componentGroups.flatMap((candidate) => idsOf(candidate.ids));
  const position = order.indexOf(entry.id);
  const neighbor = (offset: number) =>
    components.find((component) => component.id === order[position + offset]);
  const previous = neighbor(-1);
  const next = neighbor(1);
  return (
    <CatalogFrame components={components} current={entry.id}>
      <ContextBar
        items={[
          { label: "カタログ", href: "/" },
          ...(group ? [{ label: group.name, href: `/#${groupAnchor(groupIndex)}` }] : []),
          { label: entry.name },
        ]}
      />
      <PageHeader title={entry.name} description={entry.description} />
      <section class="ply-stack" aria-label="見本">
        <div class="ply-stack" data-example="hono">
          {entry.id === "page-header" ? (
            <iframe
              class="catalog-preview"
              title="PageHeaderの見本"
              src="/components/page-header/preview"
            />
          ) : (
            raw(markup)
          )}
        </div>
      </section>
      <Section title="使い方">
        <p>{usage}</p>
      </Section>
      <Section title="コード">
        <DisclosureGroup label="見本のコード">
          <Disclosure
            summary="HTML"
            data-controller="code-example"
            data-action="toggle->code-example#opened"
          >
            <template>
              <CodeBlock label="HTML" {...htmlCode} copy />
            </template>
            <noscript>
              <CodeBlock label="HTML" code={htmlCode.code} />
            </noscript>
          </Disclosure>
          <Disclosure
            summary="Hono JSX"
            data-controller="code-example"
            data-action="toggle->code-example#opened"
          >
            <template>
              <CodeBlock label="Hono JSX" {...jsxCode} copy />
            </template>
            <noscript>
              <CodeBlock label="Hono JSX" code={jsxCode.code} />
            </noscript>
          </Disclosure>
        </DisclosureGroup>
      </Section>
      <nav class="ply-cluster" aria-label="前後の部品">
        {previous && (
          <ActionLink href={`/components/${previous.id}`} variant="link">
            ← {previous.name}
          </ActionLink>
        )}
        {next && (
          <ActionLink href={`/components/${next.id}`} variant="link">
            {next.name} →
          </ActionLink>
        )}
      </nav>
    </CatalogFrame>
  );
};
