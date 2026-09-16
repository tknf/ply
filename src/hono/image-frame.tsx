import { classes, type ElementProps } from "./types";

export type ImageFrameProps = ElementProps<"figure"> & {
  src?: string;
  alt: string;
  shape?: "portrait" | "square" | "landscape";
  fit?: "contain" | "cover";
  missingLabel?: string;
  caption?: string;
};
export const ImageFrame = ({
  src,
  alt,
  shape = "portrait",
  fit = "contain",
  missingLabel = "画像なし",
  caption,
  class: className,
  ...attributes
}: ImageFrameProps) => (
  <figure
    {...attributes}
    class={classes("ply-image-frame", className)}
    data-shape={shape}
    data-fit={fit}
  >
    <div class="image">
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <span role="img" aria-label={`${alt}：${missingLabel}`}>
          {missingLabel}
        </span>
      )}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);
