import Level from "./Level.js";
import config from "../config/nivel3.js";

export default class PinballLevel3 extends Level {
  constructor() {
    super(...Object.values(config));
  }
}
