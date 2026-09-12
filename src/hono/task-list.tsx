export type TaskListProps = {
  label: string;
  items: readonly {
    name: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    detail?: string;
  }[];
};
export const TaskList = ({ label, items }: TaskListProps) => (
  <ul class="ply-task-list" aria-label={label}>
    {items.map((item) => (
      <li>
        <label class="ply-choice">
          <input type="checkbox" name={item.name} checked={item.checked} disabled={item.disabled} />
          <span>
            <strong>{item.label}</strong>
            {item.detail && <small>{item.detail}</small>}
          </span>
        </label>
      </li>
    ))}
  </ul>
);
