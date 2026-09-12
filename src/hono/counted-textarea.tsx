import { Textarea } from "./field";
import { Icon } from "./icon";
import type { ElementProps } from "./types";

export type CountedTextareaProps = ElementProps<"textarea"> & {
  id: string;
  limit: number;
  unit?: string;
  overflowMessage?: string;
};

export const CountedTextarea = ({
  id,
  limit,
  unit = "characters",
  overflowMessage = "文字数の上限を超えています。",
  children,
  ...attributes
}: CountedTextareaProps) => (
  <div
    class="ply-character-count"
    data-controller="character-count"
    data-character-count-max-value={limit}
  >
    <Textarea {...attributes} id={id} data-character-count-target="field">
      {children}
    </Textarea>
    <div class="ply-field-messages">
      <p class="ply-count-output" id={`${id}-count`} data-character-count-target="counter">
        {" "}
        {unit}
      </p>
      <p class="ply-field-error ply-count-error">
        <Icon name="x-circle" />
        <span>{overflowMessage}</span>
      </p>
    </div>
  </div>
);
