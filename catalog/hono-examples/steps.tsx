import { Steps } from "../../src/hono";

export default () => (
  <Steps
    label="申し込みの手順"
    items={[
      { label: "日時", state: "complete", href: "/reservation" },
      { label: "連絡先", state: "current" },
      { label: "確認", state: "upcoming" },
    ]}
  />
);
