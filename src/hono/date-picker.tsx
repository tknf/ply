import { useId } from "hono/jsx";
import type { DatePickerSelection, DatePickerBoundReference } from "../internal/date-picker";
import { formatSelection } from "../internal/date-picker";
import { Field, Input, Select } from "./field";
import { Icon } from "./icon";
import { Switch } from "./switch";
import { classes, type ElementProps } from "./types";

export type { DatePickerSelection, DatePickerBoundReference } from "../internal/date-picker";
export type DatePickerProps = Omit<ElementProps<"fieldset">, "children" | "name"> & {
  label: string;
  min?: string;
  max?: string;
  minFrom?: string | DatePickerBoundReference;
  maxFrom?: string | DatePickerBoundReference;
  required?: boolean;
  readonly?: boolean;
  help?: string;
} & (
    | {
        mode?: "single";
        name: string;
        value?: string;
        startName?: never;
        endName?: never;
        kindName?: never;
        selection?: never;
        start?: never;
        end?: never;
      }
    | {
        mode: "range";
        startName: string;
        endName: string;
        start?: string;
        end?: string;
        name?: never;
        value?: never;
        kindName?: never;
        selection?: never;
      }
    | {
        mode: "flexible";
        startName: string;
        endName: string;
        kindName: string;
        selection: DatePickerSelection;
        name?: never;
        value?: never;
        start?: never;
        end?: never;
      }
  );

export const DatePicker = (props: DatePickerProps) => {
  const {
    id,
    label,
    mode = "single",
    name,
    value,
    startName,
    endName,
    kindName,
    selection,
    start,
    end,
    min,
    max,
    minFrom,
    maxFrom,
    required,
    readonly,
    help,
    class: className,
    "aria-describedby": describedBy,
    ...attributes
  } = props;
  const minReference = typeof minFrom === "string" ? { id: minFrom } : minFrom;
  const maxReference = typeof maxFrom === "string" ? { id: maxFrom } : maxFrom;
  const generatedId = useId();
  const pickerId = id ?? `ply-date-picker-${generatedId}`;
  const initial: DatePickerSelection =
    selection ??
    (mode === "range"
      ? { kind: "range", start: start ?? "", end: end ?? "" }
      : { kind: "single", start: value ?? "" });
  const description =
    [describedBy, help ? `${pickerId}-help` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset
      {...attributes}
      id={pickerId}
      class={classes("ply-date-picker", className)}
      data-controller="date-picker"
      data-date-picker-choice-value={mode}
      data-date-picker-mode-value={initial.kind}
      data-date-picker-min-date-value={min}
      data-date-picker-max-date-value={max}
      data-date-picker-min-from-value={minReference?.id}
      data-date-picker-min-bound-value={minReference?.bound}
      data-date-picker-min-offset-value={minReference?.offsetDays}
      data-date-picker-max-from-value={maxReference?.id}
      data-date-picker-max-bound-value={maxReference?.bound}
      data-date-picker-max-offset-value={maxReference?.offsetDays}
    >
      <legend id={`${pickerId}-label`} class="label">
        {label}
      </legend>
      <div class="control" data-date-picker-target="control" hidden>
        <Input
          id={`${pickerId}-input`}
          value={formatSelection(initial)}
          aria-labelledby={`${pickerId}-label`}
          aria-describedby={description}
          required={required}
          readonly={readonly}
          form={attributes.form}
          placeholder={mode === "range" ? "期間を選択" : "日付を選択"}
          autocomplete="off"
          spellcheck={false}
          data-date-picker-target="display"
          disabled
        />
        <button
          class="toggle"
          type="button"
          popovertarget={`${pickerId}-calendar`}
          aria-label={`${label}のカレンダーを開く`}
          aria-haspopup="dialog"
          disabled={attributes.disabled || readonly}
          data-date-picker-target="trigger"
        >
          <Icon name="calendar" />
        </button>
      </div>
      <div class="fallback" data-date-picker-target="fallback">
        <Field
          id={`${pickerId}-start`}
          label={mode === "single" ? label : "開始日"}
          describedBy={description}
        >
          {(field) => (
            <Input
              {...field}
              type="date"
              name={name ?? startName}
              value={initial.start}
              min={min}
              max={max}
              required={required}
              readonly={readonly}
              form={attributes.form}
              data-date-picker-target="start"
            />
          )}
        </Field>
        <div hidden={mode === "single"}>
          <Field id={`${pickerId}-end`} label="終了日" describedBy={description}>
            {(field) => (
              <Input
                {...field}
                type="date"
                name={endName}
                value={initial.kind === "range" ? initial.end : ""}
                min={min}
                max={max}
                required={required && mode === "range"}
                readonly={readonly}
                form={attributes.form}
                disabled={mode === "single"}
                data-date-picker-target="end"
              />
            )}
          </Field>
        </div>
        {mode === "flexible" && !readonly ? (
          <Field id={`${pickerId}-kind`} label="日付の形式">
            {(field) => (
              <Select
                {...field}
                name={kindName}
                form={attributes.form}
                data-date-picker-target="kind"
                disabled={readonly}
              >
                <option value="single" selected={initial.kind === "single"}>
                  単日
                </option>
                <option value="range" selected={initial.kind === "range"}>
                  期間
                </option>
              </Select>
            )}
          </Field>
        ) : (
          <input
            type="hidden"
            name={kindName}
            form={attributes.form}
            value={initial.kind}
            data-date-picker-target="kind"
          />
        )}
      </div>
      <div class="messages">
        {help && (
          <p class="help" id={`${pickerId}-help`}>
            <span>{help}</span>
          </p>
        )}
        <p class="error" id={`${pickerId}-error`} data-date-picker-target="error" hidden>
          <Icon name="x-circle" />
          <span data-date-picker-target="errorText" />
        </p>
      </div>
      <div
        id={`${pickerId}-calendar`}
        class="panel"
        popover="auto"
        role="dialog"
        aria-label={`${label}を選択`}
        data-positioned="false"
        data-date-picker-target="panel"
      >
        <div class="editors" data-date-picker-target="editors">
          <Input
            aria-label={mode === "single" ? "日付" : "開始日"}
            placeholder="YYYY/MM/DD"
            autocomplete="off"
            spellcheck={false}
            data-date-picker-target="editorStart"
            data-action="focus->date-picker#editStart input->date-picker#editDates change->date-picker#editDates"
          />
          <Input
            aria-label="終了日"
            placeholder="YYYY/MM/DD"
            autocomplete="off"
            spellcheck={false}
            data-date-picker-target="editorEnd"
            hidden={initial.kind === "single"}
            data-action="focus->date-picker#editEnd input->date-picker#editDates change->date-picker#editDates"
          />
        </div>
        <p
          id={`${pickerId}-editor-error`}
          class="editor-error"
          data-date-picker-target="editorError"
          role="status"
          hidden
        />
        <div class="month">
          <strong id={`${pickerId}-month`} data-date-picker-target="month" aria-live="polite" />
          <button
            class="ply-button button"
            type="button"
            data-action="date-picker#currentMonth"
            data-date-picker-target="today"
          >
            今日
          </button>
          <button
            class="ply-button button previous"
            type="button"
            data-icon-only="true"
            aria-label="前の月"
            data-action="date-picker#previousMonth"
            data-date-picker-target="previous"
          >
            <Icon name="caret" />
          </button>
          <button
            class="ply-button button next"
            type="button"
            data-icon-only="true"
            aria-label="次の月"
            data-action="date-picker#nextMonth"
            data-date-picker-target="next"
          >
            <Icon name="caret" />
          </button>
        </div>
        <p class="selection" role="status" data-date-picker-target="selection" />
        <table class="grid" role="grid" aria-labelledby={`${pickerId}-month`}>
          <thead>
            <tr>
              {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                <th scope="col" aria-label={`${day}曜日`}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-date-picker-target="days" />
        </table>
        <div class="actions">
          {mode === "flexible" && (
            <Switch
              id={`${pickerId}-range-toggle`}
              label="終了日"
              data-date-picker-target="rangeToggle"
              data-action="date-picker#toggleRange"
            />
          )}
          <button class="ply-button button" type="button" data-action="date-picker#clearSelection">
            <span>クリア</span>
          </button>
        </div>
      </div>
    </fieldset>
  );
};
