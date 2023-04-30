export default class Ball {
    constructor(scene, x, y, radius, color) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
  
      // add the ball to the scene
      this.circle = this.scene.add.circle(this.x, this.y, this.radius, this.color);
      this.body = this.scene.matter.add
      .gameObject(this.circle)
      .setCircle(this.radius);
    }
  
    destroy() {
      this.circle.destroy();
      this.body.destroy();
    }

    getBounds() {
        const { bounds } = this.body;
        const { center } = this.circle;
        const left = center.x - bounds.width / 2;
        const top = center.y - bounds.height / 2;
        return new Phaser.Geom.Circle(left, top, bounds.width, bounds.height);
    }

  }
  