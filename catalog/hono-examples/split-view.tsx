import { SplitView, Section, DataList, Message } from "../../src/hono";
export default () => (
  <SplitView
    layout="reader"
    primary={
      <Section title="受信トレイ" count={1}>
        <DataList
          items={[
            {
              title: "来週の打ち合わせ",
              href: "#split-message",
              current: true,
              description: "火曜日14時からはいかがでしょうか。",
            },
          ]}
        />
      </Section>
    }
    secondary={
      <Section title="来週の打ち合わせ" id="split-message">
        <Message author="佐藤 健" time="今日 9:42" datetime="2026-09-15T09:42:00+09:00">
          <p>新しい利用案内の件、火曜日14時からお話しできればと思います。</p>
        </Message>
      </Section>
    }
  />
);
