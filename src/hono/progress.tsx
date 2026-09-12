export type ProgressProps = {
  label: string;
  value?: number;
  max?: number;
};

export const Progress = ({ label, value, max = 100 }: ProgressProps) => {
  // native progressの範囲に揃え、表示文言とブラウザの値を一致させる。
  const limit = Number.isFinite(max) && max > 0 ? max : 1;
  const current =
    value !== undefined && Number.isFinite(value) ? Math.min(limit, Math.max(0, value)) : undefined;
  return (
    <label class="ply-progress">
      <span>{label}</span>
      <progress value={current} max={limit}>
        {current === undefined ? "処理中" : `${Math.round((current / limit) * 100)}%`}
      </progress>
    </label>
  );
};
