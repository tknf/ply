export type StatisticProps = { label: string; value: string; unit?: string; note?: string };
export const Statistic = ({ label, value, unit, note }: StatisticProps) => (
  <dl class="ply-statistic">
    <dt>{label}</dt>
    <dd>
      {value}
      {unit && <small>{unit}</small>}
    </dd>
    {note && <dd class="ply-statistic-note">{note}</dd>}
  </dl>
);
