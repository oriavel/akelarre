export default class Score {
  constructor(scene, goal, hitPoints) {
    this.scene = scene;
    this.GOAL = goal;
    this.INIT_LIVES = 3;
    this.HIT_POINTS = hitPoints;

    this.lifes = 3; // substract one when ball falls out
    this.score = 0; // add +HIT_POINTS when ball hits bumpers
    this.scoreText = this.scene.add.text(
      20,
      scene.game.config.height - 95,
      "Score: " + this.score + "/" + this.GOAL,
      {
        font: "20px Arial",
        fill: "#ffffff",
      }
    );

    // print lifes
    const xHrt = 40;
    const yHrt = scene.game.config.height - 50;
    this.heart1 = this.scene.add.sprite(xHrt, yHrt, "hearts");
    this.heart2 = this.scene.add.sprite(xHrt + 40, yHrt, "hearts");
    this.heart3 = this.scene.add.sprite(xHrt + 80, yHrt, "hearts");
    this.scene.anims.create({
      key: "heart_filled",
      frames: [{ key: "hearts", frame: 1 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "heart_empty",
      frames: [{ key: "hearts", frame: 0 }],
      frameRate: 20,
    });
    this.heart1.anims.play("heart_filled", true);
    this.heart2.anims.play("heart_filled", true);
    this.heart3.anims.play("heart_filled", true);
  }

  createHearts() {}
  updateTexts() {
    this.scoreText.setText("Score: " + this.score + "/" + this.GOAL);
    switch (this.lifes) {
      case 0:
        this.heart1.anims.play("heart_empty", true);
        this.heart2.anims.play("heart_empty", true);
        this.heart3.anims.play("heart_empty", true);
        break;
      case 1:
        this.heart2.anims.play("heart_empty", true);
        this.heart3.anims.play("heart_empty", true);
        break;
      case 2:
        this.heart3.anims.play("heart_empty", true);
        break;
    }
  }
  decreaseLife(l = 1) {
    if (this.lifes > 0) {
      this.lifes -= l;
      this.updateTexts();
      if (this.lifes === 0) {
        this.scene.gameOver(false);
      }
    }
  }

  addPoints() {
    this.score += this.HIT_POINTS;
    this.updateTexts();
    if (this.score >= this.GOAL) {
      this.scene.gameOver(true); // true means player won
    }
  }
}
