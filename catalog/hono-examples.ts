import type { Child } from "hono/jsx";

const modules = import.meta.glob<{ default: () => Child }>("./hono-examples/*.tsx", {
  eager: true,
});
const sources = import.meta.glob<string>("./hono-examples/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

// 描画するコード自体を掲載し、展示とコピー用コードのずれを防ぐ。
export const getHonoExample = (id: string) => {
  const path = `./hono-examples/${id}.tsx`;
  const example = modules[path];
  const source = sources[path];
  if (!example || !source) throw new Error(`Hono利用例がありません: ${id}`);
  return { render: example.default, source: source.replace('"../../src/hono"', '"ply/hono"') };
};
