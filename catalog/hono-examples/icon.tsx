import { Icon } from "../../src/hono";
export default () => (
  <div class="ply-cluster">
    {(["pencil", "calendar", "files", "chart", "check", "layers", "arrow"] as const).map((name) => (
      <span>
        <Icon name={name} /> {name}
      </span>
    ))}
  </div>
);
