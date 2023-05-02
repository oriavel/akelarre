import { Level } from "./Level.js";
import config from "./levelsConfig/level1";
export default class Pinball extends Level {
  constructor() {
    super({ config });
  }
}
