/**
 * Clase Game de Phaser: crear e iniciar juego
 */
import Cueva from './scenes/cueva.js';
import Pinball from "./scenes/Pinball/pinball.js";
import AvoidThePotions from "./scenes/AvoidThePotions/avoidthepotions.js";
import Intro from "./scenes/Secuencias/intro.js";
import Final from './scenes/Secuencias/final.js';
import Contexto from './scenes/Secuencias/contexto.js';
import GoatRun_Nivel2 from './scenes/GoatRun/goatrun_nivel2.js';
import GoatRun_Nivel3 from './scenes/GoatRun/goatrun_nivel3.js';
import GoatRun_Nivel1 from './scenes/GoatRun/goatrun_nivel1.js';

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    //parent: "juego",
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
    scene: [Cueva, Pinball, AvoidThePotions, GoatRun_Nivel1, GoatRun_Nivel2, GoatRun_Nivel3, Intro, Final, Contexto],
    title: "Akelarre",
    version: "0.0.1"
};

new Phaser.Game(config, gameManager);