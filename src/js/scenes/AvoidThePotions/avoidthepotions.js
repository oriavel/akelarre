import Witch from "./witch.js";
import Bats from "./Bats/Bats.js";
import GoldenBat from "./Bats/GoldenBats.js";
import Potion from "./Potions/Potion.js";
import PotionGreen from "./Potions/PotionGreen.js";
import PotionRed from "./Potions/PotionRed.js";
import PotionPink from "./Potions/PotionPink.js";
import Amaia from "./amaia.js";

export default class AvoidThePotions extends Phaser.Scene {
  constructor() {
    super({ key: "avoidthepotions" });
  }

  initPhysics() {
    this.physicsPlugin = this.physics.add;
    this.physicsPlugin.world.gravity.y = 300;
    this.physicsPlugin.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );
  }

  /**
   * Cargamos todos los assets que vamos a necesitar
   */
  loadMiniMalos() {
    // Mini malos
    this.load.spritesheet(
      "bat",
      this.assetsUrl + "AvoidThePotions/bat_spritesheet.png",
      { frameWidth: 31, frameHeight: 32 }
    );
    this.load.spritesheet(
      "golden_bat",
      this.assetsUrl + "AvoidThePotions/goldenbat_spritesheet.png",
      { frameWidth: 31, frameHeight: 32 }
    );
    this.load.spritesheet(
      "potionRED",
      this.assetsUrl + "AvoidThePotions/red_potion/red_full_potion.png",
      { frameWidth: 16, frameHeight: 16 }
    );
    this.load.spritesheet(
      "potionPINK",
      this.assetsUrl + "AvoidThePotions/pink_potion/pink_full_potion.png",
      { frameWidth: 16, frameHeight: 16 }
    );
    this.load.spritesheet(
      "potionGREEN",
      this.assetsUrl + "AvoidThePotions/green_potion/green_full_potion.png",
      { frameWidth: 16, frameHeight: 16 }
    );
    this.load.spritesheet(
      "potion",
      this.assetsUrl + "AvoidThePotions/yellow_potion/yellow_full_potion.png",
      { frameWidth: 16, frameHeight: 16 }
    );
  }
  loadImages() {
    const assetsATPUrl = this.assetsUrl + "AvoidThePotions/";
    let i;
    // Fire columns. 1-14
    for (i = 1; i < 15; i++) {
      this.load.image(
        "fire_column_" + i,
        assetsATPUrl + "columna_fuego/fire_column_medium_" + i + ".png"
      );
    }

    // Poison cloud. 1-19
    for (i = 1; i < 20; i++) {
      this.load.image(
        "poison_cloud_" + i,
        assetsATPUrl + "Poison Cloud/Poison Cloud" + i + ".png"
      );
    }

    // Bat Death. 1-5
    for (i = 1; i < 6; i++) {
      this.load.image(
        "bat_death_" + i,
        assetsATPUrl + "npc_death/FX001_0" + i + ".png"
      );
    }

    // Golpe suelo. 1-4, img de 5 a 8 TODO mirar
    for (i = 1; i < 5; i++) {
      const j = i + 4;
      this.load.image(
        "floor_kick_" + i,
        assetsATPUrl + "golpe_suelo/FX002_0" + j + ".png"
      );
    }
    // Golpe suelo pink. 1-4, img de 5-8 TODO mirar
    for (i = 1; i < 5; i++) {
      const j = i + 4;
      this.load.image(
        "floor_kick_pink_" + i,
        assetsATPUrl + "golpe_suelo_pink/FX002_0" + j + ".png"
      );
    }

    this.load.image("vacio", this.assetsUrl + "/cueva/vacio.png");
  }
  preload() {
    this.assetsUrl = "./src/assets/";

    this.load.script("bat", "src/js/scenes/AvoidThePotions/Bats/Bats.js");

    // poner un fondo decente
    this.load.image(
      "cave",
      this.assetsUrl + "AvoidThePotions/cueva_potions.png"
    );
    this.load.image("ground", this.assetsUrl + "AvoidThePotions/platform2.png");

    // Hacer una amaia original TODO
    this.load.spritesheet("amaia", this.assetsUrl + "Personajes/Prota.png", {
      frameWidth: 34,
      frameHeight: 34,
    });

    // el 1 y 2 son los que están en llamas
    this.load.spritesheet(
      "amaia_onFire",
      this.assetsUrl + "Personajes/Prota_ardiendo.png",
      { frameWidth: 34, frameHeight: 34 }
    );

    // Lo vamos a usar como las brujas de manera temporal TODO
    this.load.spritesheet(
      "witch",
      this.assetsUrl + "AvoidThePotions/BrujaEscoba.png",
      { frameWidth: 50, frameHeight: 32 }
    );

    this.loadMiniMalos();
    this.loadImages();

    this.load.audio('break_potion_audio', 'src/audio/potion_break.mp3');
    this.load.audio('bat_death_audio','src/audio/bat_death.mp3');
    this.load.audio('fire_audio','src/audio/fire1.mp3');
    this.load.audio('gameMusic_audio','src/audio/avoidThePotion.ogg');
    this.load.audio('ough_audio','src/audio/ough.mp3');
  }

  create() {
    this.background = this.add
      .tileSprite(0, 0, 800, 500, "cave")
      .setOrigin(0)
      .setScale(1.95);
    this.anims.create({
      key: "exploding_death_potion",
      frames: [
        { key: "fire_column_1" },
        { key: "fire_column_2" },
        { key: "fire_column_3" },
        { key: "fire_column_4" },
        { key: "fire_column_5" },
        { key: "fire_column_6" },
        { key: "fire_column_7" },
        { key: "fire_column_8" },
        { key: "fire_column_9" },
        { key: "fire_column_10" },
        { key: "fire_column_11" },
        { key: "fire_column_12" },
        { key: "fire_column_13" },
        { key: "fire_column_14" },
      ],
      frameRate: 10,
    });
    this.anims.create({
      key: "exploding_poison_potion",
      frames: [
        { key: "poison_cloud_1" },
        { key: "poison_cloud_2" },
        { key: "poison_cloud_3" },
        { key: "poison_cloud_4" },
        { key: "poison_cloud_5" },
        { key: "poison_cloud_6" },
        { key: "poison_cloud_7" },
        { key: "poison_cloud_8" },
        { key: "poison_cloud_9" },
        { key: "poison_cloud_10" },
        { key: "poison_cloud_11" },
        { key: "poison_cloud_12" },
        { key: "poison_cloud_13" },
        { key: "poison_cloud_14" },
        { key: "poison_cloud_15" },
        { key: "poison_cloud_16" },
        { key: "poison_cloud_17" },
        { key: "poison_cloud_18" },
        { key: "poison_cloud_19" },
      ],
      frameRate: 20,
    });
    this.anims.create({
      key: "bat",
      frames: this.anims.generateFrameNumbers("bat", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "goldenBat",
      frames: this.anims.generateFrameNumbers("golden_bat", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "bat_death",
      frames: [
        { key: "bat_death_1" },
        { key: "bat_death_2" },
        { key: "bat_death_3" },
        { key: "bat_death_4" },
        { key: "bat_death_5" },
      ],
      frameRate: 10,
    });
    this.anims.create({
      key: "floor_kick",
      frames: [
        { key: "floor_kick_1" },
        { key: "floor_kick_2" },
        { key: "floor_kick_3" },
        { key: "floor_kick_4" },
      ],
      frameRate: 8,
    });
    this.anims.create({
      key: "floor_kick_pink",
      frames: [
        { key: "floor_kick_pink_1" },
        { key: "floor_kick_pink_2" },
        { key: "floor_kick_pink_3" },
        { key: "floor_kick_pink_4" },
      ],
      frameRate: 8,
    });
    this.anims.create({
      key: "red_potion",
      frames: this.anims.generateFrameNumbers("potionRED", {
        start: 0,
        end: 7,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "pink_potion",
      frames: this.anims.generateFrameNumbers("potionPINK", {
        start: 0,
        end: 7,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "yellow_potion",
      frames: this.anims.generateFrameNumbers("potion", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "green_potion",
      frames: this.anims.generateFrameNumbers("potionGREEN", {
        start: 0,
        end: 6,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "amaia_running_left",
      frames: this.anims.generateFrameNumbers("amaia", { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "amaia_running_right",
      frames: this.anims.generateFrameNumbers("amaia", { start: 12, end: 15 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "amaia_stay",
      frames: this.anims.generateFrameNumbers("amaia", { start: 1, end: 1 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "amaia_burning_red",
      frames: this.anims.generateFrameNumbers("amaia_onFire", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: 2,
    });
    this.anims.create({
      key: "amaia_burning_green",
      frames: this.anims.generateFrameNumbers("amaia_onFire", {
        start: 2,
        end: 3,
      }),
      frameRate: 3,
      repeat: 2,
    });
    this.anims.create({
      key: "amaia_hit",
      frames: this.anims.generateFrameNumbers("amaia_onFire", {
        start: 6,
        end: 7,
      }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: "witch_right",
      frames: this.anims.generateFrameNumbers("witch", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "witch_left",
      frames: this.anims.generateFrameNumbers("witch", { start: 1, end: 1 }),
      frameRate: 1,
      repeat: -1,
    });
    this.initPhysics();
    this.physics.add.existing(this, { arcade: true });

    // Crea la bruja "witch"
    this.witch = new Witch(this, 50, 70);

    //Crea el suelo
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 564, "ground").setScale(2).refreshBody();

    // Crea el sprite para el personaje "amaia"
    this.amaia = new Amaia(this, 300, 400);

    // Inicialización de las variables para controlar el lanzamiento de pociones
    this.potionInterval = 1500;
    this.nextPotionTime = 0;

    // Inicialización de las variables para controlar la aparición de murciélagos
    this.nextBatTime = 0;

    // Crea un grupo para las pociones
    this.potionGroup = this.add.group({
      classType: Potion,
      runChildUpdate: true,
    });

    // Crea un grupo para los murciélagos
    this.batGroup = this.add.group({
      classType: Bats,
      runChildUpdate: true,
    });

    // Máximo número de murciélagos en pantalla y número de murciélagos creados
    this.batGroup.maxB = 3;
    this.batGroup.spwn = 0;

    this.cursors = this.input.keyboard.createCursorKeys();

    // Variable donde almaceno los fuegos de las pociones
    this.fireGroup = this.physics.add.group();
    // Duración de la partida
    this.tiempoInicio = 60000;
    this.temporizador = this.tiempoInicio;
    // Texto en pantalla
    this.livesLeft = this.add.text(16, 16, "Lives: " + this.amaia.lives, {
      fontSize: "32px",
      fill: "white",
      fontFamily: "font",
    });
    this.timeLeft = this.add.text(
      this.game.config.width - 250,
      16,
      "Time Left: " +
        Math.floor(this.temporizador / 60000) +
        "m " +
        Math.floor((this.temporizador % 60000) / 1000) +
        "s",
      { fontSize: "32px", fill: "white", fontFamily: "font" }
    );
    // Nivel inicial
    this.nivel = "facil";
    this.levelMultiplier = 1;

    // Pantalla de texto de inicio de partida
    this.graphics = this.add.graphics({
      x: this.game.config.width / 15,
      y: this.game.config.height / 3,
    });
    this.graphics.fillStyle(0x000000, 0.8);
    this.graphics.fillRect(0, 0, 700, 100);
    this.graphics.lineStyle(4, 0x000000, 1);
    this.graphics.strokeRect(0, 0, 700, 100);
    // El texto de inicio de partida
    this.text = this.add.text(
      this.graphics.x + 150,
      this.graphics.y + 10,
      "Para empezar la partida, pulsa ENTER \n   (↑) para saltar, (⇆) para moverte\n           ESCAPE para salir",
      { font: "24px Arial", fill: "#ffffff" }
    );

    // Teclas pantalla inicio / final
    this.escape = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.startGame = false;
    this.finishedGame = false;
    this.hasGanado = false;

    this.break_potion_audio =this.sound.add('break_potion_audio');
    this.bat_death_audio = this.sound.add('bat_death_audio');
    this.fire_audio = this.sound.add('fire_audio');
    this.gameMusic_audio = this.sound.add('gameMusic_audio');
    this.ough_audio = this.sound.add('ough_audio');
  }

  update() {

    this.livesLeft.setText("Lives: " + this.amaia.lives);
    if (!this.startGame && this.enterKey.isDown && !this.finishedGame) {
      this.text.setVisible(false);
      this.graphics.setVisible(false);
      this.startGame = true;
      this.tiempoInicio += this.time.now;
      this.gameMusic_audio.play();
    }
    else if(this.finishedGame){
      if(this.enterKey.isDown){
        this.hasGanado=false;
        this.gameMusic_audio.pause();
        this.gameMusic_audio.currentTime = 0;
        this.witch.death();
        this.amaia.death();
        this.create();
      }
      else if(Phaser.Input.Keyboard.JustDown(this.escape)){
        this.gameMusic_audio.pause();
        this.gameMusic_audio.currentTime = 0;
        this.scene.stop("avoidthepotions");
        if(this.hasGanado) this.scene.start("final");
        else this.scene.start("cueva");
        
        
      }
    }

    
    // Selecciona la animación correcta para Amaia en cada momento
    this.amaia.setSprite();

    // Selecciona el sprite correcto para la bruja en cada momento
    this.witch.setSprite();
    if (Phaser.Input.Keyboard.JustDown(this.escape)){
      this.amaia.lives = 0;
    }
    if (this.startGame && this.amaia.lives > 0 && this.temporizador > 0) {
      
      this.timeLeft.setText(
        "Time Left: " +
          Math.floor(this.temporizador / 60000) +
          "m " +
          Math.floor((this.temporizador % 60000) / 1000) +
          "s"
      );

      //Al llegar a la mitad de tiempo, aumentamos la dificultad
      if (this.temporizador < this.tiempoInicio / 2 && this.nivel == "facil") {
        this.nivel = "medio";
        this.levelMultiplier = 2;
        this.batGroup.maxB = 5;
      }

      // Con este if, evitamos que el tiempo se ponga en negativo
      if (this.tiempoInicio - this.time.now < 1) {
        this.temporizador = 0;
      } else {
        this.temporizador = this.tiempoInicio - this.time.now;
      }

      // Controla el movimiento del personaje "amaia"
      this.amaia.checkMovement(this.cursors);

      // Controla el lanzamiento de pociones por parte de la bruja "witch"
      if (this.time.now > this.nextPotionTime) {
        this.potionType = Math.floor(Math.random() * 4); // Hay cuatro tipos de pociones distintos
        // Creamos la poción aleatoriamente
        if (this.potionType == 1) {
          // Poción Roja, mata a Amaia (fuego rojo baja una vida)
          this.potion = new PotionRed(this, this.witch.x, this.witch.y);
        } else if (this.potionType == 2) {
          // Poción verde, baja la velocidad de Amaia a 50 (fuego baja velocidad /2)
          this.potion = new PotionGreen(this, this.witch.x, this.witch.y);
        } else if (this.potionType == 3) {
          // Pocion rosa, invierte los controles
          this.potion = new PotionPink(this, this.witch.x, this.witch.y);
        } else {
          // Poción Default, no puedes saltar durante 2,5 segundos
          this.potion = new Potion(this, this.witch.x, this.witch.y);
        }
        this.potionGroup.add(this.potion);
        // Anterior intervalo de tiempo generado aleatoriamente entre 0 y 4 segundos
        this.nextPotionTime = this.time.now + this.potionInterval;
        // Cambia el sentido de la bruja cada vez que tira una poción
        this.witch.changeDir();

        //generamos un tiempo aleatorio para la siguiente pocion, se reduce según el nivel de dificultad
        this.potionInterval = Math.floor(Math.random() * 4000);
        this.potionInterval = this.potionInterval / this.levelMultiplier;
      }

      // Controla la aparición de murciélagos y su movimiento
      // El if comprueba si ha pasado timepo suficiente y si no se supera el maximo
      // de murciélagos a la vez (3)
      if (
        this.time.now > this.nextBatTime &&
        this.batGroup.maxB > this.batGroup.spwn - this.amaia.nKills
      ) {
        // decidimos 50% el lado de aparicion del murcielago
        if (Math.random() > 0.5) {
          // 15% de posibilidades de que el murciélago sea dorado (+1 vida)
          if (Math.random() < 0.15)
            this.bat = new GoldenBat(
              this,
              20,
              375 + Math.random() * 80,
              100 + Math.random() * 200 * this.level
            );
          else
            this.bat = new Bats(
              this,
              20,
              375 + Math.random() * 80,
              100 + Math.random() * 200 * this.level
            );
        } else {
          if (Math.random() < 0.15)
            this.bat = new GoldenBat(
              this,
              this.game.config.width - 20,
              375 + Math.random() * 80,
              -100 + Math.random() * -200 * this.level
            );
          else
            this.bat = new Bats(
              this,
              this.game.config.width - 20,
              375 + Math.random() * 80,
              -100 + Math.random() * -200 * this.level
            );
        }
        //añadimos el murciélago al grupo y sumamos uno al total de murciélagos creados
        this.batGroup.add(this.bat);
        this.batGroup.spwn++;
        //generamos tiempos distintos para el tiempo de aparicion
        this.batInterval = Math.floor(2000 + Math.random() * 5000);
        this.nextBatTime = this.time.now + this.batInterval;
      }

      // Controla el movimiento y la colisión entre el personaje "amaia" y los murciélagos
      this.batGroup.getChildren().forEach(function (bat) {
        bat.checkMovement();
      }, this);

      this.potionGroup.getChildren().forEach(function (potion) {
        potion.checkPunishment();
      }, this);

      // Comprueba que pasen los milisegundos de castigo por la pocion de salto
      if (
        !this.amaia.canJump &&
        this.amaia.jumpTimer < this.time.now &&
        this.amaia.jumpTimer != 0
      ) {
        // si el valor es -1 quiere decir que acaba de caernos una pocion de salto
        // iniciamos la cuenta atrás
        if (this.amaia.jumpTimer == -1) {
          this.amaia.jumpTimer = 2000 + this.time.now;
        }
        // si el valor es distinto a -1 quiere decir que ya hemos cumplido el castigo
        // se nos devuelve la capacidad de salto
        else if (
          this.amaia.jumpTimer < this.time.now &&
          this.amaia.jumpTimer > 0
        ) {
          this.amaia.canJump = true;
          this.amaia.jumpTimer = 0;
        }
      }
      // Temporizador controles invertidos
      if (
        this.amaia.inversedControlsTimer < this.time.now &&
        this.amaia.inversedControlsTimer != 0
      ) {
        // si el valor es -1 quiere decir que acaba de caernos una pocion de inversion de controles
        // iniciamos la cuenta atrás
        if (this.amaia.inversedControlsTimer == -1) {
          this.amaia.inversedControlsTimer = 5000 + this.time.now;
        }
        // si el valor es distinto a -1 quiere decir que ya hemos cumplido el castigo
        // se nos devuelven los controles normales
        else if (
          this.amaia.inversedControlsTimer < this.time.now &&
          this.amaia.inversedControlsTimer > 0
        ) {
          this.amaia.inversedControlsTimer = 0;
          this.amaia.speed = -this.amaia.speed;
        }
      }
    } 
    else if (this.amaia.lives < 1 || this.temporizador < 1) {
      this.gameMusic_audio.stop();
      this.potionGroup.getChildren().forEach(function (potion) {
         potion.death();
      }, this);
      this.batGroup.getChildren().forEach(function (bat) {
        bat.death();
     }, this);

      if (this.amaia.lives < 1) {
        this.amaia.setVisible(false);
        this.text.setPosition(this.graphics.x + 70, this.graphics.y + 30);
        this.text.setText(
          "Has perdido, para volver a intentarlo pulsa Enter, \n                     para salir pulsa ESCAPE"
        );
      } else {
        this.text.setPosition(this.graphics.x + 70, this.graphics.y + 30);
        this.text.setText(
          "Has Ganado! Si quieres volver a jugar pulsa Enter, \n                     para salir pulsa ESCAPE"
        );
        this.hasGanado = true;
        this.game.config.keys++;
        this.amaia.gana();
        this.hasGanado = true;
      }
      this.witch.huye();

      this.text.setVisible(true);
      this.graphics.setVisible(true);
        
      this.startGame = false;
      this.finishedGame = true;
    }
  }
}
