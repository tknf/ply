import { CodeBlock } from "../../src/hono";
import { codeToTokens } from "shiki";

export default async () => {
  const markup = '<link rel="stylesheet" href="/ply/components/button.css">';
  const settings =
    '{\n  "title": "秋の読書会",\n  "published": false,\n  "path": "/articles/abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789"\n}';
  const highlight = async (code: string, lang: "html" | "json") => {
    const { tokens } = await codeToTokens(code, { lang, theme: "github-light" });
    return tokens.flatMap((line, index) => [...(index ? [{ content: "\n" }] : []), ...line]);
  };
  const [htmlTokens, jsonTokens] = await Promise.all([
    highlight(markup, "html"),
    highlight(settings, "json"),
  ]);
  return (
    <div class="ply-stack">
      <CodeBlock label="CSSの読み込み" code={markup} tokens={htmlTokens} copy />
      <CodeBlock label="公開設定の例" code={settings} tokens={jsonTokens} copy />
      <CodeBlock
        label="コードはそのまま文字として表示します"
        code={'<script>alert("実行されません")</script>'}
      />
    </div>
  );
};
