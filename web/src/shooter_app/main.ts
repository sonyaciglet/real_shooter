import { setEngine } from "../common/getEngine";
import { MainScreen } from "./screens/main_screen/MainScreen";
import { CreationEngine } from "../engine/engine";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: "#1E1E1E",
    resizeOptions: { minWidth: 900, minHeight: 600, letterbox: false },
  });

  // Show the main screen once the load screen is dismissed
  await engine.navigation.showScreen(MainScreen);
})();
