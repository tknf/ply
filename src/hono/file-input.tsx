import { useId } from "hono/jsx";
import { Button } from "./button";
import { Field, Input } from "./field";
import { FileItem } from "./file-item";
import { Icon } from "./icon";
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
          {/*
            標準のボタンの文言はページではなくブラウザの言語で決まるため、ラベルを共通Buttonの見た目で置く。
            操作とフォーカスは標準入力が持ち、JavaScriptが無効な時は標準入力をそのまま表示する。
          */}
          <span class="symbol" aria-hidden="true">
            <Icon name="attach" />
          </span>
          <p class="hint" data-file-input-target="hint" hidden>
            ここにファイルをドロップ
          </p>
          <label
            class="ply-button choose"
            for={inputId}
            data-variant="link"
            data-size="default"
            aria-hidden="true"
          >
            ファイルを選択
          </label>
          <ul
            class="files"
            aria-label={`${label}で選択したファイル`}
            role="list"
            data-file-input-target="files"
            hidden
          />
          {/* 選んだファイルの行はFileItemの形。controllerがこの型を複製し、名前と大きさを入れる。 */}
          <template data-file-input-target="template">
            <li>
              <FileItem name="" description="" />
            </li>
          </template>
          <Button
            class="clear"
            variant="link"
            size="compact"
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
