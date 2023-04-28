import atp_bats from "./atp_bats.js";

export default class GoldenBat extends atp_bats {
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
    // 15% de posibilidades de que salga un murciélago dorado
    //////////this.tipo = "default";
    this.sumaVida = 1;
    //this.create();

  }
}
