export default class Wall {
  constructor(scene, x, y, angle, bar = "0 0 0 500 10 500 10 0") {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = 0xefb243;
    this.angle = angle;
    // add enclosing side bars
    this.poly = this.scene.add.polygon(this.x, this.y, bar, this.color, 1);
    this.scene.matter.add
      .gameObject(this.poly, {
        shape: { type: "fromVerts", verts: bar, flagInternal: true },
        isStatic: true,
        angle: this.angle,
      })
      .setBounce(1);
  }
}
