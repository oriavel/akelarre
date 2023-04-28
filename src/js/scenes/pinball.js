export default class Pinball extends Phaser.Scene {
  constructor() {
    super({
      key: "Pinball",
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: 0.5 },
        },
      },
    });
  }

  initPhysics() {
    this.X = 300;
    this.Y = 400;
    this.LEVER = 64;
    this.WIDTH = 112;
    this.HEIGHT = 32;
    this.STIFFNESS = 0.1;
    this.MIN = Phaser.Math.DegToRad(32);
    this.MAX = Phaser.Math.DegToRad(-15);
  }

  flip(isDown) {
    this.tweens.add({
      targets: [this.tweener],
      x: isDown ? this.MAX : this.MIN,
      duration: 50,
      onUpdateScope: this,
      onUpdate: () => {
        this.lever.setPosition(
          this.X - Math.cos(this.tweener.x) * this.LEVER,
          this.Y - Math.sin(this.tweener.x) * this.LEVER
        );
      },
    });
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
      friction: 1,
    });
    // tweens: manipulate properties of objects to any given value
    this.tweener = {
      x: this.MIN,
    };

    // Sensor to move the flipper more naturally and constraint how it moves
    this.lever = this.matter.add
      .image(
        this.X - Math.cos(this.tweener.x) * this.LEVER,
        this.Y - Math.sin(this.tweener.x) * this.LEVER,
        null,
        null,
        {
          isSensor: true,
          isStatic: true,
        }
      )
      .setVisible(false);

    // fixed point in the middle of the flipper
    this.matter.add.worldConstraint(this.flipper, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.X, this.Y),
      pointB: new Phaser.Math.Vector2(),
    });

    this.matter.add.constraint(
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

    // add ball
    this.circle = this.add.circle(this.X, 0, 16, 0xa3ff00);
    this.ball = this.matter.add.gameObject(this.circle).setCircle(16);

    // input key for flipper
    var space = this.input.keyboard.addKey("space");

    space.on("down", () => {
      this.flip(true);
    });

    space.on("up", () => {
      this.flip(false);
    });
  }

  update() {
    if (Math.abs(this.ball.y) > this.game.config.height) {
      this.ball.setPosition(this.X, 0);
      this.ball.setVelocity(0);
    }
  }
}
