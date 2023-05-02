export default class Bumper {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = 0xefb243;
    this.radius = 20;
   
    this.circle = this.scene.add.circle(
      this.x,
      this.y,
      this.radius,
      this.color
    );
    this.body = this.scene.matter.add
      .gameObject(this.circle, { friction: 1 })
      .setCircle(this.radius, {
        label: "Bumper"
      })
      .setBounce(1.2);

    // Make the balls stick
    this.scene.matter.add.worldConstraint(this.body, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.x, this.y),
      pointB: new Phaser.Math.Vector2(),
    });
  
  }
  }

  // update() {
  //   // reset hitByBall flag when ball is no longer in contact with bumper
  //   if (this.hitByBall && !this.body.isCollidingWithBody(this.scene.ball.body)) {
  //     this.hitByBall = false;
  //     this.color = 0xefb243;
  //     this.circle.setFillStyle(this.color);
  //   }
  // }

