import { Input } from "./field";
import type { ElementProps } from "./types";

export const TimeField = (attributes: Omit<ElementProps<"input">, "type">) => (
  <Input {...attributes} type="time" data-controller="time-field" />
);
