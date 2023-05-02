import Flipper from "./elements/Flipper.js";
import Ball from "./elements/Ball.js";
import Bumper from "./elements/Bumpers.js";
import Wall from "./elements/Wall.js";
import Score from "./elements/Score.js";

export default class Level extends Phaser.Scene {
  constructor(
    level,
    nextLevel,
    gravity,
    assets, // array of assets and images to preload { label, url }
    ball, // ball position {x,y}
    flippers, // array of Flipper args [{ x, y, right|left, key }, ..]
    bumpers, // array of bumper args [{ x, y }, ...]
    walls, // array of wall args [{ x, y, slope }, ...]
    scoring // { goal, hitPoints, lifes }
  ) {
    super({
      key: level,
      physics: {
        default: "matter",
        matter: {
          debug: false,
          gravity: { y: gravity },
        },
      },
    });
    // CONSTANTS
    this.BALL = ball;
    this.FLIPPERS = flippers;
    this.BUMPERS = bumpers;
    this.WALLS = walls;
    this.SCORING = scoring;
    this.ASSETS = assets;
    this.NEXT_LEVEL = nextLevel;
  }

  preload() {
    this.ASSETS.forEach((asset) => {
      this.load.image(asset.label, asset.url);
    });
  }

  create() {
    this.over = false;
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.setScale(
      this.game.config.width / background.width,
      this.game.config.height / background.height
    );
    background.alpha = 0.3; // Set background opacity to 50%
    // Init scoring
    this.score = new Score(
      this,
      this.SCORING.goal,
      this.SCORING.hitPoints,
      this.SCORING.lifes
    );

    // Init game elements
    this.ball = new Ball(this, this.BALL.x, this.BALL.y);
    this.add.existing(this.ball);
    this.flippers = this.FLIPPERS.map((flipper) => {
      return new Flipper(
        this,
        flipper.x,
        flipper.y,
        flipper.direction,
        flipper.key
      );
    });
    this.add.existing(this.flippers);
    this.walls = this.WALLS.map((wall) => {
      return new Wall(this, wall.x, wall.y, wall.slope, wall.bar);
    });
    this.add.existing(this.walls);
    this.bumpers = this.BUMPERS.map((bumper) => {
      return new Bumper(this, bumper.x, bumper.y);
    });
    this.add.existing(this.bumpers);
  }

  update() {
    if (!this.over) {
      this.ball.update(); // Check if the ball falls out of the screen
    }
  }

  gameOver(isWin) {
    // Add black rectangle to cover the screen

    this.over = true;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.9);
    graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Display game over text
    console.log(this.score);
    const message = isWin
      ? {
          banner: "You Win!",
          instructions:
            "Presiona: \nR para volver a jugar, \nESC para salir, \nENTER para siguiente nivel",
        }
      : {
          banner: "Game Over",
          instructions:
            "Presiona: \nR para volver a intentar, \nESC para salir",
        };

    const gameOverText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      message.banner,
      { fontSize: "64px", fill: "#fff" }
    );
    gameOverText.setOrigin(0.5, 0.5);

    const status = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2 - 200,
      this.score.scoreText._text + "\n" + this.score.lifeText._text,
      { fontSize: "28px", fill: "#fff" }
    );
    status.setOrigin(0.5, 0.5);
    // Add keyboard input to restart or exit
    const restartKey = this.input.keyboard.addKey("R");
    const exitKey = this.input.keyboard.addKey("ESC");
    restartKey.on("down", () => {
      this.scene.restart();
    });

    exitKey.on("down", () => {
      this.scene.stop();
      this.scene.start("cueva");
    });
    if (isWin) {
      const enterKey = this.input.keyboard.addKey("ENTER");
      enterKey.on("down", () => {
        this.scene.stop();
        this.scene.start(this.NEXT_LEVEL);
      });
    }

    // Display instructions to the player
    const instructionsText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height - 70,
      message.instructions,
      { fontSize: "24px", fill: "#fff" }
    );
    instructionsText.setOrigin(0.5, 0.5);
  }
}
