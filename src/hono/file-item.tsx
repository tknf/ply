export type FileItemProps = {
  name: string;
  description: string;
  href?: string;
  state?: "ready" | "pending" | "error";
};
export const FileItem = ({ name, description, href, state = "ready" }: FileItemProps) => (
  <div class="ply-file-item" data-state={state}>
    <p>{href ? <a href={href}>{name}</a> : <strong>{name}</strong>}</p>
    <p>{description}</p>
  </div>
);
