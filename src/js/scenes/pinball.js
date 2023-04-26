export default class Pinball extends Phaser.Scene {
  /**
   * Escena principal.
   * @extends Phaser.Scene
   */
  constructor() {
    super({ key: "pinball" });
    this.physicsPlugin = null;
  }

  initPhysics() {
    this.physicsPlugin = this.physics.add;
    this.physicsPlugin.world.gravity.y = 300;
    this.physicsPlugin.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );
  }

  /**
   * Cargamos todos los assets del juego
   */
  preload() {
    this.load.image("ball", "src/assets/Pinball/ball.png");
    this.load.image("paddle", "src/assets/Pinball/flipper.png");
    this.load.image("block", "src/assets/Pinball/bumper.png");
  }

  /**
   * Crear elementos de la escena principal del juego
   */
  create() {
    this.initPhysics();

    // add ball
    this.ball = this.physics.add
      .image(50, 50, "ball")
      .setDisplaySize(50, 50)
      .setCollideWorldBounds(true)  // Collide against the canvas borders
      .setCircle(100)               // Circle area
      .setBounce(1);

    // add paddle
    this.paddle1 = this.physics.add
      .image(700, 500, "paddle")
      .setDisplaySize(100, 40)
      .setImmovable(true);

  

    // Cursor management
    this.cursors = this.input.keyboard.createCursorKeys();
    if(this.cursors.left.isDown){
      alert("Down");
    }
    // Score text
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "28px",
      fill: "#fff",
    });

    // Set up collisions
    //Ball hits paddle 1
    this.physics.add.collider(this.ball, this.paddle1, function () {
      this.ball.setVelocityY(-500);
      this.ball.setVelocityX(ball.body.velocity.x * 1.5);
    });
    
  }

  update() {
   // if(gameState.cursors.left.isDown) {
      this.scoreText.setText("hola");
      // this.paddle1.setAngle(-90);
      //this.paddle1.body.angularVelocity = -500;
    // } else {
    //   this.paddle1.setAngle(0);
    //   this.paddle1.body.angularVelocity = 500;
    // }

   
  }
}
