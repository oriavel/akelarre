import BaseGoatRun from "./BaseGoatRun.js";
import Bat from "./characters/Bat.js";
import Rock from "./characters/Rock.js";
import Spell from "./characters/Spell.js";
import BatDoble from "./characters/BatDoble.js";

export default class GoatRun_Nivel2 extends BaseGoatRun {
  constructor() {
    super("goatrun_nivel2");
  }

  createBackground() {
    this.background = this.add
      .tileSprite(0, 0, 800, 500, "cave2")
      .setOrigin(0)
      .setScrollFactor(0, 1);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, "ground2").setScale(2).refreshBody();
    this.platforms.create(400, 565, "ground2").setScale(2).refreshBody();
  }

  createBackground() {
    this.background = this.add
      .tileSprite(0, 0, 800, 500, "cave2")
      .setOrigin(0)
      .setScrollFactor(0, 1);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, "ground2").setScale(2).refreshBody();
    this.platforms.create(400, 565, "ground2").setScale(2).refreshBody();
  }

  createInitialScreen() {
    //Pantallita del texto
    this.graphics = this.add.graphics({
      x: this.game.config.width / 15,
      y: this.game.config.height / 3,
    });
    this.graphics.fillStyle(0x000000, 0.8);
    this.graphics.fillRect(0, 0, 700, 100);
    this.graphics.lineStyle(4, 0x000000, 1);
    this.graphics.strokeRect(0, 0, 700, 100);
    //El texto
    this.text = this.add.text(
      this.graphics.x + 150,
      this.graphics.y + 30,
      "Nivel 2: pulsa Enter para comenzar",
      { font: "24px Arial", fill: "#ffffff" }
    );
    this.text_ = this.add.text(
      this.graphics.x + 150,
      this.graphics.y + 30,
      "",
      { font: "24px Arial", fill: "#ffffff" }
    );
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.escape = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  createEnemies() {
    this.rocks = this.add.group();
    this.bats = this.add.group();
    this.spells = this.add.group();
    this.contBats = 0;
    const self = this;
    this.timer_enemies = this.time.addEvent({
      delay: Phaser.Math.Between(1800, 2200),
      loop: true,
      paused: true,
      callback: function () {
        var numAleatorio = Math.random();
        if (numAleatorio < 0.5) {
          // Generamos una piedra
          var objeto = new Rock(self, 950, 355, "rock2", self.player, 2);
          self.rocks.add(objeto);
        } else {
          // Generamos un murcielago
          var nAleatorio = Math.random();
          if (nAleatorio > 0.3) {
            let objeto = new BatDoble(self, 900, 250, "bat_doble", self.player);
            self.bats.add(objeto);
            self.contBats += 1;
          } else {
            let objeto = new Bat(self, 900, 250, "bat_doble", self.player);
            self.bats.add(objeto);
            self.contBats += 1;
          }
        }
        var hechizo_random = Math.random();
        if (hechizo_random < 0.15) {
          setTimeout(() => {
            let objeto = new Spell(
              self,
              950,
              350,
              "spell_gravity",
              self.player
            );
            self.spells.add(objeto);
            console.log("spell");
          }, 1000);
        }
      },
    });
  }

  checkLevel() {

    if (this.distance > 4000) {

      this.changeScene();
      this.isInvulnerable = false;
      setTimeout(() => {
        if (!this.firstTime) {
          this.music.stop();
          this.scene.stop("goatrun_nivel2");
          this.physics.pause();
          this.scene.start("goatrun_nivel3");
          this.firstTime = true;
        }
      }, 3000);
    }
  }
}
