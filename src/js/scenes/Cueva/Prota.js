export default class Amaia extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y) {
        super(scene,x,y);
        // Agregar la clase al juego
        scene.add.existing(this);
      
        // Agregar la física al objeto
        scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, this.scene.platforms, null,null, this);

        // Configurar las propiedades de la física
        this.body.setCollideWorldBounds(true);
    
        this.play("amaia_stay").setScale(2);
        this.body.setSize(16,25);
        this.body.setOffset(9,8);
        this.speed = 200;
        this.canJump = true;
        this.inversedControlsTimer = 0;
        this.jumpTimer = 0;
        this.nKills = 0;
        this.lives = 2;
        this.isHurt = "none";
    
    }    
    setSprite(){
        if(this.isHurt != "none"){
            if(this.isHurt == "RED"){
                this.anims.play("amaia_burning_red",true);
            }
            else if(this.isHurt == "GREEN"){
                this.anims.play("amaia_burning_green",true);
            }
            else if(this.isHurt == "HIT"){
                this.anims.play("amaia_hit",true);
            }
            this.on('animationcomplete', () => {
                // Una vez termina la animacion, se desactiva la animación
                this.isHurt = "none";
            });
        }
        else if(this.body.velocity.x > 0){
            this.play("amaia_running_right",true);
        }
        else if (this.body.velocity.x < 0){
            this.play("amaia_running_left",true);
        }
        else if (this.body.velocity.x == 0){
            this.play("amaia_stay",true);
        }
    }
    checkMovement(cursors){
        if (cursors.left.isDown){ 
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = 0;
        }
        else if (cursors.right.isDown){
        this.body.velocity.x = +this.speed;
        this.body.velocity.y = 0;
        }
        if (cursors.up.isDown){ 
            this.body.velocity.y = -this.speed;
            this.body.velocity.x = 0;
        }
        else if (cursors.down.isDown){
        this.body.velocity.y = +this.speed;
        this.body.velocity.x = 0;
        }
        if(!cursors.left.isDown && !cursors.right.isDown) 
            this.body.velocity.x = 0;
        
    }
    
}