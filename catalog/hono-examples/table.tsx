import { Table, Badge } from "../../src/hono";

export default () => (
  <Table caption="日時・欠損・長文を含む一覧">
    <thead>
      <tr>
        <th scope="col">名前</th>
        <th scope="col">日時</th>
        <th scope="col">状態</th>
        <th scope="col" data-cell="numeric">
          件数
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" data-cell="text">
          長い名前の対象を省略せず確認するための例
        </th>
        <td data-cell="short">
          <time datetime="2026-09-09T10:00:00+09:00">2026/09/09 10:00</time>
        </td>
        <td>
          <Badge>未設定</Badge>
        </td>
        <td data-cell="numeric">0</td>
      </tr>
    </tbody>
  </Table>
);
