export const Keycap = ({ keys }: { keys: readonly string[] }) => (
  <span class="ply-keycap">
    {keys.map((key) => (
      <kbd>{key}</kbd>
    ))}
  </span>
);
