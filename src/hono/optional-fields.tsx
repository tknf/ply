import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Icon, type IconName } from "./icon";
import { classes, type ElementProps } from "./types";

export type OptionalField = {
  id: string;
  label: string;
  icon?: IconName;
  /** 押した時に現れる欄。 */
  field: Child;
  /** 最初から出しておく（値が入っている時など）。 */
  open?: boolean;
};
export type OptionalFieldsProps = ElementProps<"div"> & {
  label: string;
  items: readonly OptionalField[];
  /** inlineは予定の入力のようにチップを横に並べ（既定）、stackは検索の条件のように縦に並べる。 */
  layout?: "inline" | "stack";
};

/**
 * 予定のリンク・場所・招待・メモ・繰り返しや検索の条件のように、必要な時だけ足す欄。
 * 足せる項目をチップで並べ、押すとその欄が現れてチップは消える。長いフォームを短く見せる。
 */
export const OptionalFields = ({
  label,
  items,
  layout = "inline",
  class: className,
  ...attributes
}: OptionalFieldsProps) => (
  <div
    {...attributes}
    class={classes("ply-optional-fields", className)}
    data-controller="optional-fields"
    data-layout={layout}
  >
    <div class="fields">
      {items.map((item) => (
        <div
          class="field"
          id={`${item.id}-slot`}
          hidden={!item.open}
          data-optional-fields-target="field"
        >
          {item.field}
        </div>
      ))}
    </div>
    <div class="chips" role="group" aria-label={label}>
      {items.map((item) => (
        <Button
          class="chip"
          size="compact"
          hidden={item.open}
          aria-controls={`${item.id}-slot`}
          aria-expanded="false"
          data-action="optional-fields#add"
        >
          <Icon name={item.icon ?? "plus"} />
          {item.label}
        </Button>
      ))}
    </div>
  </div>
);
