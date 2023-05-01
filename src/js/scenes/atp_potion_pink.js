
import atp_potion from './atp_Potion.js';

<<<<<<< Updated upstream:src/js/scenes/atp_potion_pink.js
export default class PotionGreen extends atp_potion{
=======
export default class PotionPink extends Potion{
>>>>>>> Stashed changes:src/js/scenes/AvoidThePotions/Potions/PotionGreen.js
  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);
    
    this.potionVelocity = 75;
    
    
    this.play("green_potion").setScale(3);
    this.setSize(16,16);
    this.body.velocity.y = this.potionVelocity;
    this.scene.physics.add.collider(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.add.collider(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  }

  potionCollisionPlatform(potion, platforms){
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
    var green_explosion = this.scene.add.sprite(potion.body.x+30, potion.body.y-35, 'exploding_poison_potion').setScale(1.15);
    var collider_fire = this.scene.fireGroup.create(potion.body.x+30, potion.body.y,"vacio").setScale(1.15);
    green_explosion.play('exploding_poison_potion');
    this.scene.break_potion_audio.play();
    collider_fire.body.allowGravity = false;
    collider_fire.setSize(37,80);
    collider_fire.tipo = "GREEN";
    this.scene.physics.add.collider(this.scene.amaia, collider_fire, this.seQUEMA, null, this);
      
    green_explosion.on('animationcomplete', () => {
        // Eliminar el sprite una vez que la animación haya terminado
        collider_fire.destroy();
        green_explosion.destroy();
    });
    
    potion.body.destroy();
    potion.destroy();
  }

  seQUEMA(amaia,col){
    col.disableBody(true,true);
    amaia.speed /=2;
    amaia.isHurt = col.tipo;
  }

  potionCollisionHandler(amaia,potion){    
    amaia.pain_sound();
    //velocidad movimiento amaia a un cuarto hasta que mate un murciélago
    amaia.speed = 50;
    potion.body.destroy();
    potion.destroy();
  }
}