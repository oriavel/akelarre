export default class Ball {
  constructor(scene, x, y, radius = 16) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = radius;

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
        if (
          (collision.bodyA.label === "Ball" &&
            collision.bodyB.label === "Bumper") ||
          (collision.bodyB.label === "Ball" &&
            collision.bodyA.label === "Bumper")
        ) {
          this.handleCollision();
        }
      });
    });
  }
  handleCollision() {
    this.scene.score.addPoints();
  }

  update() {
    if (this.body && this.image) {
      if (Math.abs(this.body.y) > this.scene.game.config.height) {
        this.body.setPosition(this.x, this.y); // bring to the initial position
        this.body.setVelocity(0); // reset velocity
        this.scene.score.decreaseLife(); // decrease life
      }
    }
  }
}
