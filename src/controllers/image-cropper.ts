import { ImageCropperController as BaseImageCropperController } from "@tknf/stimulus-ui";

/** 上流の切り抜きに、接続している間だけ持ち手と調整の欄を出す印を加える。 */
export class ImageCropperController extends BaseImageCropperController {
  constructor(...args: ConstructorParameters<typeof BaseImageCropperController>) {
    super(...args);
    const connectBase = this.connect;
    const disconnectBase = this.disconnect;
    this.connect = () => {
      connectBase();
      this.element.setAttribute("data-connected", "true");
    };
    this.disconnect = () => {
      this.element.removeAttribute("data-connected");
      disconnectBase();
    };
  }
}
