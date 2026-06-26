import { Application, Assets, Text, Color } from "pixi.js";
import { WinPopup } from "./app/popups/WinPopup";

import { CreationEngine } from "./engine/engine";
import { setEngine, engine } from "./app/getEngine";


(async () => {
  // Create a new application
  const app = new Application();
  const app_height = 600;
  const app_width = 900;
  const enemies: Enemy[] = [];
  var game_won = false;

  // Initialize the application with a transparent background
  await app.init({
    canvas: document.getElementById(
      "basic-shooter-canvas",
    ) as HTMLCanvasElement,
    backgroundColor: 0xffffff,
    width: app_width,
    height: app_height,
  });
  app.renderer.events.cursorStyles.default = "none";
  // document.body.appendChild(app.canvas);

  // Append the application canvas to the document body


  app.canvas.addEventListener("pointermove", (e) => {
    const pos = new Position(e.offsetX, e.offsetY);
    cursor.text = pos.toText();
    cursor.x = pos.x;
    cursor.y = pos.y;
    // eslint-disable-next-line no-unused-vars
    enemies.forEach((enemy, _) => {
      enemy.aim(pos);
    });
  });
  // eslint-disable-next-line no-unused-vars
  app.canvas.addEventListener("pointerdown", (_) => {
    // eslint-disable-next-line no-unused-vars
    enemies.forEach((enemy, _) => {
      enemy.shoot();
    });
    if (enemies.every((enemy) => { return enemy.dead; })) {
      console.log(engine());
      engine().navigation.presentPopup(WinPopup);

      console.log("WINNN!");
      game_won = true;
    }
  });

})();
