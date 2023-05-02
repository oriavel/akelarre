export default class PantallaFinal extends Phaser.Scene {
	
	constructor() {
		super({ key: 'pantallaFinal' });
	}

    preload(){
        this.load.image('end', 'src/assets/Cueva/PantallaFinal.png');
    }
    create(){
        this.fondo = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'end');
    }
}