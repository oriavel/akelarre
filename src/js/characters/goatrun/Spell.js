

export default class Spell extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, player) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.player = player;
        this.body.velocity.x = -200;
        this.firstTime = false;
        this.checkWorldBounds = true;
        this.body.setSize(40, 40);
        this.anims.play('spell_gravity', true);

        this.scene.physics.add.overlap(this.scene.player, this, this.collisionHandler, null, this);

    }

    /*
    El momento en el que colisiona, el jugador jugará con otra gravedad durante 8 segundos
    */
    collisionHandler(){
        this.scene.physics.world.gravity.y = 200;
        this.setVisible(false);
        this.scene.hechizado = true;
        const self = this;
        setTimeout(() => {
            if(!this.firstTime){
                self.scene.physics.world.gravity.y = 400;
                this.scene.hechizado = false;
                this.body.destroy();
                this.destroy();
                this.firstTime = true;
            } 
        }, 8000);

    }
}