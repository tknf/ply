import type { Child } from "hono/jsx";

export type TableOfContentsSection = {
  id: string;
  title: string;
  level?: 2 | 3;
  content: Child;
};

export type TableOfContentsProps = {
  label: string;
  sections: readonly TableOfContentsSection[];
  offset?: number;
};

/** 長い資料の見出しとページ内リンクを一緒に描画する。 */
export const TableOfContents = ({ label, sections, offset = 80 }: TableOfContentsProps) => {
  let chapter = 0;
  let subsection = 0;
  const links = sections.map((section) => {
    const level = section.level === 3 && chapter > 0 ? 3 : 2;
    if (level === 3) {
      subsection += 1;
      return { section, level, number: `${chapter}.${subsection}` };
    }
    chapter += 1;
    subsection = 0;
    return { section, level, number: String(chapter) };
  });
  return (
    <div
      class="ply-table-of-contents"
      data-controller="table-of-contents"
      data-table-of-contents-offset-value={Number.isFinite(offset) && offset >= 0 ? offset : 80}
    >
      <nav aria-label={label} data-table-of-contents-target="nav">
        <p class="heading">{label}</p>
        <ol>
          {links.map(({ section, level, number }) => (
            <li data-level={level}>
              <a href={`#${section.id}`} data-table-of-contents-target="link">
                <span class="number" aria-hidden="true">
                  {number}
                </span>
                <span class="title">{section.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div class="body">
        {links.map(({ section, level }) => (
          <section data-level={level}>
            {level === 3 ? (
              <h3 id={section.id} data-table-of-contents-target="heading">
                {section.title}
              </h3>
            ) : (
              <h2 id={section.id} data-table-of-contents-target="heading">
                {section.title}
              </h2>
            )}
            <div class="content">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
};
