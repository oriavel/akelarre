export default class Ball {
  constructor(scene, x, y, radius, color) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    // add the ball to the scene
    this.image = this.scene.physics.add
      .image(this.x, this.y, "ball")
      .setDisplaySize(this.radius * 2, this.radius * 2)
      .setCircle(1);
    // Circle area
    this.body = this.scene.matter.add
      .gameObject(this.image)
      .setCircle(this.radius, {
        label: "Ball",
      });

    scene.matter.world.on("collisionstart", (event) => {
      event.pairs.forEach((collision) => {
          if ((collision.bodyA.label === "Ball" && collision.bodyB.label === "Bumper") ||
            (collision.bodyB.label === "Ball" && collision.bodyA.label === "Bumper")) {
            this.handleCollision();
          }

      });
    });
  }
  handleCollision() {
    if (!this.hitBall) {
      this.scene.score += 10;
    }
  }
  destroy() {
    this.image.destroy();
    this.body.destroy();
  }
}
