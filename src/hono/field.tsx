import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export type ControlAttributes = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: "true";
  "data-invalid"?: "true";
};
export type FieldProps = {
  id: string;
  label: string;
  help?: string;
  error?: string;
  describedBy?: string;
  status?: Child;
  children: (attributes: ControlAttributes) => Child;
};
export const Field = ({ id, label, help, error, describedBy, status, children }: FieldProps) => {
  const ids =
    [describedBy, help ? `${id}-help` : undefined, error ? `${id}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const attributes = {
    id,
    "aria-describedby": ids,
    "aria-invalid": error ? "true" : undefined,
    "data-invalid": error ? "true" : undefined,
  } satisfies ControlAttributes;
  return (
    <div class="ply-field">
      <div class="ply-field-heading">
        <label for={id}>{label}</label>
        {status}
      </div>
      {children(attributes)}
      {(help || error) && (
        <div class="ply-field-messages">
          {help && (
            <p class="ply-field-help" id={`${id}-help`}>
              <Icon name="info" />
              <span>{help}</span>
            </p>
          )}
          {error && (
            <p class="ply-field-error" id={`${id}-error`}>
              <Icon name="x-circle" />
              <span>{error}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export type FieldGroupProps = PropsWithChildren<
  ElementProps<"fieldset"> & { legend: string; description?: string }
>;
export const FieldGroup = ({
  children,
  legend,
  description,
  class: className,
  ...attributes
}: FieldGroupProps) => (
  <fieldset {...attributes} class={classes("ply-field-group", className)}>
    <legend>{legend}</legend>
    <div class="ply-field-group-layout">
      {description && <p class="ply-field-group-description">{description}</p>}
      <div class="ply-field-group-fields">{children}</div>
    </div>
  </fieldset>
);

export const Input = ({ class: className, ...attributes }: ElementProps<"input">) => (
  <input {...attributes} class={classes("ply-input", className)} />
);
export const Textarea = ({ class: className, ...attributes }: ElementProps<"textarea">) => (
  <textarea {...attributes} class={classes("ply-input", className)} />
);
export const Select = ({ class: className, ...attributes }: ElementProps<"select">) => (
  <select {...attributes} class={classes("ply-input", className)} />
);

export type ChoiceProps = ElementProps<"input"> & {
  label: string;
  description?: string;
  kind?: "plain" | "option";
  type?: "checkbox" | "radio";
};
export const Choice = ({
  label,
  description,
  kind = "plain",
  type = "checkbox",
  class: className,
  ...attributes
}: ChoiceProps) => (
  <label class="ply-choice" data-kind={kind}>
    <input {...attributes} type={type} class={className} />
    <span>
      {description ? (
        <>
          <strong>{label}</strong>
          <small>{description}</small>
        </>
      ) : (
        label
      )}
    </span>
  </label>
);
