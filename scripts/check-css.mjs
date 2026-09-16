import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import postcss from "postcss";
import { controlTextErrors, controlMarkupErrors } from "./control-text.mjs";
import { partNameErrors } from "./part-names.mjs";

const filesUnder = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory() ? filesUnder(join(directory, entry.name)) : [join(directory, entry.name)],
    ),
  );
  return nested.flat();
};
const errors = [];
const tokenDefinitions = new Set();
const references = [];
// 文字位置に影響する書体の基準は、操作部品で共通のトークンを使う。
const controlFontOwners = new Map([
  ["src/css/components/button.css", ".ply-button"],
  ["src/css/components/field.css", ".ply-input"],
  ["src/css/components/input-group.css", ".ply-input-group > .control"],
  ["src/css/components/date-picker.css", ".ply-date-picker > .panel"],
  ["src/css/components/dropdown-menu.css", ".ply-menu"],
  ["src/css/components/dialog.css", ".ply-dialog > .panel"],
  ["src/css/components/popover.css", ".ply-popover > .panel"],
  ["src/css/components/disclosure.css", "& > summary"],
  ["src/css/components/tabs.css", "& > button"],
]);
const cssFiles = [
  ...(await filesUnder("src/css")).filter((file) => file.endsWith(".css")),
  "catalog/catalog.css",
];
const physical =
  /^(?:(?:min-|max-)?(?:width|height)|top|right|bottom|left|(?:margin|padding|border)-(?:top|right|bottom|left)(?:-.+)?|margin-block-(?:end|bottom))$/;
for (const path of cssFiles) {
  const root = postcss.parse(await readFile(path, "utf8"), { from: path });
  errors.push(...controlTextErrors(root, path));
  errors.push(...partNameErrors(root, path));
  const controlSelector = controlFontOwners.get(path);
  let hasControlFont = !controlSelector;
  root.walkDecls((declaration) => {
    const { prop, value } = declaration;
    if (prop.startsWith("--")) tokenDefinitions.add(prop);
    for (const match of value.matchAll(/var\((--[\w-]+)/g)) references.push([path, match[1]]);
    if (
      physical.test(prop) ||
      (prop === "margin" && value !== "0") ||
      prop === "margin-block" ||
      (prop === "padding" && value !== "0")
    )
      errors.push(`${path}: 論理プロパティ違反 ${prop}`);
    if (declaration.important) errors.push(`${path}: !importantは禁止`);
    if (["left", "right"].includes(value) && ["text-align", "float", "clear"].includes(prop))
      errors.push(`${path}: 物理方向 ${value}`);
  });
  root.walkAtRules((rule) => {
    if (["import", "scope"].includes(rule.name)) errors.push(`${path}: @${rule.name}は禁止`);
    if (rule.name === "layer" && rule.params.includes(",") && !path.endsWith("layers.css"))
      errors.push(`${path}: レイヤー順はlayers.cssのみ`);
  });
  root.walkRules((rule) => {
    if (controlSelector && rule.selectors.includes(controlSelector)) {
      hasControlFont ||= rule.nodes.some(
        (node) =>
          node.type === "decl" &&
          node.prop === "font-family" &&
          node.value === "var(--ply-control-font-family)",
      );
    }
    if (/\[aria-|\[data-(?:controller|action|[\w-]+-target)/.test(rule.selector))
      errors.push(`${path}: 動作・ARIA属性をCSSに使用`);
    if (/\.[\w-]+__|\.[\w-]+--[\w-]+/.test(rule.selector)) errors.push(`${path}: BEMは禁止`);
    let parent = rule.parent;
    let hasLayer = false;
    let nested = false;
    while (parent) {
      if (parent.type === "atrule" && parent.name === "layer") hasLayer = true;
      if (parent.type === "rule") nested = true;
      parent = parent.parent;
    }
    if (!hasLayer) errors.push(`${path}: レイヤー外の規則`);
    if (nested && rule.selectors.some((selector) => !selector.trim().startsWith("&")))
      errors.push(`${path}: ネストに&が必要`);
    let encounteredRule = false;
    for (const child of rule.nodes ?? []) {
      if (child.type === "rule" || child.type === "atrule") encounteredRule = true;
      if (encounteredRule && child.type === "decl") errors.push(`${path}: 基本宣言はネストより前`);
    }
  });
  if (!hasControlFont)
    errors.push(`${path}: ${controlSelector}は共通の--ply-control-font-familyを使用する`);
}
for (const [path, token] of references)
  if (!tokenDefinitions.has(token)) errors.push(`${path}: 未定義トークン ${token}`);
for (const path of (await filesUnder("src/hono")).filter((file) => file.endsWith(".tsx")))
  errors.push(...controlMarkupErrors(await readFile(path, "utf8"), path));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`${cssFiles.length} CSSの規約とトークン参照を確認しました。`);
