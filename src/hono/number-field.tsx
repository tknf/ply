import { Input } from "./field";
import type { ElementProps } from "./types";

export type NumberFieldProps = Omit<ElementProps<"input">, "type"> & { pageStep?: number };

export const NumberField = ({ pageStep = 10, ...attributes }: NumberFieldProps) => (
  <Input
    {...attributes}
    type="number"
    data-controller="number-field"
    data-number-field-page-step-value={pageStep}
  />
);
