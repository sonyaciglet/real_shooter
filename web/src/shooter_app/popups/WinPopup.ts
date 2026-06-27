import { BlurFilter, Container } from "pixi.js";

import { engine } from "../../common/getEngine";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Box } from "../ui/Box";
import { config } from "../config";

/** Popup that shows up when gameplay is paused */
export class WinPopup extends Container {
  /** Container for the popup UI components */
  private panel: Container;
  /** The popup title label */
  private title: Label;
  /** Button that closes the popup */
  private doneButton: Button;
  /** The panel background */
  private panelBase: Box;

  constructor() {
    super();

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new Box({ height: 200, width: 300, color: 0xffffff });
    this.panel.addChild(this.panelBase);
    this.panel.x = config.ScreenWidth / 2;
    this.panel.y = config.ScreenHeight / 2;

    this.title = new Label({
      text: "YOU WIN!!",
      style: { fill: 0x000, fontSize: 40 },
    });
    this.title.y = -20;
    this.title.x = 0;
    this.panel.addChild(this.title);

    this.doneButton = new Button({ text: "Again!" });
    this.doneButton.y = 50;
    this.doneButton.x = 0;
    this.doneButton.onPress.connect(() => engine().navigation.dismissPopup());
    this.panel.addChild(this.doneButton);
  }

  /** Present the popup, animated */
  public async show() {
    const currentEngine = engine();
    if (currentEngine.navigation.currentScreen) {
      currentEngine.navigation.currentScreen.filters = [
        new BlurFilter({ strength: 5 }),
      ];
    }
    /*
    this.bg.alpha = 0;
    this.panel.pivot.y = -400;
    animate(this.bg, { alpha: 0.8 }, { duration: 0.2, ease: "linear" });
    await animate(
      this.panel.pivot,
      { y: 0 },
      { duration: 0.3, ease: "backOut" },
    );
    */
  }

  /** Dismiss the popup, animated */
  public async hide() {
    const currentEngine = engine();
    if (currentEngine.navigation.currentScreen) {
      currentEngine.navigation.currentScreen.filters = [];
    }
    /*
    animate(this.bg, { alpha: 0 }, { duration: 0.2, ease: "linear" });
    await animate(
      this.panel.pivot,
      { y: -500 },
      { duration: 0.3, ease: "backIn" },
    );
    */
  }
}
