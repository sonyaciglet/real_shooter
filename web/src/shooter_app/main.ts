import { setEngine } from "../common/getEngine";
import { MainScreen } from "./screens/main_screen/MainScreen";
import { CreationEngine } from "../engine/engine";
import { config } from "./config";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    backgroundColor: "#FFFFFF",
    resizeOptions: { minWidth: 900, minHeight: 600, letterbox: false },
    canvas: document.getElementById(
      "basic-shooter-canvas",
    )! as HTMLCanvasElement,
    width: config.ScreenWidth,
    height: config.ScreenHeight,
  });

  engine.renderer.events.cursorStyles.default = "crosshair";

  await engine.navigation.showScreen(MainScreen);
})();
