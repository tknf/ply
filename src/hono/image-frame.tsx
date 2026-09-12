export type ImageFrameProps = {
  src?: string;
  alt: string;
  shape?: "portrait" | "square" | "landscape";
  fit?: "contain" | "cover";
  missingLabel?: string;
};
export const ImageFrame = ({
  src,
  alt,
  shape = "portrait",
  fit = "contain",
  missingLabel = "画像なし",
}: ImageFrameProps) => (
  <figure class="ply-image-frame" data-shape={shape} data-fit={fit}>
    {src ? (
      <img src={src} alt={alt} loading="lazy" />
    ) : (
      <span role="img" aria-label={`${alt}：${missingLabel}`}>
        {missingLabel}
      </span>
    )}
  </figure>
);
