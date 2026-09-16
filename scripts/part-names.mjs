// 全コンポーネントで、独立したルートと局所の役割名を区別する。
const rootsByFile = {
  field: [
    "field",
    "field-group",
    "input",
    "choice",
    "choice-group",
    "password",
    "character-count",
    "combobox",
    "date-picker",
  ],
  "dropdown-menu": ["dropdown-menu", "menu"],
};

export const partNameErrors = (root, path) => {
  const component = path.match(/^src\/css\/components\/([\w-]+)\.css$/)?.[1];
  if (!component) return [];
  const roots = rootsByFile[component] ?? [component];
  const errors = [];
  root.walkRules((rule) => {
    const parents = [];
    for (let parent = rule; parent; parent = parent.parent)
      if (parent.type === "rule") parents.unshift(parent.selector);
    const context = parents.join(" ");
    const fail = (message) =>
      errors.push(`${path}:${rule.source?.start?.line ?? 1}: 部品名: ${message}`);
    if (
      [...rule.selector.matchAll(/\.ply-([\w-]+)/g)].some(
        (match) =>
          roots.some((owner) => match[1].startsWith(`${owner}-`)) && !roots.includes(match[1]),
      )
    )
      fail("内部のクラス名に親の部品名を繰り返さず、役割名を使う");
    if (
      /\.(?!ply-)[a-z][\w-]*/.test(rule.selector) &&
      !roots.some((name) => context.includes(`.ply-${name}`))
    )
      fail("局所クラスは部品のルートから限定する");
    if (/(?:&|\.[\w-]+|\])\s+\.[\w-]+/.test(rule.selector))
      fail("入れ子の部品へ漏れないよう、局所クラスは直下の関係で指定する");
  });
  return errors;
};
