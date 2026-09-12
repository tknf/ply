import type { JSX } from "hono/jsx";

/** Honoの標準HTML属性を保持する。イベントの実行は利用側のcontrollerが担う。 */
export type ElementProps<Tag extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[Tag];
export type Tone = "neutral" | "info" | "success" | "warning" | "danger";
export type ButtonVariant = "primary" | "secondary" | "danger" | "link";

/** 利用側の配置クラスは残し、部品のルートクラスを必ず付ける。 */
export const classes = (
  base: string,
  extra?: string | Promise<string>,
): string | Promise<string> => {
  if (extra instanceof Promise) return extra.then((value) => (value ? `${base} ${value}` : base));
  return extra ? `${base} ${extra}` : base;
};
