import {
  ActionLink,
  Disclosure,
  Field,
  Input,
  Avatar,
  Badge,
  Board,
  Card,
  DataList,
  MessageList,
  Message,
  FileItem,
  Statistic,
  Table,
  Tag,
  TaskList,
  Timeline,
  ValueList,
} from "../../src/hono";

export const AppPatterns = () => (
  <div class="catalog-review">
    <section class="catalog-specimen" data-application="mail">
      <h2>メールクライアント · 受信した内容をすばやく見分ける</h2>
      <div class="example ply-stack">
        <header class="catalog-app-heading">
          <h3>受信トレイ</h3>
          <ActionLink href="/review/mail" variant="link">
            受信トレイを開く
          </ActionLink>
        </header>
        <MessageList
          label="受信したメール"
          items={[
            {
              id: "categories",
              sender: "森 美咲",
              title: "カテゴリ案をまとめました",
              preview: "5つのカテゴリに整理してみました。",
              href: "/review/mail/categories",
              time: "10:24",
              datetime: "2026-09-15T10:24:00+09:00",
              avatar: <Avatar name="森 美咲" initials="美" tone="green" size="small" />,
              unread: true,
            },
            {
              id: "meeting",
              sender: "佐藤 健",
              title: "来週の打ち合わせについて",
              preview: "火曜日の14時からはいかがでしょうか。",
              href: "/review/mail/meeting",
              time: "9:42",
              datetime: "2026-09-15T09:42:00+09:00",
              avatar: <Avatar name="佐藤 健" initials="健" size="small" />,
              unread: true,
            },
            {
              id: "review",
              sender: "田中 遥",
              title: "公開前のチェックをお願いします",
              preview: "リンクとスマートフォンでの表示を確認します。",
              href: "/review/mail/review",
              time: "8:15",
              datetime: "2026-09-15T08:15:00+09:00",
              avatar: <Avatar name="田中 遥" initials="遥" tone="coral" size="small" />,
              unread: false,
            },
          ]}
        />
      </div>
    </section>
    <section class="catalog-specimen" data-application="crm">
      <h2>CRM · 相手の情報とやり取りの経緯を近付ける</h2>
      <div class="example ply-stack">
        <header class="catalog-app-heading">
          <h3>つむぐデザイン</h3>
          <Badge tone="info">提案を確認中</Badge>
        </header>
        <div class="ply-split">
          <ValueList
            items={[
              { label: "会社名", value: "つむぐデザイン" },
              { label: "担当者", value: "佐藤 健" },
              { label: "商談の状態", value: <Badge tone="info">提案を確認中</Badge> },
              { label: "次回の連絡", value: <time datetime="2026-09-18">9月18日</time> },
            ]}
          />
          <Timeline
            label="やり取りの履歴"
            items={[
              {
                datetime: "2026-09-15",
                time: "9月15日",
                title: "提案書を送りました",
                content: <p>対象範囲と進め方をまとめました。金曜日に感想を伺います。</p>,
              },
              { datetime: "2026-09-12", time: "9月12日", title: "最初の打ち合わせ" },
            ]}
          />
        </div>
        <Disclosure summary="連絡先を編集する">
          <div class="ply-split">
            <Field id="crm-name" label="担当者">
              {(attributes) => <Input {...attributes} value="佐藤 健" />}
            </Field>
            <Field id="crm-email" label="メールアドレス">
              {(attributes) => <Input {...attributes} type="email" value="sato@example.com" />}
            </Field>
          </div>
        </Disclosure>
      </div>
    </section>
    <section class="catalog-specimen" data-application="projects">
      <h2>プロジェクト管理 · 対象と進み具合を見渡す</h2>
      <div class="example ply-stack">
        <header class="catalog-app-heading">
          <h3>新しい利用案内の公開</h3>
          <span>9月30日まで</span>
        </header>
        <Board
          label="公開に向けた仕事"
          columns={[
            {
              title: "これから",
              count: 1,
              content: (
                <Card title="公開日を決める" footer="佐藤 健 · 9月18日まで">
                  <p>写真の準備状況を確認してから決めます。</p>
                </Card>
              ),
            },
            {
              title: "作業中",
              count: 1,
              content: (
                <Card title="利用案内を整える">
                  <TaskList
                    label="案内の準備"
                    items={[
                      { name: "pattern-text", label: "本文を確認する", checked: true },
                      { name: "pattern-photo", label: "写真を選ぶ" },
                    ]}
                  />
                </Card>
              ),
            },
            { title: "完了", count: 0, content: null },
          ]}
        />
      </div>
    </section>
    <section class="catalog-specimen" data-application="documents">
      <h2>ドキュメント管理 · 資料の識別と内容の理解を助ける</h2>
      <div class="example">
        <header class="catalog-app-heading">
          <h3>チームの資料</h3>
          <span>更新順</span>
        </header>
        <FileItem
          name="新しいメンバーのための仕事場ガイド.pdf"
          description="PDF · 2.4 MB · 田中 遥が9月15日に更新"
          href="/files"
        />
        <FileItem
          name="利用料金とキャンセル条件.xlsx"
          description="Excel · 84 KB · 佐藤 健が9月12日に更新"
          href="/files"
        />
        <DataList
          items={[
            {
              title: "ミーティングの記録",
              href: "/example",
              description: "決めたことと、次に確認することをまとめています。",
              end: <Tag label="チーム内" />,
            },
          ]}
        />
      </div>
    </section>
    <section class="catalog-specimen" data-application="finance">
      <h2>ファイナンシャルダッシュボード · 条件を揃えて数値を比べる</h2>
      <div class="example ply-stack">
        <header class="catalog-app-heading">
          <h3>9月の収支</h3>
          <span>9月15日 10:00更新</span>
        </header>
        <div class="ply-split">
          <Statistic label="売上" value="1,284,000" unit="円" note="2026年9月1日〜15日 · 税抜" />
          <Statistic label="経費" value="428,000" unit="円" note="同期間 · 確定分" />
          <Statistic label="未入金" value="0" unit="円" note="9月15日 10:00現在" />
        </div>
        <Table caption="部門別の収支">
          <thead>
            <tr>
              <th scope="col">部門</th>
              <th scope="col" data-cell="numeric">
                売上
              </th>
              <th scope="col" data-cell="numeric">
                経費
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">制作</th>
              <td data-cell="numeric">864,000円</td>
              <td data-cell="numeric">300,000円</td>
            </tr>
            <tr>
              <th scope="row">運営</th>
              <td data-cell="numeric">420,000円</td>
              <td data-cell="numeric">128,000円</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">合計</th>
              <td data-cell="numeric">1,284,000円</td>
              <td data-cell="numeric">428,000円</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </section>
    <section class="catalog-specimen" data-application="chat">
      <h2>チャット · 誰が何を話したかを読み順で伝える</h2>
      <div class="example">
        <header class="catalog-app-heading">
          <h3>利用案内の相談</h3>
          <span>田中 遥・佐藤 健</span>
        </header>
        <div class="ply-stack" data-space="small">
          <Message
            author="田中 遥"
            time="10:00"
            datetime="2026-09-15T10:00:00+09:00"
            avatar={<Avatar name="田中 遥" initials="遥" tone="coral" size="small" />}
          >
            <p>案内文を更新しました。キャンセル条件の説明を確認してもらえますか。</p>
            <FileItem name="利用案内.pdf" description="PDF · 2.4 MB" href="/files" />
          </Message>
          <Message
            author="佐藤 健"
            time="10:05"
            datetime="2026-09-15T10:05:00+09:00"
            avatar={<Avatar name="佐藤 健" initials="健" size="small" />}
            actions={
              <ActionLink href="/example" variant="link">
                案内文を開く
              </ActionLink>
            }
          >
            <p>確認しました。「前日まで」と日付が分かるので、初めての方にも伝わりそうです。</p>
          </Message>
        </div>
      </div>
    </section>
  </div>
);
