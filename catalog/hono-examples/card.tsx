import { Card, Badge, Button, ActionLink, Disclosure } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <div class="ply-split">
      <Card title="仕事場の案内を更新する" href="/example" footer={<span>田中 遥 · 9月15日</span>}>
        <p>利用時間とキャンセル条件を見直します。</p>
        <Badge tone="info">確認待ち</Badge>
      </Card>
      <Card title="秋の読書会" href="/reservation" footer={<span>9月25日 18:00 · あと4席</span>}>
        <p>最近読んだ本を一冊持ち寄って、小さな感想を交換する会です。</p>
        <Badge tone="success">受付中</Badge>
      </Card>
    </div>
    <Disclosure summary="複数段落・内側の操作・長い見出し">
      <Card
        title="初めて利用する方に向けた仕事場の予約方法と当日の受付についてのご案内"
        href="/example"
        footer={
          <div class="ply-cluster">
            <ActionLink href="/example">編集する</ActionLink>
            <Button disabled>公開する</Button>
          </div>
        }
      >
        <p>予約内容を確認してから、受付へお越しください。</p>
        <p>公開前に担当者の確認が必要です。内側の操作は見出しリンクと独立しています。</p>
      </Card>
    </Disclosure>
  </div>
);
