/**
 * Clase Game de Phaser: crear e iniciar juego
 */
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    width:  800,
    height: 600,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Akelarre",
    version: "0.0.1"
};

new Phaser.Game(config);
