export default class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, dialog, player) {
        super(scene,x,y);

        // Agregar la clase al juego
        scene.add.existing(this);
      
        // Agregar la física al objeto
        scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, this.scene.layer, null,null, this);

        // Configurar las propiedades de la física
        this.body.setCollideWorldBounds(false);

        this.dKey = dialog;
    
    }
    
    setSprite(){
        if(this.body.velocity.x > 0){
            this.play("right_amaia",true);
            this.animation = 1;
        }
        else if (this.body.velocity.x < 0){
            this.play("left_amaia",true);
            this.animation = 2;
        }
        else if(this.body.velocity.y > 0){
            this.play("down_amaia",true);
            this.animation = 3;
        }
        else if (this.body.velocity.y < 0){
            this.play("up_amaia",true);
            this.animation = 4;
        }
        else {
             if (this.animation == 1) 
                 this.anims.play("stop_right_amaia", true);
             else if (this.animation == 2) {
               this.anims.play("stop_left_amaia", true);
             }
             else if (this.animation == 3) {
                this.anims.play("stop_down_amaia", true);
              } 
             else if (this.animation == 4) {
               this.anims.play("stop_up_amaia", true);
             } 
             
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
        else if (cursors.up.isDown){ 
            this.body.velocity.y = -this.speed;
            this.body.velocity.x = 0;
        }
        else if (cursors.down.isDown){
        this.body.velocity.y = +this.speed;
        this.body.velocity.x = 0;
        }
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        
    }
    
}