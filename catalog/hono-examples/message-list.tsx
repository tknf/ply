import { MessageList, Avatar, Disclosure, DisclosureGroup } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <MessageList
      label="受信した連絡"
      items={[
        {
          id: "sample-categories",
          sender: "森 美咲",
          title: "カテゴリ案をまとめました",
          preview: "5つのカテゴリに整理しました。実際の記事を入れて試してみませんか。",
          href: "/review/mail/categories",
          time: "10:24",
          datetime: "2026-09-15T10:24:00+09:00",
          unread: true,
          threadCount: 4,
          attachments: 2,
          avatar: <Avatar name="森 美咲" initials="美" tone="green" size="small" />,
        },
        {
          id: "sample-meeting",
          sender: "佐藤 健",
          title: "来週の打ち合わせについて",
          preview: "火曜日14時からはいかがでしょうか。",
          href: "/review/mail/meeting",
          time: "9:42",
          datetime: "2026-09-15T09:42:00+09:00",
          avatar: <Avatar name="佐藤 健" initials="健" tone="blue" size="small" />,
        },
      ]}
    />
    <DisclosureGroup label="内容と状態の違い">
      <Disclosure summary="長文・欠損・添付のみ・画像の有無が混在" open>
        <MessageList
          label="長い内容と不足する情報"
          items={[
            {
              id: "long-message",
              sender: "株式会社とても長い名前の制作会社・海外事業部／山田",
              title:
                "Re: Re: 来年度の共同プロジェクトについて、担当窓口と申請時に必要な資料をまとめました",
              preview:
                "https://example.com/documents/abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789",
              href: "/review/mail/categories",
              time: "2026/09/15 10:24",
              datetime: "2026-09-15T10:24:00+09:00",
              threadCount: 128,
              unread: true,
              avatar: <Avatar name="山田" initials="山" size="small" />,
            },
            {
              id: "no-subject",
              sender: "",
              title: "",
              href: "/review/mail/meeting",
              attachments: 12,
              time: "昨日",
            },
            {
              id: "attachment-only",
              sender: "資料窓口",
              title: "確認用の添付資料",
              href: "/review/mail/categories",
              attachments: 1,
              time: "9/12",
            },
            {
              id: "unicode",
              sender: "ليلى / Léa / 🙂",
              title: "確認してください 👩‍💻 Meeting at 東京",
              preview: "本文の日本語・English・العربيةが混在します。",
              href: "/review/mail/meeting",
              time: "9/11",
            },
          ]}
        />
      </Disclosure>
      <Disclosure summary="下書き・送信中・送信失敗・閲覧できない項目">
        <MessageList
          label="送信と閲覧の状態"
          items={[
            {
              id: "draft",
              sender: "自分",
              title: "来週の打ち合わせ",
              state: "draft",
              href: "/review/mail/meeting",
              preview: "途中まで書いた内容です。",
            },
            {
              id: "sending",
              sender: "自分",
              title: "資料を送ります",
              state: "sending",
              href: "/review/mail/categories",
              attachments: 2,
            },
            {
              id: "failed",
              sender: "自分",
              title: "請求内容の確認",
              state: "failed",
              href: "/review/mail/categories",
              preview: "本文は保存されています。",
              current: true,
            },
            {
              id: "unavailable",
              sender: "担当者",
              title: "共有が終了した連絡",
              unavailableReason: "この連絡を閲覧する権限がありません。",
              time: "9/10",
            },
          ]}
        />
      </Disclosure>
      <Disclosure summary="0件・読み込み中・読み込み失敗">
        <MessageList label="0件の受信一覧" items={[]} />
        <MessageList label="読み込み中の受信一覧" items={[]} state="loading" />
        <MessageList
          label="読み込み失敗の受信一覧"
          items={[]}
          state="error"
          stateContent={<p>連絡を読み込めませんでした。ページを再読み込みしてください。</p>}
        />
      </Disclosure>
    </DisclosureGroup>
  </div>
);
