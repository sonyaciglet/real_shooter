import { Assets, Container } from "pixi.js";

import { Point } from "./lib/Point";
import { Enemy } from "./lib/Enemy";
// import { WinPopup } from "../../popups/WinPopup";

function createCursor() {
  const sprite = new Text({
    text: "[?, ?]",
    style: {
      fill: "#000000",
      fontSize: 20,
      fontFamily: "MyFont",
    },
  });
  sprite.anchor.set(0.5);
  return sprite;
}

export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private enemies: Array<Enemy> = [];
  private cursor: Text;

  constructor() {
    super();
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);
    Assets.load({
      src: "/assets/times.ttf",
    });

    // TODO move to settings
    const enemy_count = 1;
    const enemy_radius = 50;
    const enemy_sprite_height = 40;
    const enemy_sprite_width = 200;
    for (let i = 0; i < enemy_count; ++i) {
      enemies.push(
        new Enemy(
          new Point(
            Math.floor(Math.random() * app_width),
            Math.floor(Math.random() * app_height),
          ),
          enemy_radius,
        ),
      );
    }
    enemies.foreach((enemy, idx) => {
      this.mainContainer.addChild(enemy.text_sprite);
      let y = idx * enemy_sprite_height;
      const x = enemy_sprite_width * Math.floor(y / app_height);
      y = y % app_height;
      enemy.text_sprite.x = x;
      enemy.text_sprite.y = y;
    });

    const cursor = createCursor();
    this.mainContainer.addChild(cursor);
  }
}
