import Flipper from "./Flipper.js";
import Ball from "./Ball.js";
import Bumper from "./Bumpers.js";
export default class Pinball extends Phaser.Scene {
  constructor() {
    super({
      key: "Pinball",
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: 0.6 },
        },
      },
    });
  }

  initPhysics() {
    this.X = 240;
    this.Y = 400;
    
    this.ball = new Ball(this, this.X, 0, 16, 0xa3ff00);
    this.leftFlipper = new Flipper(this, 260, 500);
    this.rightFlipper = new Flipper(this, 550, 500);
    
    // Add bumpers to the group
    const bumperPositions = [
      { x: 200, y: 160 }, // left below
      { x: 400, y: 160 }, // center below
      { x: 600, y: 160 }, // right below
      { x: 250, y: 110 }, // left above
      { x: 550, y: 110 }, // right above
      { x: 400, y: 90 } // center above
    ]

    this.bumpers = bumperPositions.map((position) => {
      return new Bumper(this, position.x, position.y);
    });

  }

initKeys(){
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

initScore(){
   // Create the score text and set its position
   this.score = 500;
   this.scoreText = this.add.text(15, 15, "Score: " + this.score, {
    font: "28px Arial",
    fill: "#ffffff"
  });

  // this.scoreText = this.add.text(100, 100, 'distance: 0/20000', { fontSize: '28px', fill: "#fff", fontFamily: 'Arial'});
}
  create() {
    this.initPhysics();
    this.initKeys();
    this.initScore();
   
  }

  update() {
    if (Math.abs(this.ball.body.y) > this.game.config.height) {
      this.ball.body.setPosition(this.X, 0);
      this.ball.body.setVelocity(0);

      // decrease the score by 100 points
      this.score -= 100;
      this.scoreText.setText("Score: " + this.score);
    }

    if(this.score <= 0) {
      this.ball.destroy();
      // game over - lost
    }
  
  }
}
