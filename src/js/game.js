/**
 * Clase Game de Phaser: crear e iniciar juego
 */
import Cueva from "./scenes/Cueva/cueva.js";
import AvoidThePotions from "./scenes/AvoidThePotions/avoidthepotions.js";
import Intro from "./scenes/Secuencias/intro.js";
import Final from "./scenes/Secuencias/final.js";
import Contexto from "./scenes/Secuencias/contexto.js";
import GoatRun_Nivel2 from "./scenes/GoatRun/goatrun_nivel2.js";
import GoatRun_Nivel3 from "./scenes/GoatRun/goatrun_nivel3.js";
import GoatRun_Nivel1 from "./scenes/GoatRun/goatrun_nivel1.js";
import Portada from "./scenes/Secuencias/Portada.js";
import PantallaFinal from "./scenes/Secuencias/pantallaFinal.js";
import PinballLevel1 from "./scenes/Pinball/levels/PinballLevel1.js";
import PinballLevel2 from "./scenes/Pinball/levels/PinballLevel2.js";

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById("game"),
  parent: "juego",
  width: 800,
  height: 600,
  keys: 0, //Piezas de llaves para los minijuegos
  key1: false,
  key2: false,
  key3: false,
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
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },

    matter: {
      debug: false,
      gravity: { y: 0.5 },
    },
  },

  scene: [
    Portada,
    Contexto,
    Intro,
    Cueva,
    PinballLevel1,
    PinballLevel2,
    AvoidThePotions,
    GoatRun_Nivel1,
    GoatRun_Nivel2,
    GoatRun_Nivel3,
    Final,
    PantallaFinal,
  ],

  title: "Akelarre",
  version: "0.0.1",
};

new Phaser.Game(config);