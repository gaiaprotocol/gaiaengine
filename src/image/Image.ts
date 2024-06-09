import { Assets, Sprite } from "pixi.js";
import Node from "../Node.js";

export default class Image extends Node {
  private sprite: Sprite | undefined;

  constructor(private _src: string) {
    super(0, 0);
    this.src = _src;
  }

  private async load(src: string) {
    const texture = await Assets.load(src);
    this.container.addChild(
      this.sprite = new Sprite({
        texture,
        anchor: { x: 0.5, y: 0.5 },
      }),
    );
  }

  public set src(src: string) {
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src;
  }
}
