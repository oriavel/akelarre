/**
 * Clase Game de Phaser: crear e iniciar juego
 */
<<<<<<< Updated upstream
import GoatRun from './scenes/goatrun.js';
import Cueva from './scenes/cueva.js';
import pociones from './scenes/avoidthepotions.js'
=======
import GoatRun from './scenes/GoatRun/goatrun.js';
import Cueva from './scenes/cueva.js';
import AvoidThePotions from './scenes/AvoidThePotions/avoidthepotions.js';
import Intro from './scenes/intro.js';

var gameManager = {
    keys : 0
};
>>>>>>> Stashed changes

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    //parent: "juego",
    width:  800,
    height: 600,
<<<<<<< Updated upstream
=======
    keys : 0, //Piezas de llaves para los minijuegos
>>>>>>> Stashed changes
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
<<<<<<< Updated upstream
=======
        
>>>>>>> Stashed changes
		min: {
            width: 328,
            height: 188
        },
		max: {
<<<<<<< Updated upstream
            width: 2312,
            height: 752
=======
            width: 1112,
            height: 552
>>>>>>> Stashed changes
        },
		zoom: 1
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
<<<<<<< Updated upstream
            debug: true
=======
            debug: false
>>>>>>> Stashed changes
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
<<<<<<< Updated upstream
    scene: [pociones],
=======
scene: [Intro, Cueva, GoatRun, AvoidThePotions],


>>>>>>> Stashed changes
    title: "Akelarre",
    version: "0.0.1"
};

<<<<<<< Updated upstream
new Phaser.Game(config);
=======
new Phaser.Game(config, gameManager);
>>>>>>> Stashed changes
