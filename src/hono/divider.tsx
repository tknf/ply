export type DividerProps = {
  label?: string;
  /** solidは確定した区切り、dashedはミシン目（ここから先はまだ確定していない）、wavyはここから新しい。 */
  line?: "solid" | "dashed" | "wavy";
};

export const Divider = ({ label, line = "solid" }: DividerProps) => {
  const kind = line === "solid" ? undefined : line;
  return label ? (
    <div class="ply-divider" data-line={kind}>
      <span>{label}</span>
    </div>
  ) : (
    <hr class="ply-divider" data-line={kind} />
  );
};
