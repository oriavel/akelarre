import Level from "../Level.js";
import config from "../configNiveles/nivel2.js";

export default class PinballLevel2 extends Level {
  constructor() {
    super(...Object.values(config));
  }
  create() {
    super.create();
    const keyHint = this.add.text(
      this.game.config.width - 95,
      this.game.config.height - 35,
      "Presiona espacio para \n mover el flipper",
      {
        font: "14px Arial",
        fill: "#b304cb",
        align: "right",
      }
    );
    keyHint.setOrigin(0.5, 0.5);
  }
}
