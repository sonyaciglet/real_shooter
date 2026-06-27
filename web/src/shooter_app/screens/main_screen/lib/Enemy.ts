import { Color, Text } from "pixi.js";

import { Point } from "./Point";
import { config } from "../../../config";

function colorGradient(fadeFraction: number) {
  const leftmostColor = new Color("green");
  const middleColor = new Color("orange");
  const rightmostColor = new Color("red");
  let color1 = leftmostColor;
  let color2 = middleColor;
  let fade = fadeFraction * 2;
  if (fade >= 1) {
    fade -= 1;
    color1 = middleColor;
    color2 = rightmostColor;
  }

  const color = new Color([
    color1.red * (1 - fade) + color2.red * fade,
    color1.green * (1 - fade) + color2.green * fade,
    color1.blue * (1 - fade) + color2.blue * fade,
  ]);
  return color;
}

export class Enemy {
  position: Point;
  radius: number;
  text_sprite: Text;
  kill_range: boolean;
  dead: boolean;

  constructor(pos: Point, radius: number) {
    this.position = pos;
    this.radius = radius;
    this.text_sprite = new Text({
      text: this.position.toText(),
      style: {
        fill: "#000000",
        fontSize: 36,
        fontFamily: "MyFont",
      },
    });
    this.kill_range = false;
    this.dead = false;
  }

  aim(cursor_position: Point) {
    const MAX_RATIO = 10;
    if (this.dead) {
      return;
    }
    const distance = this.position.distance(cursor_position);
    let ratio = distance / this.radius;
    if (ratio <= 1) {
      this.kill_range = true;
      this.text_sprite.style.fill = new Color("lime");
    } else {
      this.kill_range = false;
      if (ratio > MAX_RATIO) {
        this.text_sprite.style.fill = new Color("black");
      } else {
        ratio /= MAX_RATIO;
        const color = colorGradient(ratio);
        this.text_sprite.style.fill = color;
      }
    }
  }

  shoot() {
    this.dead = this.dead || this.kill_range;
    if (this.dead) {
      this.text_sprite.text = "DEAD";
      this.text_sprite.style.fill = "#000000";
    }
  }

  reset() {
    this.position = new Point(
      Math.floor(Math.random() * config.ScreenWidth),
      Math.floor(Math.random() * config.ScreenHeight),
    );
    this.text_sprite.text = this.position.toText();
    this.dead = false;
    this.kill_range = false;
  }
}
