import { readFile, writeFile, mkdir } from "node:fs/promises";
const manifest = JSON.parse(await readFile("src/icon-manifest.json", "utf8"));
const symbols = [];
for (const [name, file] of Object.entries(manifest)) {
  if (!/^[a-z-]+$/.test(name) || typeof file !== "string" || !/^[a-z-]+$/.test(file))
    throw new Error("アイコン名が不正です");
  const svg = await readFile(
    `node_modules/@phosphor-icons/core/assets/bold/${file}-bold.svg`,
    "utf8",
  );
  const content = svg.match(/<svg[^>]+>([\s\S]+)<\/svg>/)?.[1];
  if (!content) throw new Error(`SVGを読み取れません: ${file}`);
  symbols.push(
    `<symbol id="ply-${name}" viewBox="0 0 256 256" fill="currentColor">${content}</symbol>`,
  );
}
const license = await readFile("node_modules/@phosphor-icons/core/LICENSE", "utf8");
const sprite = `<svg xmlns="http://www.w3.org/2000/svg">\n<!-- Phosphor Icons / MIT\n${license.replaceAll("--", "—")}-->\n${symbols.join("\n")}\n</svg>\n`;
await mkdir("public/assets", { recursive: true });
await mkdir("dist", { recursive: true });
await writeFile("public/assets/ply-icons.svg", sprite);
await writeFile("dist/icons.svg", sprite);
await writeFile("dist/PHOSPHOR-LICENSE", license);
console.log(`${symbols.length}個のPhosphorアイコンをスプライトにしました。`);

// selectの装飾はCSSから参照するため単独SVGとして配布する。
await mkdir("src/css/assets", { recursive: true });
const caret = await readFile(
  "node_modules/@phosphor-icons/core/assets/bold/caret-down-bold.svg",
  "utf8",
);
await writeFile("src/css/assets/caret-down.svg", caret);
