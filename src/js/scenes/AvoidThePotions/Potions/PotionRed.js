
import Potion from './Potion.js';

export default class PotionRed extends Potion{
  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);
    
    this.potionVelocity = 75;
    
    
    this.play("red_potion").setScale(3);
    this.setSize(16,16);
    this.body.velocity.y = this.potionVelocity;
    this.scene.physics.add.collider(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.add.collider(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  
    
  }

  collisions(){
    this.scene.physics.collide(this.scene.amaia, this, this.potionCollisionHandler, null, this);
    this.scene.physics.collide(this, this.scene.platforms, this.potionCollisionPlatform, null, this);
  }

  potionCollisionPlatform(potion, platforms){
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
    var red_explosion = this.scene.add.sprite(potion.body.x+30, potion.body.y-20, 'exploding_death_potion').setScale(2);
    red_explosion.play('exploding_death_potion');
    var collider_fire = this.scene.fireGroup.create(potion.body.x+30, potion.body.y,'vacio').setScale(1.15);
    collider_fire.body.allowGravity = false;
    collider_fire.setSize(30,90);
    collider_fire.tipo = "RED";
    this.scene.physics.add.collider(this.scene.amaia, collider_fire, this.seQUEMA, null, this);
      
    red_explosion.on('animationcomplete', () => {
        // Eliminar el sprite una vez que la animación haya terminado
        red_explosion.destroy();
        collider_fire.destroy();
    });
    potion.body.destroy();
    potion.destroy();
  }

  seQUEMA(amaia,col){
    col.disableBody(true,true);
    /*
    col.disableBody(true,true);
    
    if(col.tipo == "GREEN"){
        amaia.speed /=2;
    }
    else if(col.tipo == "RED"){
      */
    amaia.isHurt = col.tipo;
    amaia.lives--;
    console.log("Te quemas, te quedan "+amaia.lives+" vidas...");
  }

  potionCollisionHandler(amaia, potion){
    console.log("Daño de pocion: " + potion.getData("type"));
    amaia.lives = 0; //muere
    potion.body.destroy();
    potion.destroy();
  }
}