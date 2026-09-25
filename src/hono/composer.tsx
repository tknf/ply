import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Field, Textarea } from "./field";
import { classes, type ElementProps } from "./types";

export type ComposerProps = Omit<ElementProps<"form">, "children"> & {
  id: string;
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  submitLabel: string;
  busy?: boolean;
  error?: string;
  attachments?: Child;
  actions?: Child;
};

/** 本文と添付、送信操作の配置。送信先と保存処理は利用側が指定する。 */
export const Composer = ({
  id,
  label,
  name,
  value,
  placeholder,
  rows = 4,
  required,
  submitLabel,
  busy = false,
  error,
  attachments,
  actions,
  class: className,
  ...attributes
}: ComposerProps) => (
  <form {...attributes} id={id} class={classes("ply-composer", className)} aria-busy={busy}>
    <Field id={`${id}-body`} label={label} error={error}>
      {(field) => (
        <Textarea {...field} name={name} rows={rows} required={required} placeholder={placeholder}>
          {value}
        </Textarea>
      )}
    </Field>
    {attachments && <div class="attachments">{attachments}</div>}
    <div class="footer">
      {actions && <div class="actions">{actions}</div>}
      <Button type="submit" variant="primary" shape="pill" busy={busy} busyLabel="送信中…">
        {submitLabel}
      </Button>
    </div>
  </form>
);
