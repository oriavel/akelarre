import Bats from "./Bats.js";

export default class GoldenBat extends Bats {
  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);

    this.play("goldenBat").setScale(1.4);
    this.setSize(15,15);
    this.body.allowGravity = false;
    this.body.velocity.x = 200;
    // 15% de posibilidades de que salga un murciélago dorado
    //////////this.tipo = "default";
    this.sumaVida = 1;
    //this.create();
    if(x < 100) this.setFlipX(true);
    else this.setFlipX(false);
  }
}
