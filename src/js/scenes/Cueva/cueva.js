import Prota from './Prota.js'
import DialogoBox from '../Secuencias/dialogos.js'

/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import * as Matter from 'akelarre/node_modules/matter-js/build/matter.js';
let length = 0;
let enPortal = false;
export default class Cueva extends Phaser.Scene {
  /**
   * Escena principal.
   * @extends Phaser.Scene
   */

  constructor() {
    super({ key: "cueva" });
  }

  /**
   * Cargamos todos los assets que vamos a necesitar
   */

  preload() {
    //Cargar NPCs
    this.load.spritesheet("motos", "src/assets/Personajes/PabloM.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("vacio", "src/assets/Cueva/vacio.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    //Cargar portales:
    this.load.image("portal1", "src/assets/Cueva/Portal1.png");
    this.load.image("portal2", "src/assets/Cueva/Portal2.png");
    this.load.image("portal3", "src/assets/Cueva/Portal3.png");
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    console.log(this.game.config.keys);
    this.audioCueva = this.sound.add("cueva_audio");
    this.audioCueva.play();

    //Cueva
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("PatronCueva", "tiles");

    var suelo = map.createLayer("suelo", tileset);
    var layer = map.createLayer("obstaculos", tileset);

    layer.setCollisionByExclusion([-1 , 0]);

    //Prota
      
    this.player = new Prota(this, 975, 1450);

    this.physics.add.collider(this.player, layer);
    this.player.setDepth(2);
    
    //NPCs

    this.bruja3 = this.physics.add.sprite(1555,390, 'bruja3').setScale(2);
    this.bruja3.setSize(15, 15);
    this.bruja3.setDepth(1);
    this.bruja3.body.offset.y = 16;
    this.bruja3.body.immovable = true;

    this.motos = this.physics.add.sprite(1595, 1100, 'motos').setScale(2);
    this.motos.setSize(15, 15);
    this.motos.setDepth(1);
    this.motos.body.offset.y = 16;
    this.motos.body.immovable = true;

    this.gato = this.physics.add.sprite(690,1360, 'gato').setScale(2);
    this.gato.setSize(15, 15);
    this.gato.setDepth(1);
    this.gato.body.offset.y = 8;
    this.gato.body.immovable = true;

    //Objetos interactuables
    
    this.estanteria = this.physics.add.sprite(400, 390, 'vacio').setScale(2);
    this.estanteria.setSize(15, 15);
    this.estanteria.setDepth(1);
    this.estanteria.body.offset.y = 16;
    this.estanteria.body.immovable = true;

    this.caldero = this.physics.add.sprite(465, 400, 'vacio').setScale(2);
    this.caldero.setSize(15, 15);
    this.caldero.setDepth(1);
    this.caldero.body.offset.y = 16;
    this.caldero.body.immovable = true;

   
    this.portal1 = this.physics.add.sprite(1030, 540, 'portal1').setScale(0.6); //El rojo (pociones)
    this.portal1.setSize(50,50);
    this.portal1.body.offset.x = 90;
    this.portal1.body.offset.y = 150;
    this.portal1.setVisible(false);

    this.portal2 = this.physics.add.sprite(805, 730, 'portal2').setScale(0.6); //El verde (Pinball)
    this.portal2.setSize(50,50);
    this.portal2.body.offset.x = 90;
    this.portal2.body.offset.y = 150;
    this.portal2.setVisible(false);

    this.portal3 = this.physics.add.sprite(1252, 730, 'portal3').setScale(0.6); //El azul(cabra)
    this.portal3.setSize(50,50);
    this.portal3.body.offset.x = 90;
    this.portal3.body.offset.y = 150;
    this.portal3.setVisible(false);

    this.cartel1 = this.physics.add.sprite(1040, 535, 'vacio').setScale(1);
    this.cartel2 = this.physics.add.sprite(815, 725, 'vacio').setScale(1);
    this.cartel3 = this.physics.add.sprite(1265, 725, 'vacio').setScale(1);

    this.portalesVisibles = false; //Para saber si estan visibles o no

    this.dialogBox = new DialogoBox(this, 0x000000);
    this.dialogBox.createBox();
    
    this.dialogBoxBruja3 = new DialogoBox(this, 0x205b17);
    this.dialogBoxBruja3.createBox();
    
    //Teclas para dialogo
    this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


    this.addOverlap(this.player,this.bruja3, this.dialogBox.getDialogo(0),"María",this.dialogBoxBruja3 );
    this.addOverlap(this.player,this.motos, this.dialogBox.getDialogo(1),"Pablo Motos",this.dialogBox );
    this.addOverlap(this.player,this.gato, this.dialogBox.getDialogo(2), "Gato",this.dialogBox );
    this.addOverlap(this.player,this.estanteria, this.dialogBox.getDialogo(3),"Amaia",this.dialogBox );
    this.addOverlap(this.player,this.caldero, this.dialogBox.getDialogo(4),"Amaia",this.dialogBox );
    this.addOverlap(this.player,this.cartel1, this.dialogBox.getDialogo(5),"Amaia",this.dialogBox );
    this.addOverlap(this.player,this.cartel2, this.dialogBox.getDialogo(6),"Amaia",this.dialogBox );
    this.addOverlap(this.player,this.cartel3, this.dialogBox.getDialogo(7),"Amaia",this.dialogBox );

    this.addOverlapPortales(this.player,this.portal1,this.dialogBox.getDialogo(8),"Amaia" );
    this.addOverlapPortales(this.player,this.portal2,this.dialogBox.getDialogo(8),"Amaia" );
    this.addOverlapPortales(this.player,this.portal3,this.dialogBox.getDialogo(8),"Amaia" );
  


    //Movimientos
    this.anims.create({
        key: 'right_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 12, end: 15 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'stop_right_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 15, end: 15 }),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: 'left_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 8, end: 11 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'stop_left_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 11, end: 11 }),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: 'up_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 4, end: 7 }),
        frameRate: 4,
        repeat: -1
    });


    this.anims.create({
        key: 'down_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'stop_down_amaia',
        frames: this.anims.generateFrameNumbers('amaia', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: -1
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player, true);


    //Tecla enter para minijuegos
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.player.anims.play('stop_up_amaia', true);

    if(this.game.config.minijuego == 1){
      this.portal1.setVisible(true);
      this.portal2.setVisible(true);
      this.portal3.setVisible(true);
      this.portalesVisibles = true;
      this.player.setPosition(980, 700);
    }
    if(!this.game.config.dGatoInicio){
      this.dialogoInicio(this.dialogBox.getDialogo(11), this.dialogBox, "gato"); //Para asegurar que se ve bien al gato
    }
  }

  dialogoInicio(dialogo, dialogBox, nombre){ //Dialogo que asegura que se ve al gato
    dialogBox.setPosicion(975, 1450);
    dialogBox.setNombre(nombre);
    dialogBox.visible(true);
    this.player.setHablando(true);
    if (length < dialogo.length) {
      dialogBox.setTexto(dialogo[length]);
      length++;
    }
    else{
      dialogBox.visible(false);
      this.player.setHablando(false);
      this.game.config.dGatoInicio = true;
      length = 0;
    }
  }

  addOverlap(player, npc, dialogo, nombre, dialogBox) {
    this.physics.add.overlap(player, npc, () => {
      dialogBox.setPosicion(npc.x, npc.y);

      dialogBox.setNombre(nombre);
      if (Phaser.Input.Keyboard.JustDown(this.espacio)) {
        dialogBox.visible(true);
        this.player.setHablando(true);
        this.player.resetMov();

        if (length < dialogo.length) {
          dialogBox.setTexto(dialogo[length]);
          length++;
        } else {
          if (nombre == "María") {
            this.portal1.setVisible(true);
            this.portal2.setVisible(true);
            this.portal3.setVisible(true);
            this.portalesVisibles = true;
          }

          dialogBox.visible(false);
          this.player.setHablando(false);
          length = 0;
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.escape)) {
        dialogBox.visible(false);
        this.player.setHablando(false);
        length = 0;
      }
    });
  }

  addOverlapPortales(player, portal, dialogo, nombre) {
    this.physics.add.overlap(player, portal, () => {
      this.dialogBox.setPosicion(portal.x - 45, portal.y - 60);

      this.dialogBox.setNombre(nombre);

      if (
        Phaser.Input.Keyboard.JustDown(this.espacio) &&
        this.portalesVisibles
      ) {
        this.dialogBox.visible(true);
        this.player.setHablando(true);
        this.player.resetMov();
        enPortal = true;
        this.portal = portal;
        if (this.portal.x == this.portal1.x && this.game.config.keys != 2) {
          this.dialogBox.setTexto(
            "No deberia de entrar hasta que no tenga las otras \n2 piezas... \n(Pulsa ESC para salir)"
          );
        } else {
          this.dialogBox.setTexto(dialogo[0]);
        }
      }
    });
  }

  salirPortal() {
    this.dialogBox.visible(false);
    this.player.setHablando(false);
    enPortal = false;
    length = 0;
  }

  //Loop del juego
  update() {
    if(!this.game.config.dGatoInicio && Phaser.Input.Keyboard.JustDown(this.espacio)){
      this.dialogoInicio(this.dialogBox.getDialogo(11), this.dialogBox, "gato");
    }
    if (!this.player.isHablando() && !enPortal) {
      this.player.checkMovement(this.cursors);
    }

    this.player.setSprite();

    if (Phaser.Input.Keyboard.JustDown(this.enter) && enPortal) {

      if (this.portal == this.portal1 && this.game.config.keys == 2) {
        enPortal = false;
        this.game.config.minijuego = 1;
        this.audioCueva.pause();
        this.audioCueva.currentTime = 0;
        this.scene.stop(this);
        this.scene.start("avoidthepotions");
        
      } else if (this.portal == this.portal2) {
        enPortal = false;
        this.game.config.minijuego = 1;
        this.audioCueva.pause();
        this.audioCueva.currentTime = 0;
        this.scene.stop(this);
        this.scene.start("PinballLevel1");
      } else if (this.portal == this.portal3) {
        enPortal = false;
        this.game.config.minijuego = 1;
        this.audioCueva.pause();
        this.audioCueva.currentTime = 0;
        this.scene.stop(this);
        this.scene.start("goatrun_nivel1");
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.escape) && enPortal) {
      this.salirPortal(this.dialogBox);
    }
    if (!this.audioCueva.isPlaying) {
      this.audioCueva.play();
    }
  }
}
