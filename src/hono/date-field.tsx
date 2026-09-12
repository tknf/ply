import { Input } from "./field";
import type { ElementProps } from "./types";

export const DateField = (attributes: Omit<ElementProps<"input">, "type">) => (
  <Input {...attributes} type="date" data-controller="date-field" />
);
