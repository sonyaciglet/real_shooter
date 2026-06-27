import { Container, Graphics } from "pixi.js";

const defaultBoxOptions = {
  color: 0xffffff,
  width: 100,
  height: 600,
  shadow: true,
  shadowColor: 0xa0a0a0,
  shadowOffset: 22,
};

export type BoxOptions = typeof defaultBoxOptions;

/**
 * Generic rounded box based on a nine-sliced sprite that can be resized freely.
 */
export class Box extends Container {
  /** The rectangular area, that scales without distorting rounded corners */
  private box: Graphics;

  constructor(options: Partial<BoxOptions> = {}) {
    super();
    const opts = { ...defaultBoxOptions, ...options };
    this.box = new Graphics()
      .rect(0, 0, opts.width, opts.height)
      .fill(opts.color)
      .stroke({ width: 4, color: "black" });
    this.box.pivot.set(opts.width / 2, opts.height / 2);
    // this.box.pivot.set(.5, .5);

    this.addChild(this.box);
  }

  /** Get the base width, without counting the shadow */
  public get boxWidth() {
    return this.box.width;
  }

  /** Get the base height, without counting the shadow */
  public get boxHeight() {
    return this.box.height;
  }
}
