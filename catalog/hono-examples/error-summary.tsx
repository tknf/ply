import { ErrorSummary, Field, Input, Button } from "../../src/hono";
export default () => (
  <form action="/search" method="get" class="ply-stack">
    <ErrorSummary
      id="hono-errors"
      errors={[
        { label: "記事名を入力してください", href: "#hono-error-title" },
        { label: "連絡先のメールアドレスを確認してください", href: "#hono-error-email" },
      ]}
    />
    <Field id="hono-error-title" label="記事名" error="記事名を入力してください">
      {(attributes) => <Input {...attributes} name="q" required />}
    </Field>
    <Field
      id="hono-error-email"
      label="メールアドレス"
      error="メールアドレスの形式を確認してください"
    >
      {(attributes) => <Input {...attributes} type="email" name="email" value="example" required />}
    </Field>
    <Button type="submit">入力を確認する</Button>
  </form>
);
