
import GoatRun from "../../scenes/GoatRun/goatrun.js";

export default class Bat extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite, player) {
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.player = player;
        this.setScale(2);
        // this.initVariables();
    }

    movimiento_bats(){
        switch (this.anims.currentAnim.key) {
            case 1:
                this.setSize(10, 10);
                console.log("llega aqui anim murci");
                break;
            case 2:
                this.setSize(80, 80);
                console.log("llega a la segunda");
                break;
            // agregar más casos según sea necesario para cada animación
            default:
                this.setSize(15, 22); // tamaño predeterminado
                break;
        }
        console.log("llega al movimiento bats");
        if(Math.abs(this.player.body.position.x - this.body.position.x) < 155){
            if(this.body.position.y > 215){ // OJO ESTO
                this.body.velocity.y += 0.4; 
            }
            else if (this.body.position.y < 215){
                this.body.velocity.y -= 0.5;
            }
        }
        else{
            this.body.velocity.y += 0;
        }
    }
}
    