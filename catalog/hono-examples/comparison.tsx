import { Comparison, ValueList } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <Comparison label="変更なし" changed={false} before={<p>標準</p>} after={<p>標準</p>} />
    <Comparison
      label="未登録からの追加"
      before={null}
      after={<ValueList items={[{ label: "件数", value: 0 }]} />}
    />
    <Comparison
      label="入れ子の比較"
      before={<p>現在の説明</p>}
      after={<Comparison label="補足" before={null} after={<p>補足を追加します。</p>} />}
    />
  </div>
);
