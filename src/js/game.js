/**
 * Clase Game de Phaser: crear e iniciar juego
 */
import GoatRun from './scenes/goatrun.js';
import Cueva from './scenes/cueva.js';
import Pinball from './scenes/pinball.js';
import pociones from './scenes/avoidthepotions.js'

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    parent: "juego",
    width: 640 ,
    height: 480,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 640,
            height: 480
        },
		zoom: 1
    },
    physics: {
        default: "matter",
        matter: {
          gravity: {
            y: 0.5
          },
          debug: true
        }
      },
    scene: [Pinball],
    title: "Akelarre",
    version: "0.0.1"
};

new Phaser.Game(config);
