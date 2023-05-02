export default class Flipper {
  constructor(scene, x, y, direction) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.LEVER = 50;
    this.WIDTH = 110;
    this.HEIGHT = 10;
    this.STIFFNESS = 0.1;
    this.BOUNCE = 1.5; // When something hits it bounces with this power
    this.ANGLE = 25;


    // Left or right direction
    if (this.direction == "right") {
      this.MIN = Phaser.Math.DegToRad(-this.ANGLE);
      this.MAX = Phaser.Math.DegToRad(this.ANGLE);
    } else {
      this.MIN = Phaser.Math.DegToRad(this.ANGLE);
      this.MAX = Phaser.Math.DegToRad(-this.ANGLE);
    }

    this.init();
  }

  init() {
    // add rectangle and its physics
    this.rectangle = this.scene.add.rectangle(
      this.x,
      this.y,
      this.WIDTH,
      this.HEIGHT,
      0x5a0571
    );
    this.flipper = this.scene.matter.add.gameObject(this.rectangle, {
      friction: 1,
    }).setBounce(this.BOUNCE);

    // tweens: manipulate properties of objects to any given value
    this.tweener = {
      x: this.MIN,
    };

    // Sensor to move the flipper more naturally and constraint how it moves
    this.lever = this.scene.matter.add
      .image(
        this.x - Math.cos(this.tweener.x) * this.LEVER,
        this.y - Math.sin(this.tweener.x) * this.LEVER,
        null,
        null,
        {
          isSensor: true,
          isStatic: true,
        }
      )
      .setVisible(false);

    // fixed point in the middle of the flipper
    this.scene.matter.add.worldConstraint(this.flipper, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.x, this.y),
      pointB: new Phaser.Math.Vector2(),
    });

    this.scene.matter.add.constraint(
      this.flipper,
      this.lever.body,
      0,
      this.STIFFNESS,
      {
        pointA: new Phaser.Math.Vector2(
          (this.WIDTH - this.HEIGHT) / 2 + this.LEVER,
          0
        ),
      }
    );
  }

  flip(isDown) {
    this.scene.tweens.add({
      targets: [this.tweener],
      x: isDown ? this.MAX : this.MIN,
      duration: 50,
      onUpdateScope: this,
      onUpdate: () => {
        this.lever.setPosition(
          this.x - Math.cos(this.tweener.x) * this.LEVER,
          this.y - Math.sin(this.tweener.x) * this.LEVER
        );
      },
    });
  }
}
