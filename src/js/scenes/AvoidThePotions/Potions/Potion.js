
export default class Potion extends Phaser.GameObjects.Sprite {

  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    this.scene.physics.add.collider(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.add.collider(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
    this.scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);
    
    this.potionVelocity = 75;
    
    
    this.play("yellow_potion").setScale(3);
    this.body.setSize(16,16);
    this.body.velocity.y = this.potionVelocity;
    
    
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
  

  potionCollisionPlatform(potion, platforms){
    
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
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
    
    //Pocion Default
    amaia.canJump = false;
    amaia.jumpTimer = -1;
    
    potion.body.destroy();
    potion.destroy();
  }
  checkPunishment(){
    // Esta poción no tiene castigo
    // En la rosa y la verde hace que se cumpla el tiempo de duración de sus efectos
  }
}

