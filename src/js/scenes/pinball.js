export default class Pinball extends Phaser.Scene {
  constructor() {
    super('Pinball');
  }

  initPhysics() {
    this.X = 300;
    this.Y = 320;
    this.LEVER = 64;
    this.WIDTH = 112;
    this.HEIGHT = 32;
    this.STIFFNESS = 0.1;
    this.MIN = Phaser.Math.DegToRad(32);
    this.MAX = Phaser.Math.DegToRad(-15);
  }


  create() {
    this.initPhysics();

    // add rectangle and its physics
    this.rectangle = this.add.rectangle(
      this.X,
      this.Y,
      this.WIDTH,
      this.HEIGHT,
      0x5a0571
    );

    this.flipper = this.matter.add.gameObject(this.rectangle, {
      friction: 1
    });
    
    // fixed point in the middle of the flipper
    this.matter.add.worldConstraint(this.flipper, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.X, this.Y),
     });

     
     // add ball
     this.circle = this.add.circle(this.X, 0, 16, 0xa3ff00);
     this.ball = this.matter.add.gameObject(this.circle).setCircle(16);

  } 
}