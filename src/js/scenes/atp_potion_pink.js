
import atp_potion from './atp_Potion.js';

export default class PotionGreen extends atp_potion{
  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);
    
    this.potionVelocity = 75;
    
    
    this.play("pink_potion").setScale(3);
    this.setSize(16,16);
    this.body.velocity.y = this.potionVelocity;
    this.scene.physics.add.collider(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.add.collider(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  }

  potionCollisionPlatform(potion, platforms){
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
    var pink_explosion = this.scene.add.sprite(potion.body.x+26, potion.body.y+30, 'floor_kick_pink').setScale(1.15);
    pink_explosion.play('floor_kick_pink');
    pink_explosion.on('animationcomplete', () => {
      // Eliminar el sprite una vez que la animación haya terminado
      pink_explosion.destroy();
    });
    
    potion.body.destroy();
    potion.destroy();
  }

  potionCollisionHandler(amaia,potion){
    //controles invertidos
    if(amaia.speed >0){
      amaia.speed = -amaia.speed;
    }
    amaia.inversedControlsTimer = -1;
    potion.body.destroy();
    potion.destroy();
  }

}