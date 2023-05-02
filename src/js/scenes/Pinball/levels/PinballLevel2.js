import Level from "./Level.js";
import config from "../config/nivel2.js";

export default class PinballLevel2 extends Level {
  constructor() {
    super(...Object.values(config));
  }
}
