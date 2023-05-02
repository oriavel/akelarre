import Flipper from "../elements/Flipper.js";
import Ball from "../elements/Ball.js";
import Bumper from "../elements/Bumpers.js";
import Wall from "../elements/Wall.js";
import Score from "../elements/Score.js";
export default class Level extends Phaser.Scene {
  constructor(
    level,
    nextLevel,
    keyHint,
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
    this.HINT = keyHint;
  }

  preload() {
    this.ASSETS.forEach((asset) => {
      this.load.image(asset.label, asset.url);
    });
    this.load.audio("music", "src/audio/brujasPinball.mp3");
  }

  create() {
    this.GWIDTH = this.game.config.width;
    this.GHEIGHT = this.game.config.height;
    this.over = false;
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.setScale(
      this.GWIDTH / background.width,
      this.GHEIGHT / background.height
    );
    background.alpha = 0.3; // Set background opacity to 50%

    // Key hint text
    const hint = this.add.text(
      this.game.config.width - 95,
      this.game.config.height - 35,
      this.HINT,
      {
        font: "14px Arial",
        fill: "#b304cb",
        align: "right",
      }
    );
    hint.setOrigin(0.5, 0.5);

    // Init scoring
    this.score = new Score(
      this,
      this.SCORING.goal,
      this.SCORING.hitPoints,
      this.SCORING.lifes
    );

    // Sound
    this.music = this.sound.add("music");
    this.music.play({
      volume: 0.2,
      loop: true,
    });

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
    console.log(this.game.config.keys);
    if (!this.over) {
      this.ball.update(); // Check if the ball falls out of the screen
    }
  }

  gameOver(isWin) {
    // Add black rectangle to cover the screen
    this.over = true;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.9);
    graphics.fillRect(0, 0, this.GWIDTH, this.GHEIGHT);

    // Display game over text
    const message = isWin
      ? {
          banner: "You Win!",
          instructions:
            "Presiona: \nR para volver a jugar, \nESC para salir, \nENTER para continuar",
        }
      : {
          banner: "Game Over",
          instructions:
            "Presiona: \nR para volver a intentar, \nESC para salir",
        };

    const gameOverText = this.add.text(
      this.GWIDTH / 2,
      this.GHEIGHT / 2,
      message.banner,
      { fontSize: "64px", fill: "#8811b6" }
    );
    gameOverText.setOrigin(0.5, 0.5);

    const status = this.add.text(
      this.GWIDTH / 2,
      this.GHEIGHT / 2 - 200,
      this.score.scoreText._text + "\n" + this.score.lifeText._text,
      { fontSize: "28px", fill: "#fff", align: "center" }
    );
    status.setOrigin(0.5, 0.5);
    // Add keyboard input to restart or exit
    const restartKey = this.input.keyboard.addKey("R");
    const exitKey = this.input.keyboard.addKey("ESC");
    restartKey.on("down", () => {
      this.scene.restart();
    });

    exitKey.on("down", () => {
      this.music.pause()
      this.scene.stop();
      this.scene.start("cueva");
    });
    if (isWin) {
      const enterKey = this.input.keyboard.addKey("ENTER");
      if (!this.game.config.key1) {
        // this.NEXT_LEVEL = "cueva" &&
        this.game.config.keys++;
        this.game.config.key1 = true;
        let newKey = this.add.text(
          this.GWIDTH / 2,
          this.GHEIGHT / 2 - 100,
          "Alaaaa, de tanto golpear rocas has \nencontrado una llave oculta entre ellas \n\nAhora tienes " +
            this.game.config.keys +
            " llaves!",
          { fontSize: "16px", fill: "#a3ff00", align: "center" }
        );
        newKey.setOrigin(0.5, 0.5);
      }

      enterKey.on("down", () => {
        this.scene.stop();
        this.scene.start(this.NEXT_LEVEL);
      });
    }

    // Display instructions to the player
    const instructionsText = this.add.text(
      this.GWIDTH / 2,
      this.GHEIGHT - 70,
      message.instructions,
      { fontSize: "20px", fill: "#fff" }
    );
    instructionsText.setOrigin(0.5, 0.5);
  }
}
