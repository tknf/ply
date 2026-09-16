import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export const DisclosureGroup = ({
  children,
  label,
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"div"> & { label: string }>) => (
  <div
    {...attributes}
    class={classes("ply-disclosure-group", className)}
    role="group"
    aria-label={label}
  >
    {children}
  </div>
);

/** 基本の開閉はdetails/summaryだけで動く。controller登録は不要。 */
export const Disclosure = ({
  children,
  summary,
  description,
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"details"> & { summary: string; description?: string }>) => (
  <details {...attributes} class={classes("ply-disclosure", className)}>
    <summary>
      <span class="marker" aria-hidden="true">
        <Icon name="caret" />
      </span>
      <span class="label">
        <span class="title">{summary}</span>
        {description && <span class="description">{description}</span>}
      </span>
    </summary>
    <div class="body">{children}</div>
  </details>
);
