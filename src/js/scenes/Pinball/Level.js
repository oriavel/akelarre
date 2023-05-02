import Flipper from "./elements/Flipper.js";
import Ball from "./elements/Ball.js";
import Bumper from "./elements/Bumpers.js";
import Wall from "./elements/Wall.js";
import Score from "./elements/Score.js";

export class Level extends Phaser.Scene {
  constructor(
    level,
    gravity,
    assets, // array of assets and images to preload { label, url }
    ball, // ball position {x,y}
    flippers, // array of Flipper args [{ x, y, right|left, key }, ..]
    bumpers, // array of bumper args [{ x, y }, ...]
    walls, // array of wall args [{ x, y, slope }, ...]
    scoring // { goal, hitPoints, lifes }
  ) {
    // CONSTANTS
    this.BALL = ball;
    this.FLIPPERS = flippers;
    this.BUMPERS = bumpers;
    this.WALLS = walls;
    this.SCORING = scoring;
    this.ASSETS = assets;
    super({
      key: level,
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: gravity },
        },
      },
    });
  }

  preload() {
    this.ASSETS.forEach((asset) => {
      this.preload.image(asset.label, asset.url);
    });
  }

  create() {
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.setScale(
      this.game.config.width / background.width,
      this.game.config.height / background.height
    );
    // Init scoring
    this.score = new Score(
      this,
      this.SCORING.goal,
      this.SCORING.hitPoints,
      this.SCORING.lifes
    );

    // Init game elements
    this.ball = new Ball(this, this.BALL.x, this.BALL.y);
    this.flippers = this.FLIPPERS.map((flipper) => {
      return new Flipper(this, flipper.x, flipper.y, flipper.side, flipper.key);
    });
    this.walls = this.WALLS.map((wall) => {
      return new Wall(this, wall.x, wall.y, wall.slope, wall.bar);
    });
    this.bumpers = this.BUMPERS.map((bumper) => {
      return new Bumper(this, bumper.x, bumper.y);
    });

    // init keys
  }

  update() {
    this.ball.update(); // Check if the ball falls out of the screen
  }
}
