
import Bat from "./Bat.js";

export default class BatDoble extends Bat{

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
        this.anims.play('bat_doble', true);

        this.damage = 2; // Quita dos vidas
        this.scene.physics.add.overlap(this.scene.player, this, this.collisionHandler, null, this);
    
    }
}