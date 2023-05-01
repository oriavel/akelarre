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
		super({ key: 'cueva' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */

	preload(){

        //Cargar cueva:
        this.load.image('tiles', 'src/assets/Caves.png')
        this.load.tilemapTiledJSON('tilemap', 'src/assets/Cueva.json')

        //Cargar NPCs
        this.load.spritesheet('motos', 'src/assets/Personajes/PabloM.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('vacio','src/assets/vacio.png', { frameWidth: 32, frameHeight: 32 });

        //Cargar portales:
        this.load.image('portal1', 'src/assets/Portal1.png');
        this.load.image('portal2', 'src/assets/Portal2.png');
        this.load.image('portal3', 'src/assets/Portal3.png');

    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(){
        
        this.game.config.keys = 2;
        
        //Cueva
        const map = this.make.tilemap({ key: 'tilemap' })
		    const tileset = map.addTilesetImage('PatronCueva', 'tiles')
		
		    var suelo = map.createLayer('suelo', tileset)
        var layer = map.createLayer('obstaculos', tileset)

      

        layer.setCollisionByExclusion([-1 , 0]);

        //Prota
          
        this.player = new Prota(this, 975, 1450);

        this.physics.add.collider(this.player, layer);
        this.player.setDepth(2);
        
        //NPCs
        this.bruja3 = this.physics.add.sprite(1555, 390, 'bruja3').setScale(2);
        this.bruja3.setSize(15, 15);
        this.bruja3.setDepth(1);
        this.bruja3.body.offset.y = 16;
        //this.bruja3.body.immovable = true;

        this.motos = this.physics.add.sprite(1595, 1100, 'motos').setScale(2);
        this.motos.setSize(13, 20);
        this.motos.setDepth(1);
        this.motos.body.offset.x = 5;
        this.motos.body.offset.y = 7;
        this.motos.body.immovable = true;

        this.gato = this.physics.add.sprite(690, 1360, 'gato').setScale(2);
        this.gato.setSize(13, 20);
        this.gato.setDepth(1);
        this.gato.body.offset.x = 5;
        //this.gato.body.offset.y = 7;
        this.gato.body.immovable = true;

        //Objetos interactuables
        this.estanteria = this.physics.add.sprite(400, 390, 'vacio').setScale(2);
        this.estanteria.setSize(25,27);
        this.estanteria.body.offset.x = 8;
        
        this.caldero = this.physics.add.sprite(465, 400, 'vacio').setScale(2);
        this.caldero.setSize(15,20);
        this.caldero.body.offset.x = 8;

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

        this.dialogBox = new DialogoBox(this);
        this.dialogBox.createBox();
        
        //Teclas para dialogo
        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        

        this.addOverlap(this.player,this.bruja3, this.dialogBox.getDialogo(0),"María" );
        this.addOverlap(this.player,this.motos, this.dialogBox.getDialogo(1),"Pablo Motos" );
        this.addOverlap(this.player,this.gato, this.dialogBox.getDialogo(2), "Gato" );
        this.addOverlap(this.player,this.estanteria, this.dialogBox.getDialogo(3),"Amaia" );
        this.addOverlap(this.player,this.caldero, this.dialogBox.getDialogo(4),"Amaia" );
        this.addOverlap(this.player,this.cartel1, this.dialogBox.getDialogo(5),"Amaia" );
        this.addOverlap(this.player,this.cartel2, this.dialogBox.getDialogo(6),"Amaia" );
        this.addOverlap(this.player,this.cartel3, this.dialogBox.getDialogo(7),"Amaia" );

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

        
        console.log(this.game.config.keys);
        if(this.game.config.minijuego == 1){
          this.portal1.setVisible(true);
          this.portal2.setVisible(true);
          this.portal3.setVisible(true);
          this.portalesVisibles = true;
          this.player.setPosition(980, 700);

        }

    }

    addOverlap(player, npc, dialogo, nombre ) {

        this.physics.add.overlap(player, npc, () => {
          this.dialogBox.setPosicion(npc.x, npc.y);
          
          this.dialogBox.setNombre(nombre);
          
          if(Phaser.Input.Keyboard.JustDown(this.espacio)) {
            this.dialogBox.visible(true);
            this.player.setHablando(true);

            if (length < dialogo.length) {
              this.dialogBox.setTexto(dialogo[length]);
              console.log(dialogo[length]);
              console.log(length);
              length++;
            }

            else{
            if(this.dialogBox.getNombre() == "María"){
                this.portal1.setVisible(true);
                this.portal2.setVisible(true);
                this.portal3.setVisible(true);
                this.portalesVisibles = true;
            }
            
            this.dialogBox.visible(false);
            this.player.setHablando(false);
            length = 0;
            }

        }
        else if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.dialogBox.visible(false);
            this.player.setHablando(false);
            length = 0;
        }      

        });
    }

    addOverlapPortales(player, portal, dialogo, nombre) {
          this.physics.add.overlap(player, portal, () => {

            this.dialogBox.setPosicion(portal.x - 45, portal.y - 60);
        
            this.dialogBox.setNombre(nombre);
            
            if(Phaser.Input.Keyboard.JustDown(this.espacio) && this.portalesVisibles) {

              this.dialogBox.visible(true);
                this.player.setHablando(true);
                enPortal = true;
                this.portal = portal;
                if(this.portal.x == this.portal1.x && this.game.config.keys != 2){
                    this.dialogBox.setTexto("No deberia de entrar hasta que no tenga las otras \n2 piezas...");
                } 
                else{
                this.dialogBox.setTexto(dialogo[0]);
                }
            }
        });
    }

    salirPortal(){
      this.dialogBox.visible(false);
        this.player.setHablando(false);
        enPortal = false;
        length = 0;
    }

  //Loop del juego
  update() {
    //console.log(this.player.x);
    //console.log(this.player.y);
    
    if(!this.player.hablando || !enPortal){
      this.player.checkMovement(this.cursors);
    }

    this.player.setSprite();

    if (Phaser.Input.Keyboard.JustDown(this.enter) && enPortal) {
      if (this.portal == this.portal1 && this.game.config.keys == 2) {
        this.scene.stop(this);
        this.scene.start("avoidthepotions");
      } else if (this.portal == this.portal2) {
        this.scene.stop(this);
        this.scene.start('pinball');
      } else if (this.portal == this.portal3) {
        this.scene.stop(this);
        this.scene.start("goatrun");
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.escape) && enPortal) {
      this.salirPortal(this.dialogBox);
    }

  }
}

