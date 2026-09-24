import { SplitView, Section, Tag } from "../../src/hono";
export default () => (
  <SplitView
    layout="inspector"
    resizable
    primary={
      <Section title="公開案内の原稿">
        <p>新しい利用案内を公開します。本文、リンク先、添付資料を確認してください。</p>
        <p>内容を確定した後、公開日時を設定します。</p>
      </Section>
    }
    secondary={
      <Section title="確認状況">
        <div class="ply-cluster">
          <Tag label="確認中" accent="amber" />
          <span>担当：田中 遥</span>
        </div>
        <p>添付資料：2件</p>
      </Section>
    }
  />
);
