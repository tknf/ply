import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import ts from "typescript";

const rationale = JSON.parse(await readFile("design/spacing-rationale.json", "utf8"));
const files = (await readdir("src/css", { recursive: true }))
  .filter((file) => file.endsWith(".css"))
  .map((file) => path.join("src/css", file))
  .sort();
files.push("catalog/catalog.css");
const escape = (value) => String(value).replaceAll("|", "&#124;").replaceAll("\n", " ");
const spaceTokens = new Map();
postcss.parse(await readFile("src/css/tokens.css", "utf8")).walkDecls((declaration) => {
  if (declaration.prop.startsWith("--ply-space-"))
    spaceTokens.set(declaration.prop, declaration.value);
});
const converted = (value) =>
  value
    .replace(/var\((--ply-space-[\d]+)\)/g, (whole, token) => spaceTokens.get(token) ?? whole)
    .replace(/(-?\d*\.?\d+)rem\b/g, (_, number) => Number((Number(number) * 16).toFixed(4)) + "px");
let total = 0;
const sections = [];
for (const file of files) {
  const name = path.basename(file, ".css");
  if (typeof rationale[name] !== "string") throw new Error("採用理由がありません: " + name);
  const root = postcss.parse(await readFile(file, "utf8"));
  const rows = [];
  root.walkDecls((declaration) => {
    if (
      !/^(?:(?:row-|column-)?gap$|(?:scroll-)?(?:margin|padding)(?:-|$)|border-spacing$|inset(?:-|$))/.test(
        declaration.prop,
      )
    )
      return;
    const selectors = [],
      conditions = [];
    for (let parent = declaration.parent; parent; parent = parent.parent) {
      if (parent.type === "rule") selectors.unshift(parent.selector);
      if (parent.type === "atrule" && parent.name !== "layer")
        conditions.unshift("@" + parent.name + " " + parent.params);
    }
    const line = declaration.source?.start?.line ?? 1;
    const reason =
      declaration.value === "0"
        ? "この位置では余白を足さない。上記の所有範囲に従う。"
        : declaration.value.includes("auto")
          ? "可変の残り幅を配置へ使う。固定間隔ではない。"
          : declaration.prop.startsWith("inset")
            ? "通常フローの余白ではなく、固定・絶対配置の端からの距離。"
            : declaration.value.includes("1lh")
              ? "最初の行の高さと印の高さの差から揃える。"
              : declaration.value.includes("em") && !declaration.value.includes("rem")
                ? "文字サイズまたは行高に追従する比率。式を保持する。"
                : declaration.prop.includes("gap")
                  ? "並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。"
                  : declaration.prop.includes("padding")
                    ? "この要素自身の内側。上記の領域・操作高・境界の計算を適用。"
                    : "前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。";
    rows.push(
      "| [L" +
        line +
        "](../" +
        file +
        "#L" +
        line +
        ") | `" +
        escape(selectors.join(" → ")) +
        "` | " +
        (escape(conditions.join(" / ")) || "常時") +
        " | `" +
        declaration.prop +
        ": " +
        escape(declaration.value) +
        "` | `" +
        escape(converted(declaration.value)) +
        "` | " +
        reason +
        " |",
    );
  });
  total += rows.length;
  sections.push(
    "## " +
      name +
      "\n\n" +
      rationale[name] +
      "\n\n対象: [" +
      file +
      "](../" +
      file +
      ")\n\n" +
      (rows.length
        ? "| ソース | セレクタの階層 | 条件 | 宣言値 | root 16pxでremを換算 | 値の扱い |\n| --- | --- | --- | --- | --- | --- |\n" +
          rows.join("\n")
        : "gap・margin・padding・insetの宣言はありません。"),
  );
}
const layoutRows = [];
for (const name of (await readdir("catalog/hono-examples"))
  .filter((name) => name.endsWith(".tsx"))
  .sort()) {
  const file = "catalog/hono-examples/" + name;
  const source = await readFile(file, "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
      const className = attributes.find((attribute) => attribute.name.getText(tree) === "class");
      if (className?.initializer && ts.isStringLiteral(className.initializer)) {
        const used = className.initializer.text
          .split(/\s+/)
          .filter((value) =>
            /^ply-(?:stack|cluster|split|form|workspace|container|fields-inline|form-actions|reading-pane|measure|workbar)$/.test(
              value,
            ),
          );
        if (used.length) {
          const size = attributes.find(
            (attribute) => attribute.name.getText(tree) === "data-space",
          );
          const variant =
            size?.initializer && ts.isStringLiteral(size.initializer)
              ? size.initializer.text
              : "default";
          const line = tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
          layoutRows.push(
            "| [" +
              name +
              ":" +
              line +
              "](../" +
              file +
              "#L" +
              line +
              ") | `" +
              used.join(" ") +
              "` | `" +
              variant +
              "` | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |",
          );
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
}
const header =
  "# 全コンポーネントの余白と採用基準\n\n" +
  "ユーザーの9月15日夜の指摘に対応した現行ソースの棚卸しです。以前の値には採用理由の記録が不足していました。過去にこの理由で決めたと遡って断定せず、今回、残す値・直す値の判断基準を明文化しています。\n\n" +
  "## 読み方と対象\n\n" +
  "- 全" +
  files.length +
  " CSSファイルのgap、row-gap、column-gap、margin、padding、scroll-margin、scroll-padding、border-spacing、insetを抽出しました。該当宣言は" +
  total +
  "件です。省略した状態別・メディア・コンテナ条件はありません。\n" +
  "- CSSの生の宣言、ネストしたセレクタの階層、条件、ソース位置を掲載します。→は親ルールから子ルールへの経路であり、結合済みCSSセレクタではありません。\n" +
  "- 換算はroot 16pxのremだけです。emはその要素の文字サイズ、lhはその要素の行高、%は包含ブロック、autoは残り幅に依存します。条件外の値や文字拡大時まで同じpxと断定しません。gap二値は縦・横、論理padding二値は開始・終了の順です。\n" +
  "- 同じ要素の状態別上書きを足し合わせないでください。最終値はレイヤー・詳細度・条件・記述順で決まります。0も、追加しない判断として全件掲載します。\n" +
  "- Field配下のInput、Textarea、Select、Choice、PasswordField、CountedTextarea、Combobox、CheckboxGroup、NumberField、DateField、TimeFieldはfield.cssとそれぞれの追加CSSの節に含みます。\n" +
  "- 4pxは直近の補足、6pxは入力ラベル/タグの横、8pxは同じ操作・同じ行、12pxは小さな枠の内側、16pxは異なる役割、20pxはカードの左右、24pxは章、32pxはフォーム群、48pxは大区分。例外の文字比率・境界差分は各部品で説明します。これは観測から導いた自然法則ではなくPlyの設計判断です。\n" +
  "- 余白を持つ親はGrid/Flexのgap、文章の前後関係はmargin-block-start、部品自身の内側はpaddingを所有します。違う軸で同じ値を使うこと自体は目的にしません。\n\n" +
  "## CSS外の配置計算\n\n" +
  "DropdownMenu・DatePickerの位置計算は起点から4px、画面端から8pxを確保します。[menuPosition](../src/controllers/dropdown-menu-position.ts)を共用します。PopoverのCSSアンカーの4pxとフォールバックも同じ基準です。Boardのドラッグ表示は指・ポインターを隠さないため12pxずらします。32pxの端判定・1フレーム10pxのスクロールは操作の閾値と速度であり、レイアウトgapではありません。\n\n" +
  "生成: `vp run docs:spacing`。宣言を変更したら再生成します。\n\n";
const result =
  header +
  sections.join("\n\n") +
  "\n\n## カタログ例に重なる配置の余白\n\n" +
  "部品のCSSだけでなく、この配置も見た目へ加算されます。TagにはTagGroup、連続DisclosureにはDisclosureGroupを使います。汎用Stack/Clusterを使う例は以下の全箇所です。\n\n| ソース | 配置 | data-space | 所有元 |\n| --- | --- | --- | --- |\n" +
  layoutRows.join("\n") +
  "\n";
await writeFile("docs/spacing-audit.md", result);
console.log(
  files.length + " CSS、" + total + "宣言、" + layoutRows.length + "箇所の配置を記録しました。",
);
