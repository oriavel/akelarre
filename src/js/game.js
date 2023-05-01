/**
 * Clase Game de Phaser: crear e iniciar juego
 */

import GoatRun from "./scenes/GoatRun/goatrun.js";
import Cueva from "./scenes/Cueva/cueva.js";
import Pinball from "./scenes/Pinball/pinball.js";
import AvoidThePotions from "./scenes/AvoidThePotions/avoidthepotions.js";
import Intro from "./scenes/Secuencias/intro.js";
import Final from './scenes/Secuencias/final.js';
import Contexto from './scenes/Secuencias/contexto.js';



  
  let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("game"),
    parent: "juego",
    width: 800,
    height: 600,
    keys: 0,  //Piezas de llaves para los minijuegos
    minijuego: 0,
    pixelArt: true,
    scale: {
      autoCenter: Phaser.Scale.CENTER_TOTAL,
      mode: Phaser.Scale.FIT,
  
      min: {
        width: 328,
        height: 188,
      },
      max: {
        width: 800,
        height: 600,
      },
      zoom: 1,
    
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
  scene: [Contexto, Intro, Cueva, GoatRun, AvoidThePotions,Pinball, Final],

  title: "Akelarre",
  version: "0.0.1",


};

new Phaser.Game(config);