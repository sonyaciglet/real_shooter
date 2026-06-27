import { Text, Container } from "pixi.js";
import { animate } from "motion";

import { Point } from "./lib/Point";
import { Enemy } from "./lib/Enemy";
import { config } from "../../config";
import { engine } from "../../../common/getEngine";
import { WinPopup } from "../../popups/WinPopup";

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
  sprite.x = Math.floor(config.ScreenWidth / 2);
  sprite.y = Math.floor(config.ScreenHeight / 2);
  return sprite;
}

export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private enemies: Array<Enemy> = [];
  private mouse_cursor: Text;
  private paused: boolean = false;

  constructor() {
    super();
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    for (let i = 0; i < config.EnemyCount; ++i) {
      this.enemies.push(
        new Enemy(
          new Point(
            Math.floor(Math.random() * config.ScreenWidth),
            Math.floor(Math.random() * config.ScreenHeight),
          ),
          config.EnemyRadius,
        ),
      );
    }
    this.enemies.forEach((enemy: Enemy, idx: number) => {
      this.mainContainer.addChild(enemy.text_sprite);
      let y = idx * config.EnemySpriteHeight;
      const x = config.EnemySpriteWidth * Math.floor(y / config.ScreenHeight);
      y = y % config.ScreenHeight;
      enemy.text_sprite.x = x;
      enemy.text_sprite.y = y;
    });

    this.mouse_cursor = createCursor();
    this.mainContainer.addChild(this.mouse_cursor);

    engine().canvas.addEventListener("pointermove", (e) => {
      const pos = new Point(e.offsetX, e.offsetY);
      this.mouse_cursor.text = pos.toText();
      this.mouse_cursor.x = pos.x;
      this.mouse_cursor.y = pos.y + 10;
      if (this.paused) {
        return;
      }

      this.enemies.forEach((enemy, _) => {
        void _;
        enemy.aim(pos);
      });
    });

    engine().canvas.addEventListener("pointerdown", (_) => {
      void _;
      if (this.paused) {
        return;
      }
      const colorObj = { value: 0x00 };
      engine().renderer.background.color = 0xffff00;
      animate(
        colorObj,
        { value: 0xff },
        {
          duration: 0.1,
          onUpdate: () => {
            const val = Math.round(colorObj.value);
            engine().renderer.background.color = 0xff0000 + (val << 8) + val;
          },
        },
      );
      this.enemies.forEach((enemy, _) => {
        void _;
        enemy.shoot();
      });
      if (
        this.enemies.every((enemy) => {
          return enemy.dead;
        })
      ) {
        engine().navigation.presentPopup(WinPopup);
        this.enemies.forEach((enemy, _) => {
          void _;
          enemy.reset();
        });
      }
    });
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.mainContainer.interactiveChildren = false;
    this.paused = true;
  }

  /** Resume gameplay */
  public async resume() {
    this.mainContainer.interactiveChildren = true;
    this.paused = false;
  }
}
