export default class Flipper {
  constructor(scene, x, y, direction, key) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.LEVER = 50;
    this.WIDTH = 110;
    this.HEIGHT = 10;
    this.STIFFNESS = 0.1;
    this.BOUNCE = 1.5; // When something hits it bounces with this power
    this.ANGLE = 25;
    console.log(direction);
    // Left or right direction
    if (direction == "right") {
      this.MIN = Phaser.Math.DegToRad(-this.ANGLE);
      this.MAX = Phaser.Math.DegToRad(this.ANGLE);
    } else if (direction == "left") {
      this.MIN = Phaser.Math.DegToRad(this.ANGLE);
      this.MAX = Phaser.Math.DegToRad(-this.ANGLE);
    }

    this.init();
    this.addKey(key);
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
    this.flipper = this.scene.matter.add
      .gameObject(this.rectangle, {
        friction: 1,
      })
      .setBounce(this.BOUNCE);

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

  addKey(key) {
    this.key = this.scene.input.keyboard.addKey(key);
    this.key.on("down", () => {
      this.flip(true);
    });
    this.key.on("up", () => {
      this.flip(false);
    });
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

  destroy() {
    this.flipper.destroy();
    this.rectangle.destroy();
    this.lever.destroy();
    this.tweener.destroy();
  }
}
