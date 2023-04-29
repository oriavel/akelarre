
import GoatRun from "../../scenes/goatrun.js";

export default class Bat extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, player) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.player = player;
        this.setScale(2);
        this.body.setSize(12, 22);
        this.body.velocity.x = -180;
        this.outOfBoundsKill = true;
        this.checkWorldBounds = true;
        this.anims.play('bat', true);

        this.damage = 1;
        this.scene.physics.add.overlap(this.scene.player, this, this.collisionHandler, null, this);
    
    }

    getGravity(){
        return this.body.allowGravity;
    }

    getDamage(){
        return this.damage;
    }

    // Detecta a que distancia está del personaje para bajar e ir a por ella
    movimiento_bats(){
        if(Math.abs(this.scene.player.body.position.x - this.body.position.x) < 380){
            if(this.body.position.y > 215){ // OJO ESTO
                this.body.velocity.y += 0.4; 
                console.log("ggg" + this.scene.player.body.position.x);
            }
            else if (this.scene.player.body.position.x - 50 > this.body.position.x){
                this.body.velocity.y -= 0.5;
                console.log("fff");
            }
        }
        else{
            this.body.velocity.y += 0;
        }
    }

    collisionHandler(){
        if(this.scene.batCollision){
            this.scene.makeInvulnerable();
            this.scene.livesPlayer -= this.getDamage();
            this.setVisible(false);
            setTimeout(() => {
                console.log("aaaa");
                this.scene.isInvulnerable = false; // hacer que el sprite sea vulnerable de nuevo
                this.scene.player.alpha = 1; // establecer la opacidad del sprite en 1 (completamente visible)
                // this.scene.batsCollider.active = true;
                this.scene.batCollision = true;
                this.scene.rockCollision = true;
            }, 3600);
        } 
    }
}
    