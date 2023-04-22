import Matter from "matter-js";

export default class PinballScene extends Phaser.Scene {
  constructor() {
    super({ key: "PinballScene" });
  }

  initPhysics() {
    this.physicsPlugin = this.physics.add;
    this.physicsPlugin.world.gravity.y = 300;
    this.physicsPlugin.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    
  }
  preload() {
    // Load assets here
    this.load.image("ball", "src/assets/ball.png");
    this.load.image("flipper", "src/assets/flipper.png");
    this.load.image("bumper", "src/assets/bumper.png");
  }

  create() {
    // add background image
    this.add.image(0, 0, "background").setOrigin(0, 0);

    // add ball
    const ball = this.matter.add.image(400, 300, "ball").setCircle();
    ball.setBounce(0.5);
    ball.setFriction(0);
    ball.setFrictionAir(0.01);
    ball.setMass(0.5);

    // add flippers
    const leftFlipper = this.matter.add
      .image(200, 550, "flipper")
      .setRectangle(100, 20);
    leftFlipper.setStatic(true);
    leftFlipper.setFriction(0);
    leftFlipper.setMass(10);
    leftFlipper.rotation = -0.5;

    const rightFlipper = this.matter.add
      .image(600, 550, "flipper")
      .setRectangle(100, 20);
    rightFlipper.setStatic(true);
    rightFlipper.setFriction(0);
    rightFlipper.setMass(10);
    rightFlipper.rotation = 0.5;

    // add bumpers
    const bumper1 = this.matter.add.image(100, 200, "bumper").setCircle();
    bumper1.setBounce(1);
    bumper1.setFriction(0);
    bumper1.setMass(5);

    const bumper2 = this.matter.add.image(700, 200, "bumper").setCircle();
    bumper2.setBounce(1);
    bumper2.setFriction(0);
    bumper2.setMass(5);

    // add keyboard input for flippers
    const cursors = this.input.keyboard.createCursorKeys();

    cursors.left.on("down", () => {
      leftFlipper.rotation = -1;
      leftFlipper.setAngularVelocity(-10);
    });

    cursors.left.on("up", () => {
      leftFlipper.rotation = -0.5;
      leftFlipper.setAngularVelocity(10);
    });

    cursors.right.on("down", () => {
      rightFlipper.rotation = 1;
      rightFlipper.setAngularVelocity(10);
    });

    cursors.right.on("up", () => {
      rightFlipper.rotation = 0.5;
      rightFlipper.setAngularVelocity(-10);
    });

    // add collisions
    this.matter.world.setBounds(0, 0, 800, 600);

    this.matter.add.rectangle(400, 600, 800, 20, { isStatic: true });
    this.matter.add.rectangle(0, 300, 20, 600, { isStatic: true });
    this.matter.add.rectangle(800, 300, 20, 600, { isStatic: true });

    this.matter.add.collider(ball, leftFlipper);
    this.matter.add.collider(ball, rightFlipper);
    this.matter.add.collider(ball, [bumper1, bumper2]);
  }
}
