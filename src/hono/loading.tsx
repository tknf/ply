import { classes, type ElementProps } from "./types";

export type LoadingProps = ElementProps<"p"> & { label?: string };
export const Loading = ({
  label = "読み込み中…",
  class: className,
  ...attributes
}: LoadingProps) => (
  <p {...attributes} class={classes("ply-loading", className)} role="status">
    <span class="indicator" aria-hidden="true" />
    <span class="label">{label}</span>
  </p>
);
