import type { ElementProps } from "./types";
import { classes } from "./types";

export type KeycapProps = ElementProps<"span"> & { keys: readonly string[] };
export const Keycap = ({ keys, class: className, ...attributes }: KeycapProps) => (
  <span {...attributes} class={classes("ply-keycap", className)}>
    {keys.map((key) => (
      <kbd>{key}</kbd>
    ))}
  </span>
);
