import {
  Surface,
  ContextBar,
  PageHeader,
  Button,
  Field,
  Textarea,
  Disclosure,
  Icon,
} from "../../src/hono";
import { articleFor } from "../data/articles";
export const Editor = ({ id, mode = "write" }: { id?: string; mode?: "write" | "compare" }) => {
  const article = articleFor(id);
  return (
    <Surface
      layout="document"
      data-controller="draft"
      data-initial-mode={mode}
      data-action="input->draft#change submit->draft#save keydown->draft#shortcut resize@window->draft#fit turbo:before-cache@document->draft#beforeCache turbo:before-visit@document->draft#leave beforeunload@window->draft#unload"
      context={
        <ContextBar
          items={[
            { label: "道具箱", href: "/" },
            { label: "記事", href: "/search" },
            { label: "下書き" },
          ]}
        />
      }
    >
      <PageHeader
        title="記事を書く"
        actions={
          <Button
            variant="primary"
            form="article-editor"
            type="submit"
            disabled
            data-draft-target="save"
          >
            <Icon name="check" />
            下書きを保存
          </Button>
        }
      />
      <div class="ply-workbar">
        <div class="ply-mode-switch" aria-label="記事の表示" data-draft-target="controls" hidden>
          <Button
            aria-pressed="true"
            data-current="true"
            data-draft-target="writeButton"
            data-action="draft#write"
          >
            書く
          </Button>
          <Button aria-pressed="false" data-draft-target="readButton" data-action="draft#read">
            読み返す
          </Button>
          <Button
            aria-pressed="false"
            data-draft-target="compareButton"
            data-action="draft#compare"
          >
            変更を確認
          </Button>
        </div>
        <span class="ply-save-status" role="status" data-draft-target="status">
          未保存
        </span>
      </div>
      <form
        id="article-editor"
        class="ply-writing"
        data-draft-target="form"
        data-action="invalid->draft#invalid:capture"
      >
        <div class="ply-writing-page" data-draft-target="fields">
          <label class="ply-writing-label" for="article-title">
            記事名
          </label>
          <Textarea
            id="article-title"
            name="title"
            data-kind="title"
            rows={1}
            required
            maxlength={160}
            placeholder="記事のタイトル"
          >
            {article.title}
          </Textarea>
          <label class="ply-writing-label" for="article-body">
            本文
          </label>
          <Textarea
            id="article-body"
            name="body"
            data-kind="body"
            rows={6}
            placeholder="ここから、書き始めましょう。"
          >
            {article.body}
          </Textarea>
        </div>
        <article
          class="ply-reading"
          data-draft-target="preview"
          tabindex={-1}
          aria-label="入力内容のプレビュー"
          hidden
        >
          <p class="ply-writing-label" data-draft-target="previewCategory" />
          <h2 data-draft-target="previewTitle" />
          <div class="ply-reading-body" data-draft-target="previewBody" />
        </article>
        <section
          class="ply-review"
          data-draft-target="comparison"
          tabindex={-1}
          aria-label="保存前後の比較"
          hidden
        >
          <p class="ply-writing-label" data-draft-target="comparisonStatus" />
          <div class="ply-review-pair">
            <section>
              <h2 data-draft-target="beforeLabel">前回の保存</h2>
              <h3 data-draft-target="beforeTitle" />
              <p data-draft-target="beforeCategory" />
              <div data-draft-target="beforeBody" />
            </section>
            <section>
              <h2>いまの内容</h2>
              <h3 data-draft-target="afterTitle" />
              <p data-draft-target="afterCategory" />
              <div data-draft-target="afterBody" />
            </section>
          </div>
        </section>
        <div class="ply-writing-foot">
          <span data-draft-target="count">{article.body.length}文字</span>
          <Button variant="link" disabled data-draft-target="restore" data-action="draft#restore">
            保存時に戻す
          </Button>
        </div>
        <Disclosure summary="記事の設定">
          <Field id="article-category" label="カテゴリー">
            {(attributes) => (
              <select {...attributes} class="ply-input" name="category">
                {["暮らしのヒント", "仕事のこと", "お知らせ"].map((category) => (
                  <option selected={category === article.category}>{category}</option>
                ))}
              </select>
            )}
          </Field>
        </Disclosure>
      </form>
      <p class="catalog-footnote">下書きはこのブラウザに保存されます。公開はされません。</p>
      <p class="catalog-footnote" data-draft-target="fallback">
        入力と設定の開閉は利用できます。下書きの保存・読み返しにはJavaScriptを有効にしてください。
      </p>
    </Surface>
  );
};
