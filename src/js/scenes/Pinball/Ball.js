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
    .setDisplaySize(this.radius*2, this.radius*2)
    .setCircle(1);
                  // Circle area
    
    // this.image = this.scene.add.image(this.x, this.y, "ball" );
    this.body = this.scene.matter.add.gameObject(this.image).setCircle(this.radius);
  }

  destroy() {
    this.image.destroy();
    this.body.destroy();
  }

}
