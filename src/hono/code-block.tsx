export const CodeBlock = ({ code, label }: { code: string; label: string }) => (
  <figure class="ply-code-block">
    <figcaption>{label}</figcaption>
    <pre tabindex={0}>
      <code>{code}</code>
    </pre>
  </figure>
);
