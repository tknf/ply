import { Hono, type Context } from "hono";
import { html, raw } from "hono/html";
import { getCookie } from "hono/cookie";
import type { PropsWithChildren } from "hono/jsx";
import {
  Surface,
  ContextBar,
  PageHeader,
  Disclosure,
  DisclosureGroup,
  CodeBlock,
  stylesheets,
} from "../src/hono/index";
import { getHonoExample } from "./hono-examples";
import { formatExample } from "./code-format";
import { componentGroups } from "./component-groups";
import { redesignedComponentIds } from "./redesigned-components";
import { AppPatterns } from "./pages/app-patterns";
import { WorkspaceProject } from "./pages/workspace";
import { WorkspaceMail } from "./pages/inbox";
import { examples } from "./examples";
import { interactiveExamples } from "./interactive-examples";
import { SearchExample } from "./pages/search";
import { reservationExample } from "./pages/reservation";
import { Editor } from "./pages/editor";
import { SalesExample, FilesExample } from "./pages/workflows";

import { extendedExamples } from "./extended-examples";
import { Components } from "./pages/components";
import { ProjectExample, SettingsExample, ScheduleExample } from "./pages/compositions";
import { ContactExample } from "./pages/contact";
const catalogExamples = [...examples, ...interactiveExamples, ...extendedExamples];
const reviewComponentIds = redesignedComponentIds;

export const paths = [
  "/",
  "/components",
  "/examples/project",
  "/examples/contact",
  "/examples/settings",
  "/examples/schedule",
  "/examples/schedule/august",
  "/example",
  "/saved",
  "/sales",
  "/reservation",
  "/search",
  "/search/empty",
  "/files",
  "/review",
  "/review/components",
  ...componentGroups.map((_, index) => `/review/components/group-${index}`),
  "/review/applications",
  "/review/workspace",
  "/review/mail",
  "/review/mail/meeting",
  "/review/mail/categories",
  "/review/mail/review",
  "/preview/page-header",
  "/preview/hono-page-header",
  ...catalogExamples.map(({ id }) => `/components/${id}`),
];

const Document = ({
  title,
  children,
  scripts = true,
  layout = "catalog",
}: PropsWithChildren<{ title: string; scripts?: boolean; layout?: "catalog" | "app" }>) => (
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title} · ply</title>
      {!scripts && <meta name="turbo-visit-control" content="reload" />}
      {stylesheets.map((file) => (
        <link rel="stylesheet" href={`/src/css/${file}`} />
      ))}
      <link rel="stylesheet" href="/catalog/catalog.css" />
      {scripts && (
        <script
          type="module"
          src={import.meta.env.PROD ? "/assets/client.js" : "/catalog/client.ts"}
        />
      )}
    </head>
    <body>
      {layout === "app" ? (
        <main>{children}</main>
      ) : (
        <div class="catalog-shell">
          <nav class="catalog-nav ply-container" aria-label="カタログ">
            <a href="/" aria-label="Plyの道具箱">
              ply
            </a>
            <div class="ply-cluster">
              <a href="/components">コンポーネント一覧</a>
              <a href="/review/components">全体を見る</a>
            </div>
          </nav>
          <main class="ply-container">{children}</main>
        </div>
      )}
    </body>
  </html>
);

export const app = new Hono();
app.get("/review/workspace", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="仕事場" layout="app">
          <WorkspaceProject />
        </Document>
      )}`,
  ),
);
for (const mailPath of [
  "/review/mail",
  "/review/mail/meeting",
  "/review/mail/categories",
  "/review/mail/review",
])
  app.get(mailPath, (c) =>
    c.html(
      html`<!doctype html>${(
          <Document title="受信トレイ" layout="app">
            <WorkspaceMail message={c.req.path.split("/").at(3)} />
          </Document>
        )}`,
    ),
  );
app.get("/review/studio", (c) => c.redirect("/review/components"));
app.get("/review/applications", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="アプリへの適用例">
          <Surface
            context={
              <ContextBar
                items={[
                  { label: "コンポーネント一覧", href: "/components" },
                  { label: "アプリへの適用例" },
                ]}
              />
            }
          >
            <PageHeader
              title="同じ作法で、違う仕事へ"
              description="メール・CRM・プロジェクト・ドキュメント・財務・会話へ、共通コンポーネントを組み合わせた表示例です。"
            />
            <AppPatterns />
          </Surface>
        </Document>
      )}`,
  ),
);
const reviewComponents = (c: Context) => {
  const group = componentGroups.find((_, index) => `group-${index}` === c.req.param("group"));
  const ids = group?.ids ?? reviewComponentIds;
  return c.html(
    html`<!doctype html>${(
        <Document title="コンポーネントの再設計">
          <Surface
            context={
              <ContextBar
                items={[
                  { label: "コンポーネント一覧", href: "/components" },
                  { label: "コンポーネントの再設計" },
                ]}
              />
            }
          >
            <PageHeader
              title={group?.name ?? "Plyのコンポーネントを見直す"}
              description="Button・Inputから一覧・通知まで。共通コンポーネントの大きさ、状態、文字位置を直接確認できます。"
            />
            <nav class="ply-cluster" aria-label="コンポーネントの分類">
              <a href="/review/components">すべて</a>
              {componentGroups.map((entry, index) => (
                <a href={`/review/components/group-${index}`}>{entry.name}</a>
              ))}
            </nav>
            <nav class="ply-cluster" aria-label="再設計したコンポーネント">
              {ids.map((id) => (
                <a href={`#review-${id}`}>
                  {catalogExamples.find((entry) => entry.id === id)?.name}
                </a>
              ))}
            </nav>
            <div class="catalog-review">
              {ids.map((id) => (
                <section class="catalog-specimen" id={`review-${id}`} data-component={id}>
                  <h2>
                    <a href={`/components/${id}`}>
                      {catalogExamples.find((entry) => entry.id === id)?.name}
                    </a>
                  </h2>
                  <div class="example">{getHonoExample(id).render({ cookies: getCookie(c) })}</div>
                </section>
              ))}
            </div>
          </Surface>
        </Document>
      )}`,
  );
};
app.get("/review/components", reviewComponents);
app.get("/review/components/:group", reviewComponents);
app.get("/preview/hono-page-header", (c) =>
  c.html(
    html`<!doctype html>${(
        <html lang="ja">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Hono PageHeaderの表示例</title>
            {stylesheets.map((file) => (
              <link rel="stylesheet" href={`/src/css/${file}`} />
            ))}
          </head>
          <body>{getHonoExample("page-header").render({ cookies: getCookie(c) })}</body>
        </html>
      )}`,
  ),
);
app.get("/preview/page-header", (c) =>
  c.html(
    html`<!doctype html>${(
        <html lang="ja">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>PageHeaderの表示例</title>
            {stylesheets.map((file) => (
              <link rel="stylesheet" href={`/src/css/${file}`} />
            ))}
          </head>
          <body>
            <Surface>
              <PageHeader title="記事を編集する" description="内容と公開設定を確認できます。" />
            </Surface>
          </body>
        </html>
      )}`,
  ),
);
app.get("/search", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="検索">
          <SearchExample query={c.req.query("q")} state={c.req.query("state")} />
        </Document>
      )}`,
  ),
);
app.get("/search/empty", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="検索結果0件">
          <SearchExample empty />
        </Document>
      )}`,
  ),
);
app.get("/reservation", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="予約（CSSのみ）" scripts={false}>
          {reservationExample}
        </Document>
      )}`,
  ),
);
app.get("/sales", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="売上">
          <SalesExample />
        </Document>
      )}`,
  ),
);
app.get("/files", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="ファイル">
          <FilesExample />
        </Document>
      )}`,
  ),
);
app.get("/review", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="変更の確認">
          <Editor id={c.req.query("id")} mode="compare" />
        </Document>
      )}`,
  ),
);
app.get("/", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="コンポーネント">
          <Components components={catalogExamples} />
        </Document>
      )}`,
  ),
);
app.get("/example", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="編集画面">
          <Editor id={c.req.query("id")} />
        </Document>
      )}`,
  ),
);
app.get("/saved", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="操作結果">
          <Editor />
        </Document>
      )}`,
  ),
);
app.get("/components", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="コンポーネント一覧">
          <Components components={catalogExamples} />
        </Document>
      )}`,
  ),
);
app.get("/examples/project", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="案件管理の事例">
          <ProjectExample />
        </Document>
      )}`,
  ),
);
app.get("/examples/contact", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="担当者への問い合わせ">
          <ContactExample />
        </Document>
      )}`,
  ),
);
app.get("/examples/settings", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="設定の事例">
          <SettingsExample />
        </Document>
      )}`,
  ),
);
app.get("/examples/schedule", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="予定の事例">
          <ScheduleExample
            year={c.req.query("year")}
            month={c.req.query("month")}
            view={c.req.query("view")}
            week={c.req.query("week")}
          />
        </Document>
      )}`,
  ),
);
app.get("/examples/schedule/august", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="予定の事例">
          <ScheduleExample month="8" />
        </Document>
      )}`,
  ),
);
app.get("/components/:id", async (c) => {
  const example = catalogExamples.find(({ id }) => id === c.req.param("id"));
  if (!example) return c.notFound();
  const honoExample = getHonoExample(example.id);
  const honoMarkup = await html`${honoExample.render({ cookies: getCookie(c) })}`;
  const [htmlCode, jsxCode] = await Promise.all([
    formatExample(String(honoMarkup), "html"),
    formatExample(honoExample.source, "tsx"),
  ]);
  return c.html(
    html`<!doctype html>${(
        <Document title={example.name}>
          <Surface
            context={
              <ContextBar
                items={[
                  { label: "コンポーネント一覧", href: "/components" },
                  { label: example.name },
                ]}
              />
            }
          >
            <PageHeader title={example.name} description={example.description} />
            <section class="ply-stack" aria-label="Honoの利用例">
              <div class="ply-stack" data-example="hono">
                {example.id === "page-header" ? (
                  <iframe
                    class="catalog-preview"
                    title="Hono PageHeaderの表示例"
                    src="/preview/hono-page-header"
                  />
                ) : (
                  raw(honoMarkup)
                )}
              </div>
            </section>
            <section class="ply-stack">
              <h2>使い方</h2>
              <p>{example.usage}</p>
              <DisclosureGroup label="利用例のコード">
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
            </section>
          </Surface>
        </Document>
      )}`,
  );
});
