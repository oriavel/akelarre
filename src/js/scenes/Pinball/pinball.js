import Flipper from "./elements/Flipper.js";
import Ball from "./elements/Ball.js";
import Bumper from "./elements/Bumpers.js";
import Wall from "./elements/Wall.js";
import Score from "./elements/Score.js";

export default class Pinball extends Phaser.Scene {
  constructor() {
    super({
      key: "Pinball",
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: 0.9 },
        },
      },
    });
  }

  preload() {
    this.load.image("ball", "./src/assets/Pinball/ball.png");
    this.load.image("background", "./src/assets/Backgrounds/stary-night.webp");
  }

  create() {
    this.INIT_POS = { x: 130, y: 0 };
    this.FLIPPERS_Y = 520;
    this.HALF = this.game.config.width / 2;
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.setScale(
      this.game.config.width / background.width,
      this.game.config.height / background.height
    );

    this.score = new Score(this, 1000, 10, 3); // Initialize game score and lifes
    this.initGameElements();
    this.initFlipperKeys();
  }

  initFlipperKeys() {
    // Initialize keyboard controls
    this.leftKey = this.input.keyboard.addKey("LEFT");
    this.rightKey = this.input.keyboard.addKey("RIGHT");

    this.leftKey.on("down", () => {
      this.leftFlipper.flip(true);
    });
    this.leftKey.on("up", () => {
      this.leftFlipper.flip(false);
    });
    this.rightKey.on("down", () => {
      this.rightFlipper.flip(true);
    });
    this.rightKey.on("up", () => {
      this.rightFlipper.flip(false);
    });
  }

  initGameElements() {
    // Initialize game physics
    this.ball = new Ball(this, this.INIT_POS.x, this.INIT_POS.y, 16, 0xa3ff00);
    this.leftFlipper = new Flipper(
      this,
      this.HALF - 70,
      this.FLIPPERS_Y,
      "left"
    );
    this.rightFlipper = new Flipper(
      this,
      this.HALF + 70,
      this.FLIPPERS_Y,
      "right"
    );
    this.leftWall = new Wall(
      this,
      this.HALF - 245,
      this.FLIPPERS_Y - 235,
      -0.4
    );
    this.rightWall = new Wall(
      this,
      this.HALF + 250,
      this.FLIPPERS_Y - 235,
      0.4
    );
    const bumperPositions = [
      { x: 200, y: 180 },
      { x: 400, y: 180 },
      { x: 600, y: 180 },
      { x: 250, y: 130 },
      { x: 550, y: 130 },
      { x: 400, y: 110 },
    ];
    this.bumpers = bumperPositions.map((position) => {
      return new Bumper(this, position.x, position.y);
    });
  }

  update() {
    // Check if the ball falls out of the screen
    if (Math.abs(this.ball.body.y) > this.game.config.height) {
      this.ball.body.setPosition(this.INIT_POS.x, this.INIT_POS.y);
      this.ball.body.setVelocity(0);
      // decrease the number of lifes by 1
      this.score.decreaseLife();
      if (this.score.lifes <= 0) {
        // game over - lost
        this.gameOver(false);
      }
    }

    // check if the game is over
    if (this.score.lifes === 0) {
      //this.scene.start("GameOver", { score: this.score.points });
    }
    // update the score
  }

  gameOver(win) {
    this.scene.pause();
    this.game.config.backgroundColor = "#000000";
    const gameOverText = win ? "You win!" : "Game over";
    const gameOverStyle = {
      font: "48px Arial",
      fill: "#ffffff",
      align: "center",
    };
    const gameOverMessage = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      gameOverText,
      gameOverStyle
    );
    gameOverMessage.setOrigin(0.5, 0.5);

    // You could add logic here to transition to another scene or restart the game.
  }
}
