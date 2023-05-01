export default class Witch extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene,x,y);
        // Agregar la clase al juego
        scene.add.existing(this);
    
        // Agregar la física al objeto
        scene.physics.add.existing(this);
    
        // Configurar las propiedades de la física
        this.body.setCollideWorldBounds(true);
        
        this.play('witch_right');
        this.setScale(2.25);
        this.setSize(35,25);
        this.body.setOffset(10,0);
        this.body.allowGravity = false;
    }

    setSprite(){
        if(this.body.velocity.x > 0) this.play("witch_right",true);
        else if (this.body.velocity.x < 0) this.play("witch_left",true);
    }

    changeDir(){
        if(this.body.velocity.x > 0 || this.x + this.width >= this.scene.game.config.width) 
            this.body.velocity.x = -200;
        else this.body.velocity.x = 200;
    }
    restart(){
        this.body.velocity.x = 0;
        this.body.x = 20;
        this.body.setCollideWorldBounds(true);
    }
    death(){
        this.destroy();
    }
    huye(){
        this.body.velocity.x = -250;
        this.body.setCollideWorldBounds(false);
    }
}