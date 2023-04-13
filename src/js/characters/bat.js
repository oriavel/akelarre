
export default class Bat extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, tam, imageName) {
        super(scene, x, y, imageName);
        /*
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this, this.scene.layer5);
        this.initialize(tam)
        this.hp = 2;
  
        this.myScore = 10;
        this.animation();
        */
    }

    update(player){
        console.log(Math.abs(player.body.x - this.body.x));
        if (Math.abs(player.body.x - this.body.x) < 100){
            this.body.velocity.x -= 80;
            this.body.velocity.y -= 10;
            console.log("murcielago baja");
        }
        else{
            // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
            this.body.velocity.x = -80;
            console.log("muercielago normal");
        }
    }
}