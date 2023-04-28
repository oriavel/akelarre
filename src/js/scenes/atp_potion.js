import AvoidThePotions from "./avoidthepotions.js";

export default class Potion extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);
    
    this.potionVelocity = 75;
    
    
    this.play("yellow_potion").setScale(3);
    this.setSize(16,16);
    this.body.velocity.y = this.potionVelocity;
    
    //this.scene.physics.add.collider(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    //this.scene.physics.add.collider(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  }


  death(){
    var potion_air_explosion = this.scene.add.sprite(this.body.x+15, this.body.y+5, 'bat_death').setScale(2);
    this.setVisible = false;
    potion_air_explosion.play('bat_death');
    potion_air_explosion.on('animationcomplete', () => {
    // Eliminar el sprite una vez que la animación haya terminado
    potion_air_explosion.destroy();
    }); 
    this.destroy();
  }

  collisions(){
    this.scene.physics.collide(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.collide(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  }

  potionCollisionPlatform(potion, platforms){
    /*
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
    
  
  else if(potion.getData("type") == 3){ //Pocion PINK
      var pink_explosion = this.add.sprite(potion.body.x+26, potion.body.y+30, 'floor_kick_pink').setScale(1.15);
      pink_explosion.play('floor_kick_pink');
      pink_explosion.on('animationcomplete', () => {
          // Eliminar el sprite una vez que la animación haya terminado
          pink_explosion.destroy();
      });
  }
  else{
    */
    var default_explosion = this.scene.add.sprite(potion.body.x+26, potion.body.y+30, 'floor_kick').setScale(1.15);
    default_explosion.play('floor_kick');
    default_explosion.on('animationcomplete', () => {
      // Eliminar el sprite una vez que la animación haya terminado
      default_explosion.destroy();
    });
    potion.body.destroy();
    potion.destroy();
  }

   
  
  potionCollisionHandler(amaia,potion){
    /*
    
    else if(potion.getData("type") == 3){ //Pocion PINK
        //controles invertidos
        if(this.amaia.speed >0){
            amaia.speed = -amaia.speed;
        }
        amaia.inversedControlsTimer = -1;
    }
    */
    //Pocion Default
    amaia.canJump = false;
    amaia.jumpTimer = -1;
    
    potion.body.destroy();
    potion.destroy();
  }
}

