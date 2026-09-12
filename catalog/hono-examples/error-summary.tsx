import { ErrorSummary } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <ErrorSummary errors={[{ label: "記事名を入力してください", href: "#hono-error-title" }]} />
    <label class="ply-field" for="hono-error-title">
      記事名
      <input id="hono-error-title" class="ply-input" aria-invalid="true" data-invalid="true" />
    </label>
  </div>
);
