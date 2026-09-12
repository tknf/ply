import { Disclosure } from "../../src/hono";

export default () => (
  <Disclosure summary="詳しい条件" open>
    <p>JavaScriptなしで開閉できます。</p>
    <Disclosure summary="さらに詳しく">
      <p>入れ子の補足です。</p>
    </Disclosure>
  </Disclosure>
);
