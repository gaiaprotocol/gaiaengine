import {
  AnimatedSprite,
  Assets,
  Dict,
  Spritesheet,
  SpritesheetFrameData,
} from "pixi.js";
import Node from "../Node.js";

export default class Sprite extends Node {
  private animatedSprite: AnimatedSprite | undefined;

  constructor(
    private _src: string,
    private frameCount: number,
    private fps: number,
  ) {
    super(0, 0);
    this.src = _src;
  }

  private async load(src: string) {
    const texture = await Assets.load(src);

    const frameWidth = texture.width / this.frameCount;
    const frames: Dict<SpritesheetFrameData> = {};
    for (let i = 0; i < this.frameCount; i++) {
      frames[`sprite-${i}.png`] = {
        frame: {
          x: i * frameWidth,
          y: 0,
          w: frameWidth,
          h: texture.height,
        },
      };
    }

    const spritesheet = new Spritesheet(
      texture,
      {
        frames,
        meta: {
          image: this.src,
          scale: 1,
        },
        animations: {
          sprite: Array.from(
            { length: this.frameCount },
            (_, i) => `sprite-${i}.png`,
          ),
        },
      },
    );
    await spritesheet.parse();

    this.container.addChild(
      this.animatedSprite = new AnimatedSprite(spritesheet.animations.sprite),
    );
    this.animatedSprite.anchor.set(0.5, 0.5);
    this.animatedSprite.animationSpeed = this.fps / 60;
    this.animatedSprite.play();
  }

  public set src(src: string) {
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src;
  }
}
