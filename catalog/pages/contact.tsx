import { ActionLink, Avatar, ContextBar, PageHeader, Surface } from "../../src/hono";

export const ContactExample = () => (
  <Surface
    context={
      <ContextBar
        items={[{ label: "部品一覧", href: "/components" }, { label: "担当者への問い合わせ" }]}
      />
    }
  >
    <PageHeader
      title="担当者への問い合わせ"
      description="提出や受付について、案件の担当者へ確認できます。"
    />
    <section class="ply-stack" aria-labelledby="contact-person">
      <h2 id="contact-person">案件担当者</h2>
      <div class="ply-cluster">
        <Avatar name="森 美咲" initials="美" tone="green" />
        <div class="ply-stack" data-space="small">
          <strong>森 美咲</strong>
          <p>受付担当 · 平日 10:00〜17:00</p>
        </div>
      </div>
    </section>
    <section class="ply-stack" aria-labelledby="contact-method">
      <h2 id="contact-method">連絡方法</h2>
      <p>問い合わせ内容をメールに記載してお送りください。</p>
      <div>
        <ActionLink
          href="mailto:help@example.com?subject=%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B"
          variant="primary"
        >
          メールを作成する
        </ActionLink>
      </div>
      <p class="catalog-footnote">
        メールアドレスはサンプルです。この例では送信内容を保存しません。
      </p>
    </section>
  </Surface>
);
