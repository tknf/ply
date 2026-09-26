import { useId } from "hono/jsx";
import { Button } from "./button";
import { Field, Input } from "./field";
import { Tag } from "./tag";

export type TagInputProps = {
  id?: string;
  label: string;
  name: string;
  values?: readonly string[];
  placeholder?: string;
  help?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  form?: string;
};

/** 自由入力のタグ。送信値はJavaScriptの有無にかかわらずカンマ区切り。 */
export const TagInput = ({
  id,
  label,
  name,
  values = [],
  placeholder = "入力してEnterで追加",
  help,
  error,
  required,
  disabled,
  form,
}: TagInputProps) => {
  const generatedId = useId();
  const controlId = id ?? `ply-tag-input-${generatedId}`;
  const tags = [
    ...new Set(
      values.map((value) => value.trim()).filter((value) => value && !value.includes(",")),
    ),
  ];
  const serialized = tags.join(", ");
  return (
    <Field id={controlId} label={label} help={help} error={error}>
      {(field) => (
        <div
          class="ply-tag-input"
          data-controller="tag-input tag-field"
          data-action="tag-input:beforeadd->tag-field#beforeAdd tag-input:add->tag-field#add tag-input:remove->tag-field#remove"
          data-tag-field-name-value={name}
          data-tag-field-required-value={required ? "true" : "false"}
        >
          <Input
            {...field}
            name={name}
            form={form}
            type="text"
            value={serialized}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            data-tag-input-target="input"
            data-tag-field-target="entry"
          />
          <ul class="chips" data-tag-field-target="list" aria-label={`${label}のタグ`} hidden>
            {tags.map((tag) => (
              <li data-tag-input-target="chip" data-tag-input-value={tag}>
                <Tag
                  label={tag}
                  removeButton={
                    <Button
                      class="remove"
                      variant="link"
                      size="tag"
                      type="button"
                      data-icon-only="true"
                      aria-label={`${tag}を解除`}
                      data-tag-input-target="remove"
                      disabled={disabled}
                    />
                  }
                />
              </li>
            ))}
          </ul>
          <template data-tag-field-target="template">
            <li data-tag-input-target="chip">
              <Tag
                label=""
                removeButton={
                  <Button
                    class="remove"
                    variant="link"
                    size="tag"
                    type="button"
                    data-icon-only="true"
                    aria-label="タグを解除"
                    data-tag-input-target="remove"
                  />
                }
              />
            </li>
          </template>
          <input
            type="hidden"
            name={name}
            form={form}
            value={serialized}
            disabled
            data-tag-field-target="serialized"
          />
          <p class="note" role="status" data-tag-field-target="note" hidden />
        </div>
      )}
    </Field>
  );
};
