import BaseGoatRun from "./BaseGoatRun.js";
import Rock from "./characters/Rock.js";
import Bat from "./characters/Bat.js";
import BatDoble from "./characters/BatDoble.js";
import Spell from "./characters/Spell.js";
import FireRock from "./characters/FireRock.js";

export default class GoatRun_Nivel3 extends BaseGoatRun {
  /**
   * Escena principal.
   * @extends Phaser.Scene
   */
  constructor() {
    super("goatrun_nivel3");
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    super.create();
    this.winGame = false;
  }

  /**
   * Loop del juego
   */

  update() {
    if (this.enterKey.isDown) {
      this.text.setVisible(false);
      this.text_.setVisible(false);
      this.graphics.setVisible(false);
      this.startGame = true;
    }
    if (this.startGame && !this.restart) {
      if (this.firstStart) {
        // Si es la primera vez que se empieza
        this.goat.anims.play("right_goat", true);
        this.timer_enemies.paused = false;
        this.firstStart = false;
      }
      if (!this.amaiaIsDeath) {
        this.background.tilePositionX += 0.8;
        this.distance += 1;

        this.scoreText.setText("Distance: " + (this.distance || "") + "/4000");

        this.movimientoEnemies();

        if (this.cursors.up.isDown) {
          if (!this.jump) {
            // Si no está saltando
            this.player.jumps();
          }
        }
        if (this.jump) {
          // Si está saltando ya
          this.player.alreadyJumping();
          if (this.cursors.down.isDown && this.player.body.touching.down) {
            this.player.agacharse();
            this.jump = false;
          }
        }

        if (this.player.body.touching.down && !this.cursors.down.isDown) {
          // Si amaia está tocando el suelo
          this.player.aterrizar();
        }

        if (this.cursors.down.isDown) {
          // Si se presiona 'abajo'
          if (!this.jump) {
            // Solo si no está saltando, si está en el aire no se puede agachar
            this.player.agacharse();
          }
        } else if (!this.changeCollider) {
          this.player.colliderNormal();
        }
        /*
        if (this.cursors.left.isDown) {
          // Prueba para comprobar animación de muerte
          this.deathScene();
          this.amaiaIsDeath = true;
        }
        */

        if (this.hechizado == true) {
          this.hechizoText.setVisible(true);
        } else {
          this.hechizoText.setVisible(false);
        }

        if (!this.isInvulnerable) {
          this.player.alpha = 1;
        }

        this.checkLives();
        // if(!this.endGame){
        this.checkLevel();
        /*
                    if(this.winGame){
                        if (this.enterKey.isDown){
                            console.log("gana");
                            this.scene.stop('goatrun_nivel3');
                            this.physics.pause();
                            this.scene.start('cueva');
                            this.firstTime = true;
                        }
                    }
                    */
      }
    } else if (this.restart) {
      if (this.winGame) {
        if (this.enterKey.isDown) {
          // Reinicia el juego
          console.log("gana");
          if (!this.game.config.key3) {
            this.game.config.keys++;
            this.game.config.key3 = true;
          }
          this.music.stop();
          this.scene.stop(this.key);
          this.scene.start("cueva");
        }
      } else {
        if (this.enterKey.isDown) {
          // Reinicia el juego
          console.log("pierde");
          this.music.stop();
          this.scene.stop(this.key);
          this.scene.start("goatrun_nivel1");
        } else if (this.cursors.left.isDown) {
          // (this.escape.isDown){ // Vuelve a la cueva
          this.music.stop();
          this.scene.stop(this.key);
          this.scene.start("cueva");
        }
      }
    }
  }

  createBackground() {
    this.background = this.add
      .tileSprite(0, 0, 800, 500, "cave3")
      .setOrigin(0)
      .setScrollFactor(0, 1);
    this.background.setScale(2);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, "ground3").setScale(2).refreshBody();
    this.platforms.create(400, 565, "ground3").setScale(2).refreshBody();
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
      "Nivel 3: pulsa Enter para comenzar",
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
          var nA = Math.random();
          if (nA > 0.4) {
            var objeto = new Rock(self, 950, 350, "rock3", self.player, 3);
            self.rocks.add(objeto);
          } else {
            // 1 de cada 2 aproximadamente son rocas que te matan (llenas de fuego)
            var objeto = new FireRock(self, 950, 350, "fire_column_1", self.player, 3);
            self.rocks.add(objeto);
          }
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
          this.winGame = true;
          this.winScreen();
          this.firstTime = true;
          this.timer_enemies.paused = true;
          this.player.destroy();
        }
      }, 3000);
    }
  }

  winScreen() {
    this.graphics2 = this.add.graphics({
      x: this.game.config.width / 15,
      y: this.game.config.height / 3,
    });
    this.graphics2.fillStyle(0x000000, 0.8);
    this.graphics2.fillRect(0, 0, 700, 140);
    this.graphics2.lineStyle(4, 0x000000, 1);
    this.graphics2.strokeRect(0, 0, 700, 100);
    //El texto
    this.text2 = this.add.text(
      this.graphics2.x + 235,
      this.graphics2.y + 20,
      "Escapaste de la cabra!",
      { font: "24px Arial", fill: "#ffffff" }
    );
    this.text3 = this.add.text(
      this.graphics2.x + 165,
      this.graphics2.y + 60,
      "Pulse Enter para volver a la cueva",
      { font: "24px Arial", fill: "#ffffff" }
    );
    this.restart = true;
  }
}
