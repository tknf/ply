import { classes, type ElementProps } from "./types";

export type ImageFrameProps = ElementProps<"figure"> & {
  src?: string;
  alt: string;
  shape?: "portrait" | "square" | "landscape";
  fit?: "contain" | "cover";
  missingLabel?: string;
  caption?: string;
  /** 説明の下に淡い文字で添える大きさや日付（HEYの添付と同じ）。 */
  meta?: string;
};
export const ImageFrame = ({
  src,
  alt,
  shape = "portrait",
  fit = "contain",
  missingLabel = "画像なし",
  caption,
  meta,
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
    {(caption || meta) && (
      <figcaption>
        {caption && <span class="name">{caption}</span>}
        {meta && <span class="meta">{meta}</span>}
      </figcaption>
    )}
  </figure>
);
