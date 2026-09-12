import type { Child } from "hono/jsx";
export type TimelineProps = {
  label: string;
  items: readonly { datetime: string; time: string; title: string; content?: Child }[];
};
export const Timeline = ({ label, items }: TimelineProps) => (
  <ol class="ply-timeline" aria-label={label}>
    {items.map((item) => (
      <li>
        <time datetime={item.datetime}>{item.time}</time>
        <div>
          <strong>{item.title}</strong>
          {item.content}
        </div>
      </li>
    ))}
  </ol>
);
