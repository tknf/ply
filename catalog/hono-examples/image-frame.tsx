import { ImageFrame } from "../../src/hono";

export default () => (
  <div class="ply-split">
    {(["portrait", "square", "landscape"] as const).map((shape) => (
      <div class="ply-stack" data-space="small">
        <h3>{shape}</h3>
        <p>全体を表示</p>
        <ImageFrame
          src="/assets/sample-cover.svg"
          alt={`${shape}の全体表示`}
          shape={shape}
          fit="contain"
        />
        <p>切り抜いて表示</p>
        <ImageFrame
          src="/assets/sample-cover.svg"
          alt={`${shape}の切り抜き`}
          shape={shape}
          fit="cover"
        />
        <p>画像が未登録の場合</p>
        <ImageFrame alt={`${shape}の未登録画像`} shape={shape} />
      </div>
    ))}
  </div>
);
