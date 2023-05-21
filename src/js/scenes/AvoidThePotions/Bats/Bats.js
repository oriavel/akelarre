
export default class Bats extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x,y) {
    super(scene,x,y);
    // Agregar la clase al juego
    scene.add.existing(this);
  
    // Agregar la física al objeto
    scene.physics.add.existing(this);
  
    // Configurar las propiedades de la física
    this.body.setCollideWorldBounds(false);

    this.play("bat").setScale(1.4);
    this.setSize(15,15);
    this.body.allowGravity = false;
    this.body.velocity.x = 200;
    // 15% de posibilidades de que salga un murciélago dorado
    //////////this.tipo = "default";
    this.sumaVida = 0;
    //this.create();
    if(x < 100) this.setFlipX(true);
    else this.setFlipX(false);

  }


  // Función que comprueba tanto el movimiento de los murciélagos como la colisión con Amaia
  checkMovement(){
    // Cambia las direcciones de los murciélagos al chocar con los laterales
    if (this.body.position.x < 0 || this.body.position.x > this.scene.game.config.width -20) {
      this.body.velocity.x *= -1;
      if(this.body.position.x < 0 ) this.setFlipX(true);
      else this.setFlipX(false);
    }
    this.scene.physics.collide(this.scene.amaia, this, this.batCollisionHandler, null, this);
  }

  death(){
    var bat_dying = this.scene.add.sprite(this.body.x+15, this.body.y+5, 'bat_death').setScale(2);
      bat_dying.play('bat_death');
      this.scene.bat_death_audio.play();
      bat_dying.on('animationcomplete', () => {
          // Eliminar el sprite una vez que la animación haya terminado
          bat_dying.destroy();
      });
      this.body.destroy();
      this.destroy();
  }

  // Esta función gestiona la colisión con Amaia
  batCollisionHandler(amaia, bat) {
    // si al chocar amaia no se encuentra por encima del murcielago, la que sufre daño es ella
    if(amaia.y < bat.y-35){
      if(this.scene.amaia.lives < 3) this.scene.amaia.lives += this.sumaVida;
      // El murciélago muere
      this.death();

      //si está bajo los efectos de la pocion de inversion de controles
      if(amaia.speed <= 200 && amaia.speed > 0){
        amaia.speed = 200;
      }
      else{
        amaia.speed = -200;
      }
      amaia.nKills++;
      amaia.body.velocity.y = -100;
    }
    else{
      amaia.nKills++;
      this.death();
      amaia.pain_sound();
      amaia.isHurt = "HIT";
      amaia.lives--;
    }
    
  }
  
}

