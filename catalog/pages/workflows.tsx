import {
  Surface,
  Icon,
  ContextBar,
  PageHeader,
  Table,
  FileInput,
  FileItem,
  Button,
  Disclosure,
  DropdownMenu,
  Tabs,
} from "../../src/hono";

const reports = [
  {
    month: "8月",
    total: "¥128,400",
    count: 54,
    rows: [
      { name: "暮らしの道具と手入れの記録", count: 42, sales: "¥84,000" },
      { name: "小さな仕事場のつくり方", count: 12, sales: "¥44,400" },
      { name: "季節の便り", count: 0, sales: "¥0" },
    ],
  },
  {
    month: "7月",
    total: "¥105,700",
    count: 46,
    rows: [
      { name: "暮らしの道具と手入れの記録", count: 32, sales: "¥64,000" },
      { name: "小さな仕事場のつくり方", count: 9, sales: "¥33,300" },
      { name: "季節の便り", count: 5, sales: "¥8,400" },
    ],
  },
] as const;

export const SalesExample = () => (
  <Surface
    layout="document"
    context={<ContextBar items={[{ label: "道具箱", href: "/" }, { label: "売上" }]} />}
  >
    <PageHeader title="売上" description="2026年の商品別の売上です。" />
    <Tabs
      id="sales-period"
      label="対象月"
      items={reports.map((report) => ({
        value: report.month,
        label: report.month,
        content: (
          <div class="ply-stack">
            <dl class="catalog-sales-total">
              <div>
                <dt>{report.month}の売上</dt>
                <dd>{report.total}</dd>
              </div>
              <div>
                <dt>注文</dt>
                <dd>
                  {report.count}
                  <small>件</small>
                </dd>
              </div>
            </dl>
            <Table caption={`${report.month}の商品別内訳`}>
              <thead>
                <tr>
                  <th scope="col">商品</th>
                  <th scope="col" data-cell="numeric">
                    注文
                  </th>
                  <th scope="col" data-cell="numeric">
                    売上
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row) => (
                  <tr>
                    <th scope="row">{row.name}</th>
                    <td data-cell="numeric">{row.count}件</td>
                    <td data-cell="numeric">{row.sales}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">合計</th>
                  <td data-cell="numeric">{report.count}件</td>
                  <td data-cell="numeric">{report.total}</td>
                </tr>
              </tfoot>
            </Table>
          </div>
        ),
      }))}
    />
    <p class="catalog-footnote">表示はサンプルデータです。月を切り替えて集計を確認できます。</p>
    <noscript>
      <p class="catalog-footnote">JavaScriptが無効の場合は8月分を表示します。</p>
    </noscript>
  </Surface>
);

export const FilesExample = () => (
  <Surface
    layout="document"
    data-controller="file-preview"
    data-action="change->file-preview#select dropdown-menu:select->file-preview#inspect"
    context={
      <ContextBar items={[{ label: "道具箱", href: "/" }, { label: "ファイル" }]}>
        <DropdownMenu
          id="file-operations"
          align="end"
          label="操作"
          items={[{ label: "ファイルの情報", value: "inspect" }]}
        />
      </ContextBar>
    }
  >
    <PageHeader
      title="ファイル"
      actions={
        <Button disabled data-file-preview-target="choose" data-action="file-preview#choose">
          <Icon name="files" />
          ファイルを選ぶ
        </Button>
      }
    />
    <div class="catalog-file-list" aria-label="登録済みファイル">
      <div data-file-preview-target="current">
        <FileItem name="利用案内と申し込み手順.pdf" description="2026年9月10日 · PDF · 2.4 MB" />
      </div>
      <FileItem name="部屋の写真.jpg" description="2026年9月8日 · JPEG · 840 KB" />
      <FileItem name="料金表.pdf" description="2026年9月1日 · PDF · 180 KB" />
    </div>
    <Disclosure summary="利用案内を差し替える" data-file-preview-target="form">
      <div class="ply-stack">
        <FileInput
          id="replacement-file"
          label="差し替えるファイル"
          accept="application/pdf,image/*"
        />
        <p class="ply-save-status" role="status" data-file-preview-target="status">
          PDFか画像を選択してください。
        </p>
        <div class="ply-cluster">
          <Button
            variant="primary"
            disabled
            data-file-preview-target="apply"
            data-action="file-preview#apply"
          >
            この画面に反映
          </Button>
          <Button variant="link" data-action="file-preview#clear">
            選択を取り消す
          </Button>
        </div>
      </div>
    </Disclosure>
    <Disclosure summary="ファイル選択について">
      <p>選択したファイルの名前とサイズを、この画面で確認できます。ファイルは送信されません。</p>
    </Disclosure>
    <Disclosure summary="ファイルの情報" data-file-preview-target="information">
      <p>登録済みの3件はサンプルです。差し替えはこの画面だけに反映し、再読み込みで元に戻ります。</p>
    </Disclosure>
    <noscript>
      <p class="catalog-footnote">
        JavaScriptが無効でも「利用案内を差し替える」からファイルを選べます。表示への反映はJavaScriptが必要です。
      </p>
    </noscript>
  </Surface>
);
