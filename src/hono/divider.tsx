export const Divider = ({ label }: { label?: string }) =>
  label ? (
    <div class="ply-divider">
      <span>{label}</span>
    </div>
  ) : (
    <hr class="ply-divider" />
  );
