export default class Bumper {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = 20;

    this.circle = this.scene.physics.add
      .image(this.x, this.y, "rock")
      .setDisplaySize(this.radius * 2, this.radius * 2)
      .setCircle(1);

    this.body = this.scene.matter.add
      .gameObject(this.circle, { friction: 1 })
      .setCircle(this.radius, {
        label: "Bumper",
      })
      .setBounce(1.2);

    // Make the balls stick
    this.scene.matter.add.worldConstraint(this.body, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.x, this.y),
      pointB: new Phaser.Math.Vector2(),
    });
  }
}
