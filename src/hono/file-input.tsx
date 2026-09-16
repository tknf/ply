import { useId } from "hono/jsx";
import { Button } from "./button";
import { Field, Input } from "./field";
import type { ElementProps } from "./types";

export type FileInputProps = Omit<
  ElementProps<"input">,
  "type" | "value" | "readonly" | "children"
> & {
  label: string;
  help?: string;
  error?: string;
};

export const FileInput = ({
  id,
  label,
  help,
  error,
  "aria-describedby": describedBy,
  ...attributes
}: FileInputProps) => {
  const generatedId = useId();
  const inputId = id ?? `ply-file-input-${generatedId}`;
  return (
    <Field id={inputId} label={label} help={help} error={error} describedBy={describedBy}>
      {(field) => (
        <div class="ply-file-input" data-controller="file-input" dir={attributes.dir}>
          <Input
            {...attributes}
            {...field}
            aria-invalid={field["aria-invalid"] ?? attributes["aria-invalid"]}
            data-invalid={field["data-invalid"] ?? attributes["data-invalid"]}
            type="file"
            data-file-input-target="input"
          />
          <p class="hint" data-file-input-target="hint" hidden>
            ここにファイルをドロップすることもできます。
          </p>
          <ul
            class="files"
            aria-label={`${label}で選択したファイル`}
            role="list"
            data-file-input-target="files"
            hidden
          />
          <Button
            type="button"
            disabled={attributes.disabled}
            data-file-input-target="clear"
            data-action="file-input#clear"
            hidden
          >
            選択を解除
          </Button>
          <p class="status" role="status" data-file-input-target="status" />
        </div>
      )}
    </Field>
  );
};
