import Rock from "./Rock.js";

export default class FireRock extends Rock{

    constructor(scene, x, y, sprite, player, rock) {
        super(scene, x, y, sprite, player, rock);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.player = player;
        this.setScale(1.2);
        this.setOrigin(0.5, 0.5);
        this.body.setSize(20, 40);
        this.body.velocity.x = -200;
        this.outOfBoundsKill = true;
        this.checkWorldBounds = true;
        this.anims.play('fire_rock', true);

        this.scene.physics.add.overlap(this.scene.player, this, this.collisionHandler, null, this);
    
    }

    collisionHandler(){
        if(this.scene.rockCollision){
            this.scene.makeInvulnerable();
            this.scene.livesPlayer = 0; // Muerte inmediata
            this.body.setVelocityX(-200);
        }
    }
}