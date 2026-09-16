import { Icon } from "./icon";

export type StepsProps = {
  label: string;
  items: readonly { label: string; state: "complete" | "current" | "upcoming"; href?: string }[];
};
export const Steps = ({ label, items }: StepsProps) => (
  <ol class="ply-steps" aria-label={label}>
    {items.map((item, index) => (
      <li data-state={item.state} aria-current={item.state === "current" ? "step" : undefined}>
        <span class="number" aria-hidden="true">
          {item.state === "complete" ? <Icon name="check" /> : index + 1}
        </span>
        <span>
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          <small>
            {item.state === "complete" ? "完了" : item.state === "current" ? "入力中" : "未入力"}
          </small>
        </span>
      </li>
    ))}
  </ol>
);
