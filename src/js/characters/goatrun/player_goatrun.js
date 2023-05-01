
// import BaseGoatRun from "./BaseGoatRun";

export default class Player_Goatrun extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5, 0.3);
        this.setScale(1.6); 
        this.body.setSize(15,35);
    }

    jumps(){
        this.scene.jump = true;
        this.body.setVelocityY(-250);
        this.anims.play('jump_amaia', true);
    }

    alreadyJumping(){
        if (this.body.velocity.y < 0) { // Va hacia arriba
            this.anims.play('jump_amaia', true);
        } else if (this.body.velocity.y > 0) { // Va hacia abajo
            this.anims.play('fall_amaia', true);
        }
        else{ // Está en el aire
            this.anims.play('still_amaia', true);
        }
    }

    agacharse(){
        this.anims.play('amaia_agachada', true);
        this.body.setSize(15,20);
        this.setOrigin(0.5, 0.3).setScale(1.6);
        this.body.setOffset(20, 20);
        this.scene.changeCollider = false;
    }

    aterrizar(){
        this.scene.jump = false; // No permitimos el doble salto de esta manera
        this.anims.play('right_amaia_goats', true);
    }

    colliderNormal(){
        this.setOrigin(0.5, 0.3).setScale(1.6);
        this.body.setSize(15,35);
        this.scene.changeCollider = true;
    }

    deathfromGoat(){
        this.body.position.x += 50;
    }

    reachEnd(){
        this.body.position.x += 2.5;
    }

    deathScene_(){
        this.anims.play('amaia_death', true);
        this.body.setSize(15,35);
        this.setOrigin(0.5, 0.32).setScale(1.6);
    }
}