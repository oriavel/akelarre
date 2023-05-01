

export default class Rock extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, player, rock) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.player = player;
        if(rock == 1){
            this.setScale(0.6);
            this.body.setSize(80, 80);
        }
        else if(rock == 2){ // Mas dificil de saltar que la anterior
            this.setScale(0.4);
            this.body.setSize(100, 150);
        }
        else{ // Algunas pueden tener fuego...
            this.setScale(0.5);
            this.body.setSize(80, 115);
        }
        this.body.velocity.x = -200;
        this.outOfBoundsKill = true;
        this.checkWorldBounds = true;
        this.scene.physics.add.overlap(this.scene.player, this, this.collisionHandler, null, this);
    }

    collisionHandler(){
        if(this.scene.rockCollision){
            this.scene.makeInvulnerable();
            this.scene.player.body.position.x -= 50; // Simplemente retrocedemos unos metros para atrás
            this.scene.player.body.setVelocityX(+0);
            this.body.setVelocityX(-200);
            setTimeout(() => {
                console.log("aaaa");
                this.scene.isInvulnerable = false; // hacer que el sprite sea vulnerable de nuevo
                this.scene.player.alpha = 1; // establecer la opacidad del sprite en 1 (completamente visible)
                this.scene.rockCollision = true;
                this.scene.batCollision = true;
            }, 3600);
        }
    }
}