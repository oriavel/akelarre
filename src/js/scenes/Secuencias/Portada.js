export default class Portada extends Phaser.Scene {
	
	constructor() {
		super({ key: 'portada' });
	}
	
    preload(){
        this.load.image('fondo', 'src/assets/Cueva/Portada.png');
        this.load.image('boton', 'src/assets/Cueva/botonStart.png');
    }

    create(){
        this.fondo = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'fondo');
        // botón de inicio
        this.startButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'boton').setOrigin(0, 0);
        this.startButton.scale = 1;
        this.startButton.x -= this.startButton.displayWidth / 2;
        this.startButton.y -= this.startButton.displayHeight * 2/ 5 + 10;
        this.startButton.setInteractive();
        this.startButton.on('pointerup',()=>{
			this.scene.stop('initial');
            this.scene.start('context');

		})
    }

}