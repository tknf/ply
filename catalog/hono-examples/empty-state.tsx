import { EmptyState, ActionLink, Disclosure } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <EmptyState
      title="条件に合う記事が見つかりませんでした"
      actions={<ActionLink href="/search">条件をクリアする</ActionLink>}
    >
      <p>キーワードを短くするか、公開状態の絞り込みを外してみてください。</p>
    </EmptyState>
    <Disclosure summary="初めて使うとき" open>
      <EmptyState
        kind="start"
        title="最初の記事を書いてみましょう"
        actions={
          <ActionLink href="/example" variant="primary" shape="pill">
            記事を書く
          </ActionLink>
        }
      >
        <p>
          お知らせや日々の記録を、ここにまとめられます。途中まで書いて、下書きとして残すこともできます。
        </p>
      </EmptyState>
    </Disclosure>
    <Disclosure summary="作業が終わったとき" open>
      <EmptyState kind="complete" title="今日の確認はすべて終わりました">
        <p>新しく確認する記事が届いたら、ここに表示します。</p>
      </EmptyState>
    </Disclosure>
  </div>
);
