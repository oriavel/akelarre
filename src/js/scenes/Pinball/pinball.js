import Flipper from "./elements/Flipper.js";
import Ball from "./elements/Ball.js";
import Bumper from "./elements/Bumpers.js";
import Wall from "./elements/Wall.js";
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
    
    //this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height)
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
    this.initPhysics();
    this.initKeys();
    this.initScore();
  }

  initPhysics() {
    this.ball = new Ball(this, this.INIT_POS.x, this.INIT_POS.y, 16, 0xa3ff00);
    this.leftFlipper = new Flipper(
      this,
      this.HALF - 100,
      this.FLIPPERS_Y,
      "left"
    );
    this.rightFlipper = new Flipper(
      this,
      this.HALF + 100,
      this.FLIPPERS_Y,
      "right"
    );
    // walls
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
    // Add bumpers to the group
    const bumperPositions = [
      { x: 200, y: 180 }, // left below
      { x: 400, y: 180 }, // center below
      { x: 600, y: 180 }, // right below
      { x: 250, y: 130 }, // left above
      { x: 550, y: 130 }, // right above
      { x: 400, y: 110 }, // center above
    ];

    this.bumpers = bumperPositions.map((position) => {
      return new Bumper(this, position.x, position.y);
    });
    
  }

  initKeys() {
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

  initScore() {
    // Create the score text and set its position
    this.score = 500;
    this.scoreText = this.add.text(15, 15, "Score: " + this.score, {
      font: "26px Arial",
      fill: "#ffffff",
    });

    // this.scoreText = this.add.text(100, 100, 'distance: 0/20000', { fontSize: '28px', fill: "#fff", fontFamily: 'Arial'});
  }
  update() {
    if (Math.abs(this.ball.body.y) > this.game.config.height) {
      this.ball.body.setPosition(this.INIT_POS.x, this.INIT_POS.y);
      this.ball.body.setVelocity(0);

      // decrease the score by 100 points
      this.score -= 100;
      this.scoreText.setText("Score: " + this.score);
    }

    if (this.score <= 0) {
      this.score = 0;
      
      this.ball.destroy();

      // game over - lost
    }
  }
}
