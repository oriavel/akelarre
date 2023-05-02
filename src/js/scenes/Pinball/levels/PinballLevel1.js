import Level from "./Level.js";
import config from "../config/nivel1.js";
export default class PinballLevel1 extends Level {
  constructor() {
    super(...Object.values(config));
  }
}
