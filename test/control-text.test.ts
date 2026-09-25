import { readFile } from "node:fs/promises";
import postcss from "postcss";
import { expect, test } from "vite-plus/test";
import { controlMarkupErrors, controlTextErrors } from "../scripts/control-text.mjs";

const menuCss = () => readFile("src/css/components/dropdown-menu.css", "utf8");
const badgeCss = () => readFile("src/css/components/badge.css", "utf8");
const check = (css: string, path = "src/css/components/dropdown-menu.css") =>
  controlTextErrors(postcss.parse(css), path);
const addMenuRule = async (declarations: string, selector = ".ply-menu > li > .item.ply-button") =>
  `${await menuCss()}\n@layer components { ${selector} { ${declarations} } }`;

test("ButtonGroupは配置を所有するが内部Buttonの文字上書きは引き続き拒否する", () => {
  const path = "src/css/components/button-group.css";
  expect(check(".ply-button-group { align-items: stretch; }", path)).toEqual([]);
  expect(check(".ply-button-group > .ply-button { align-items: stretch; }", path)).not.toEqual([]);
  expect(check(".ply-button-group > .ply-button > span { translate: 0 1px; }", path)).not.toEqual(
    [],
  );
});

test("Badgeの印をベースラインへ下げる変更と本文フォントへの戻しを拒否する", async () => {
  const css = await badgeCss();
  expect(check(css, "src/css/components/badge.css")).toEqual([]);
  expect(
    check(
      css.replace("align-items: start", "align-items: baseline"),
      "src/css/components/badge.css",
    ),
  ).not.toEqual([]);
  expect(
    check(
      css.replace("font-family: var(--ply-control-font-family);", ""),
      "src/css/components/badge.css",
    ),
  ).not.toEqual([]);
});

test("現行メニューは共通Buttonの文字と縦配置を上書きしない", async () => {
  expect(check(await menuCss())).toEqual([]);
});

for (const declaration of [
  "font: inherit;",
  "font-family: var(--ply-font);",
  "font-weight: 600;",
  "line-height: 1.5;",
  "padding-block: 0.5rem;",
  "padding-block-start: 2px;",
  "align-items: start;",
  "transform: translateY(2px);",
  "translate: 0 2px;",
  "margin-block-start: -2px;",
  "text-box-trim: trim-both;",
]) {
  test(`既知の崩れ方を再導入すると拒否する: ${declaration}`, async () => {
    expect(check(await addMenuRule(declaration))).not.toEqual([]);
  });
}

test("新しいCSSファイルからの上書きも検出する", async () => {
  expect(
    check(await addMenuRule("font: inherit;"), "src/css/components/new-control.css"),
  ).not.toEqual([]);
});

test("状態別・メディア条件内の上書きも検出する", async () => {
  const css = `${await menuCss()} @layer components { @media (min-width: 500px) {
    .ply-menu > li > .item { &:hover { font-weight: 600; } }
  } }`;
  expect(check(css)).not.toEqual([]);
});

test("文字を包む子要素だけをずらす変更も検出する", async () => {
  expect(
    check(
      await addMenuRule(
        "transform: translateY(-2px);",
        ".ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .heading > .text > span",
      ),
    ),
  ).not.toEqual([]);
});

test("説明文を分けたラベル行でも文字の移動や行高変更を拒否する", async () => {
  for (const selector of [
    ".ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .heading",
    ".ply-menu > li > .ply-menu > li > .item > .content",
    ".ply-menu > li > .ply-menu > li > .item > .content > .description",
  ]) {
    expect(check(await addMenuRule("transform: translateY(2px);", selector))).not.toEqual([]);
    expect(check(await addMenuRule("line-height: 2;", selector))).not.toEqual([]);
  }
});

test("メニューは上揃えを保ち中央配置への戻しを拒否する", async () => {
  expect(
    check(
      await addMenuRule(
        "align-items: center;",
        ".ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .heading",
      ),
    ),
  ).not.toEqual([]);
  expect(check(await addMenuRule("display: flex;"))).not.toEqual([]);
  expect(check(await addMenuRule("padding-block: 4px 8px;"))).not.toEqual([]);
  expect(check(await menuCss())).toEqual([]);
});

test("初回のように独自buttonへフォントだけを追加しても旧余白を見逃さない", () => {
  expect(
    check(`@layer components { .ply-dropdown-menu { & > .ply-menu {
    font-family: var(--ply-control-font-family);
    & > li > button { font-family: var(--ply-control-font-family); padding-block: 0.5rem; }
  } } }`),
  ).not.toEqual([]);
});

test("基準のButton自体から中央揃えを削除した場合も検出する", async () => {
  const css = await readFile("src/css/components/button.css", "utf8");
  expect(check(css, "src/css/components/button.css")).toEqual([]);
  expect(
    check(css.replace("align-items: center;", ""), "src/css/components/button.css"),
  ).not.toEqual([]);
});

test("操作用フォントのトークンを本文用に戻す変更を検出する", async () => {
  const css = await readFile("src/css/tokens.css", "utf8");
  expect(check(css, "src/css/tokens.css")).toEqual([]);
  expect(
    check(
      css.replace('"Helvetica Neue", Arial, var(--ply-font)', "var(--ply-font)"),
      "src/css/tokens.css",
    ),
  ).not.toEqual([]);
});

test("フォント名を保っても行メトリクスを元に戻したら検出する", async () => {
  const css = await readFile("src/css/tokens.css", "utf8");
  for (const declaration of [
    "ascent-override: 89%;",
    "descent-override: 11%;",
    "line-gap-override: 0%;",
  ]) {
    expect(check(css.replaceAll(declaration, ""), "src/css/tokens.css")).not.toEqual([]);
  }
  const root = postcss.parse(css);
  root.walkAtRules("font-face", (rule) => {
    rule.remove();
  });
  expect(check(root.toString(), "src/css/tokens.css")).not.toEqual([]);
});

test("正しい共通宣言の後に同じファイルで上書きしても検出する", async () => {
  const css = await readFile("src/css/components/button.css", "utf8");
  expect(
    check(
      `${css} @layer components { .ply-button { font-family: var(--ply-font); } }`,
      "src/css/components/button.css",
    ),
  ).not.toEqual([]);
});

test("色の変更や説明文の文字サイズまで禁止しない", async () => {
  expect(check(await addMenuRule("color: var(--ply-danger);"))).toEqual([]);
  expect(
    check(
      `@layer components { .ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .ply-menu > li > .ply-menu > li > .item > .ply-menu > li > .ply-menu > li > .item > .content > .heading > .text { & > small { font-size: var(--ply-small); } } }`,
    ),
  ).toEqual([]);
});

test("旧実装のような共通コンポーネントを迂回したボタンを新規ファイルでも検出する", () => {
  const source = 'export const Example = () => <button type="button">確認する</button>;';
  expect(controlMarkupErrors(source, "src/hono/new-menu.tsx")).not.toEqual([]);
  expect(
    controlMarkupErrors(
      "export const Example = () => <Button>確認する</Button>;",
      "src/hono/new-menu.tsx",
    ),
  ).toEqual([]);
});
