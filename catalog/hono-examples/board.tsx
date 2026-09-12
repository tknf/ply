import { Board } from "../../src/hono";

export default () => (
  <Board
    label="制作の進行"
    columns={[
      { title: "これから", count: 1, content: <p>案内ページを書く</p> },
      { title: "作業中", count: 1, content: <p>写真を選ぶ</p> },
      { title: "完了", count: 0, content: <p>完了した仕事はありません。</p> },
    ]}
  />
);
