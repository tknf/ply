import { Hono } from "hono";
import { html, raw } from "hono/html";
import type { PropsWithChildren } from "hono/jsx";
import { Surface, ContextBar, PageHeader, Button, Field, stylesheets } from "../src/hono/index";
import { getHonoExample } from "./hono-examples";
import { examples } from "./examples";
import { interactiveExamples } from "./interactive-examples";
import { SearchExample } from "./pages/search";
import { reservationExample } from "./pages/reservation";
import { Home } from "./pages/home";
import { Editor } from "./pages/editor";
import { SalesExample, FilesExample } from "./pages/workflows";

import { extendedExamples } from "./extended-examples";
import { Components } from "./pages/components";
import { ProjectExample, SettingsExample, ScheduleExample } from "./pages/compositions";
const catalogExamples = [...examples, ...interactiveExamples, ...extendedExamples];
export const paths = [
  "/",
  "/components",
  "/examples/project",
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
  "/preview/page-header",
  "/preview/hono-page-header",
  ...catalogExamples.map(({ id }) => `/components/${id}`),
];

const Document = ({
  title,
  children,
  scripts = true,
}: PropsWithChildren<{ title: string; scripts?: boolean }>) => (
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
      <div class="catalog-shell">
        <nav class="catalog-nav ply-container" aria-label="カタログ">
          <a href="/" aria-label="Plyの道具箱">
            ply<span>第四版</span>
          </a>
          <div class="ply-cluster">
            <a href="/components">部品一覧</a>
            {[
              {
                href: "/search",
                label: "記事",
                name: "記事一覧",
                active: ["検索", "検索結果0件", "編集画面", "変更の確認", "操作結果"].includes(
                  title,
                ),
              },
              {
                href: "/reservation",
                label: "予約",
                name: "予約",
                active: title === "予約（CSSのみ）",
              },
              { href: "/sales", label: "売上", name: "売上", active: title === "売上" },
              { href: "/files", label: "ファイル", name: "ファイル", active: title === "ファイル" },
            ].map((item) => (
              <a
                href={item.href}
                aria-label={item.name}
                aria-current={item.active ? "page" : undefined}
                data-current={item.active ? "true" : undefined}
                data-turbo={item.href === "/reservation" ? "false" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <main class="ply-container">{children}</main>
      </div>
    </body>
  </html>
);

export const app = new Hono();
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
          <body>{getHonoExample("page-header").render()}</body>
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
          <Home components={catalogExamples} />
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
        <Document title="部品一覧">
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
          <ScheduleExample />
        </Document>
      )}`,
  ),
);
app.get("/examples/schedule/august", (c) =>
  c.html(
    html`<!doctype html>${(
        <Document title="予定の事例">
          <ScheduleExample month={8} />
        </Document>
      )}`,
  ),
);
app.get("/components/:id", async (c) => {
  const example = catalogExamples.find(({ id }) => id === c.req.param("id"));
  if (!example) return c.notFound();
  const honoExample = getHonoExample(example.id);
  const honoMarkup = await html`${honoExample.render()}`;
  const markup = "render" in example ? await html`${example.render()}` : example.html;
  return c.html(
    html`<!doctype html>${(
        <Document title={example.name}>
          <Surface
            context={
              <ContextBar
                items={[{ label: "コンポーネント", href: "/components" }, { label: example.name }]}
              />
            }
          >
            <PageHeader title={example.name} description={example.description} />
            <div class="ply-stack">
              <section class="ply-stack">
                <h2>CSSとHTMLで使う</h2>
                {example.id === "page-header" ? (
                  <iframe
                    class="catalog-preview"
                    title="PageHeaderの表示例"
                    src="/preview/page-header"
                  />
                ) : (
                  raw(markup)
                )}
                <pre class="catalog-code">
                  <code>{String(markup)}</code>
                </pre>
              </section>
              {example.id === "button" && (
                <section class="ply-stack">
                  <h2>状態と操作の強弱</h2>
                  <div class="ply-cluster">
                    <Button variant="primary">保存する</Button>
                    <Button>表示を確認</Button>
                    <Button variant="danger">削除する</Button>
                    <Button disabled>変更なし</Button>
                    <Button busy busyLabel="保存中…">
                      保存する
                    </Button>
                  </div>
                </section>
              )}
              {example.id === "field" && (
                <section class="ply-stack">
                  <h2>入力欄とButtonの寸法</h2>
                  <Field id="input-standard" label="通常の入力">
                    {(attributes) => (
                      <input {...attributes} class="ply-input" value="記事名を編集する" />
                    )}
                  </Field>
                  <Button>保存する</Button>
                  <Field id="input-large" label="大きい入力">
                    {(attributes) => (
                      <input
                        {...attributes}
                        class="ply-input"
                        data-size="large"
                        value="フォルダー名を編集する"
                      />
                    )}
                  </Field>
                  <Button size="large">保存する</Button>
                  <h2>エラー・閲覧専用</h2>
                  <Field
                    id="error-title"
                    label="記事名"
                    error="記事名を入力してください。"
                    help="一覧で見分けられる名前を付けます。"
                  >
                    {(attributes) => <input {...attributes} class="ply-input" />}
                  </Field>
                  <Field id="readonly-title" label="現在の値">
                    {(attributes) => (
                      <input
                        {...attributes}
                        class="ply-input"
                        readonly
                        value="現在公開されている記事名"
                      />
                    )}
                  </Field>
                </section>
              )}
              <section class="ply-stack" aria-label="Honoの利用例">
                <h2>Honoで使う・状態と変種</h2>
                <p>
                  このコードを実際にSSRした表示です。CSSの読み込みと、動作部品のcontroller登録はREADMEを参照してください。
                </p>
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
                <pre class="catalog-code">
                  <code>{honoExample.source}</code>
                </pre>
                <details class="ply-disclosure">
                  <summary>この状態・変種のHTMLを見る</summary>
                  <div>
                    <pre class="catalog-code">
                      <code>{String(honoMarkup)}</code>
                    </pre>
                  </div>
                </details>
              </section>
              <section class="ply-stack">
                <h2>使い方と注意点</h2>
                <p>{example.usage}</p>
                {example.id === "field" && (
                  <details class="ply-disclosure">
                    <summary>controllerの接続コード</summary>
                    <div class="ply-stack">
                      <pre>
                        <code>{`import { Application } from "@hotwired/stimulus";
import {
  CharacterCountController, CheckboxGroupController, ComboboxController,
  DateFieldController, NumberFieldController, PasswordFieldController,
  TimeFieldController,
} from "ply/controllers";

const application = Application.start();
application.register("character-count", CharacterCountController);
application.register("checkbox-group", CheckboxGroupController);
application.register("combobox", ComboboxController);
application.register("date-field", DateFieldController);
application.register("number-field", NumberFieldController);
application.register("password-field", PasswordFieldController);
application.register("time-field", TimeFieldController);`}</code>
                      </pre>
                      <p>
                        既存のApplicationがある場合は、そのApplicationへ登録します。field-demoは確定値を表示するカタログ専用処理です。文字数は上流controllerのUTF-16単位で数えるため、絵文字などは見た目の字数と異なる場合があります。
                      </p>
                    </div>
                  </details>
                )}
                <a href="/example">関連部品を組み合わせた編集画面</a>
              </section>
            </div>
          </Surface>
        </Document>
      )}`,
  );
});
