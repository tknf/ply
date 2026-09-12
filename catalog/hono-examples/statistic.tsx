import { Statistic } from "../../src/hono";

export default () => (
  <div class="ply-cluster">
    <Statistic label="8月の売上" value="¥128,400" note="税込" />
    <Statistic label="注文" value="54" unit="件" />
  </div>
);
