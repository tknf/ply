import { Disclosure, Tree } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <Tree
      id="document-tree"
      label="資料"
      value="guide"
      expanded={["guide"]}
      items={[
        {
          value: "guide",
          label: "利用案内",
          children: [
            { value: "start", label: "はじめに" },
            { value: "account", label: "アカウント" },
          ],
        },
        { value: "rules", label: "運用規約" },
      ]}
    />
    <Disclosure summary="空・重複値のある資料">
      <Tree label="空の資料" items={[]} />
      <Tree
        label="重複値のある資料"
        items={[
          { value: "guide", label: "案内", children: [{ value: "start", label: "はじめに" }] },
          {
            value: "rules",
            label: "規約",
            children: [
              { value: "start", label: "重複した項目" },
              { value: "policy", label: "運用方針" },
            ],
          },
          { value: "guide", label: "重複した案内" },
        ]}
      />
    </Disclosure>
  </div>
);
