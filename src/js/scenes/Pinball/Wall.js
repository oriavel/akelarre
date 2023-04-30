export default class Wall {
  constructor(scene, x, y, angle) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = 0xefb243;
    this.angle = angle;
    var bar = "0 0 0 440 10 440 10 0";
    // add enclosing side bars
    this.poly = this.scene.add.polygon(this.x, this.y, bar, this.color, 0.2);
    this.scene.matter.add
      .gameObject(this.poly, {
        shape: { type: "fromVerts", verts: bar, flagInternal: true },
        isStatic: true,
        angle: this.angle,
      })
      .setBounce(0.9);
  }
}
