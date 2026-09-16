import {
  Board,
  Choice,
  Tag,
  TagGroup,
  FileItem,
  Avatar,
  Disclosure,
  ValueList,
} from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <Board
      label="制作の進行"
      movable
      columns={[
        {
          id: "todo",
          title: "これから",
          items: [
            {
              id: "guide",
              label: "仕事場の案内を更新する",
              content: (
                <>
                  <h4>仕事場の案内を更新する</h4>
                  <p>料金とキャンセル条件を確認します。</p>
                  <TagGroup label="分類">
                    <Tag label="案内" />
                    <Tag label="Web" />
                  </TagGroup>
                </>
              ),
            },
            {
              id: "estimate",
              label: "見積内容の確認",
              content: (
                <>
                  <h4>見積内容の確認</h4>
                  <Choice label="見積金額を確認" />
                  <ValueList
                    items={[
                      { label: "金額", value: "128,000円" },
                      { label: "回答期限", value: "9月22日" },
                    ]}
                  />
                </>
              ),
            },
          ],
        },
        {
          id: "doing",
          title: "作業中",
          tone: "info",
          items: [
            {
              id: "reading",
              label: "秋の読書会のお知らせ",
              content: (
                <>
                  <h4>秋の読書会のお知らせ</h4>
                  <p>
                    <Avatar name="田中 遥" initials="遥" size="inline" /> 田中 遥 · 9月20日
                  </p>
                </>
              ),
            },
            {
              id: "document",
              label: "仕事場の案内.pdf",
              content: <FileItem name="仕事場の案内.pdf" description="PDF · 2.4 MB" />,
            },
          ],
        },
        { id: "done", title: "完了", tone: "success", items: [], empty: "終わった項目をここへ" },
      ]}
    />
    <p class="catalog-footnote">
      右上の持ち手で移動します。Space → 矢印キー → Enterでも操作できます。Escapeで元へ戻します。
    </p>
    <Disclosure summary="移動不可の項目・長文・空の列">
      <Board
        label="確認の進行"
        movable
        columns={[
          {
            id: "waiting",
            title: "確認待ち",
            items: [
              {
                id: "locked",
                label: "確認が完了した資料",
                disabled: true,
                content: (
                  <>
                    <h4>確認が完了した資料</h4>
                    <p>この項目は移動できません。</p>
                  </>
                ),
              },
              {
                id: "long",
                label: "海外拠点から届いた長い名前の資料",
                content: (
                  <>
                    <h4>海外拠点から届いた、2026年度秋の利用方法と受付変更に関する詳しい資料</h4>
                    <p>review-abcdefghijklmnopqrstuvwxyz0123456789</p>
                  </>
                ),
              },
            ],
          },
          { id: "review", title: "レビュー", items: [] },
          {
            id: "locked-column",
            title: "受付終了",
            disabled: true,
            items: [],
            empty: "この列へは移動できません",
          },
        ]}
      />
    </Disclosure>
  </div>
);
