
export default class Bumper {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = 0xefb243;
    this.radius = 20;
    this.points = 10;

    this.circle = this.scene.add.circle(
      this.x,
      this.y,
      this.radius,
      this.color
    );
    this.body = this.scene.matter.add
      .gameObject(this.circle, { friction: 1 })
      .setCircle(this.radius)
      .setBounce(1.2);

    // Make the balls stick
    this.scene.matter.add.worldConstraint(this.body, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.x, this.y),
      pointB: new Phaser.Math.Vector2(),
    });

    // handle collisions
    // Add the bumper to a group
    this.group = scene.add.group();
    this.group.add(this.circle);
    this.body.isSensor = true;
    this.scene.matterCollision.addOnColliderStart({
      objectA: this.body,
      callback: function (eventData) {
        // Check if the other object is the ball
        if (eventData.bodyB.gameObject instanceof Ball) {
          // Increase the score by the bumper's points value
          scene.score += this.points;
          scene.scoreText.setText("Score: " + scene.score);
        }
      },
      context: this,
    });
  }
}
