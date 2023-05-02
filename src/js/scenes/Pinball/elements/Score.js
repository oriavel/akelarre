export default class Score {
  constructor(scene, goal, hitPoints, lifes) {
    this.scene = scene;
    this.GOAL = goal;
    this.INIT_LIVES = lifes;
    this.HIT_POINTS = hitPoints;

    this.lifes = lifes; // substract one when ball falls out
    this.score = 0; // add +HIT_POINTS when ball hits bumpers
    this.scoreText = this.scene.add.text(20, 50, "Score: " + this.score, {
      font: "24px Arial",
      fill: "#ffffff",
    });
    this.lifeText = this.scene.add.text(20, 20, "Vidas: " + this.lifes, {
      font: "24px Arial",
      fill: "#ffffff",
    });
  }
  updateTexts() {
    this.scoreText.setText("Score: " + this.score);
    this.lifeText.setText("Vidas: " + this.lifes);
  }
  decreaseLife(l = 1) {
    if (this.lifes > 0) {
      this.lifes -= l;
      this.updateTexts();
      if (this.lifes === 0) {
        this.scene.gameOver();
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