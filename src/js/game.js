/**
 * Clase Game de Phaser: crear e iniciar juego
 */
import GoatRun from './scenes/goatrun.js';
import Cueva from './scenes/cueva.js';
import PinballScene from './scenes/pinball.js';

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    parent: "juego",
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
            width: 2312,
            height: 752
        },
		zoom: 1
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    scene: [Cueva],
    title: "Akelarre",
    version: "0.0.1"
};

new Phaser.Game(config);
