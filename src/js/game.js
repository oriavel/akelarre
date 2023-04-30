/**
 * Clase Game de Phaser: crear e iniciar juego
 */
import GoatRun from "./scenes/GoatRun/goatrun.js";
import Cueva from "./scenes/cueva.js";
import Pinball from "./scenes/Pinball/pinball.js"
import AvoidThePotions from "./scenes/AvoidThePotions/avoidthepotions.js";
import Intro from "./scenes/intro.js";

var gameManager = {
  keys: 0,
};

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById("game"),
  parent: "juego",
  width: 800,
  height: 600,
  keys: 0,  //Piezas de llaves para los minijuegos
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_TOTAL,
    mode: Phaser.Scale.FIT,

    min: {
      width: 328,
      height: 188,
    },
    max: {
      width: 1112,
      height: 552,
    },
    zoom: 1,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 }
    },
    matter: {
      debug: true,
      gravity: { y: 0.5 }
    }
  },
  scene: [Pinball],

  title: "Akelarre",
  version: "0.0.1",
};

new Phaser.Game(config, gameManager);