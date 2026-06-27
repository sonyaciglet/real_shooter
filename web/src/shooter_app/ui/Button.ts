import { FancyButton } from "@pixi/ui";

import { Label } from "./Label";

const defaultButtonOptions = {
  text: "",
  width: 220,
  height: 70,
  fontSize: 28,
};

type ButtonOptions = typeof defaultButtonOptions;

export class Button extends FancyButton {
  constructor(options: Partial<ButtonOptions> = {}) {
    const opts = { ...defaultButtonOptions, ...options };

    super({
      defaultView: "shooter_button_no_text.png",
      anchor: 0.5,
      text: new Label({
        text: opts.text,
        style: {
          fill: 0x4a4a4a,
          align: "center",
          fontSize: opts.fontSize,
        },
      }),
      textOffset: { x: 0, y: 0 },
      defaultTextAnchor: 0.5,
      scale: 0.9,
      animations: {
        hover: {
          props: {
            scale: { x: 1.03, y: 1.03 },
            y: 0,
          },
          duration: 100,
        },
        pressed: {
          props: {
            scale: { x: 0.97, y: 0.97 },
            y: 10,
          },
          duration: 100,
        },
      },
    });

    this.width = opts.width;
    this.height = opts.height;
  }
}
