import { Surface, ContextBar, PageHeader, ActionLink, Icon, Disclosure } from "../../src/hono";
export const Home = ({
  components,
}: {
  components: readonly { id: string; name: string; description: string }[];
}) => (
  <Surface
    layout="document"
    context={
      <ContextBar items={[{ label: "Ply" }, { label: "道具箱" }]}>
        <a href="#components">コンポーネントを見る</a>
      </ContextBar>
    }
  >
    <PageHeader title="仕事の道具箱" />
    <div class="catalog-tools">
      <section>
        <div class="catalog-tool-heading">
          <h2>
            <Icon name="pencil" />
            <a href="/search">記事</a>
          </h2>
          <span>6件</span>
        </div>
        <a
          class="catalog-paper"
          data-controller="draft-summary"
          href="/example"
          aria-label="日々の暮らしを、少しずつ整える 下書きを開く"
        >
          <span>下書き</span>
          <strong>日々の暮らしを、少しずつ整える</strong>
          <p>道具の選び方や、長く使い続けるための手入れについてまとめました。</p>
          <span class="catalog-paper-action">続きを書く →</span>
        </a>
        <ActionLink href="/search" variant="link">
          記事の一覧を見る
        </ActionLink>
      </section>
      <section>
        <div class="catalog-tool-heading">
          <h2>
            <Icon name="calendar" />
            <a href="/reservation" data-turbo="false">
              予約
            </a>
          </h2>
          <span>9月</span>
        </div>
        <div class="catalog-tool-preview">
          <div class="catalog-date-preview">
            <strong>
              15<small>火曜日</small>
            </strong>
            <div>
              <b>ミーティングルーム</b>
              <p>10:00から · 2人</p>
            </div>
          </div>
          <p class="catalog-footnote">日付・人数・部屋を選んで、利用条件を整えます。</p>
        </div>
        <ActionLink href="/reservation" variant="link" data-turbo="false">
          予約を受け付ける
        </ActionLink>
      </section>
      <section>
        <div class="catalog-tool-heading">
          <h2>
            <Icon name="chart" />
            <a href="/sales">売上</a>
          </h2>
          <span>8月</span>
        </div>
        <div class="catalog-tool-preview">
          <div class="catalog-sales-preview">
            <span>54件の注文</span>
            <strong>¥128,400</strong>
          </div>
          <p class="catalog-footnote">
            暮らしの道具 42件
            <br />
            小さな仕事場 12件
          </p>
        </div>
        <ActionLink href="/sales" variant="link">
          月ごとの売上を見る
        </ActionLink>
      </section>
      <section>
        <div class="catalog-tool-heading">
          <h2>
            <Icon name="files" />
            <a href="/files">ファイル</a>
          </h2>
          <span>3件</span>
        </div>
        <div class="catalog-tool-preview">
          <ul class="catalog-file-preview">
            <li>
              <strong>利用案内と申し込み手順.pdf</strong>
              <span>2.4 MB</span>
            </li>
            <li>
              <strong>部屋の写真.jpg</strong>
              <span>840 KB</span>
            </li>
            <li>
              <strong>料金表.pdf</strong>
              <span>180 KB</span>
            </li>
          </ul>
        </div>
        <ActionLink href="/files" variant="link">
          ファイルを開く
        </ActionLink>
      </section>
    </div>
    <Disclosure
      id="components"
      summary={`コンポーネントをひとつずつ見る · ${components.length}種類`}
    >
      <p>CSS・HTMLとHonoの利用例です。</p>
      <ul class="catalog-index">
        {components.map((item) => (
          <li>
            <a href={`/components/${item.id}`}>
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </Disclosure>
    <p class="catalog-footnote">Plyのデザインと操作を試すためのサンプルです。</p>
  </Surface>
);
