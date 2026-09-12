import { useId } from "hono/jsx";
import type { ElementProps } from "./types";
export type SwitchProps = Omit<ElementProps<"input">, "type"> & {
  label: string;
  description?: string;
};
export const Switch = ({ id, label, description, ...attributes }: SwitchProps) => {
  const generatedId = useId();
  const inputId = id ?? `ply-switch-${generatedId}`;
  const labelId = `${inputId}-label`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const describedBy =
    [attributes["aria-describedby"], descriptionId].filter(Boolean).join(" ") || undefined;

  return (
    <label class="ply-switch" for={inputId} dir={attributes.dir}>
      <input
        {...attributes}
        id={inputId}
        type="checkbox"
        role="switch"
        aria-labelledby={
          attributes["aria-labelledby"] ?? (attributes["aria-label"] ? undefined : labelId)
        }
        aria-describedby={describedBy}
      />
      <span>
        <span id={labelId}>{label}</span>
        {description && <small id={descriptionId}>{description}</small>}
      </span>
    </label>
  );
};
