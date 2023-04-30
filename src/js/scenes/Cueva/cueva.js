import intro from "../Secuencias/intro.js";
/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import * as Matter from 'akelarre/node_modules/matter-js/build/matter.js';
let hablando = false;
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
        this.game.config.minijuego = 1; //No entiendo la forma de usar esto sin declararlo aqui
        //Cueva
        const map = this.make.tilemap({ key: 'tilemap' })
		const tileset = map.addTilesetImage('PatronCueva', 'tiles')
		
		var suelo = map.createLayer('suelo', tileset)
        var layer = map.createLayer('obstaculos', tileset)

      

        layer.setCollisionByExclusion([-1 , 0]);

        //Prota
        this.player = this.physics.add.sprite(975, 1450, 'amaia').setScale(2);
        this.player.setSize(15, 13);
        this.player.body.offset.y = 20;
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

        //Pantallita del texto
        this.graphics = this.add.graphics({x: 1200, y: 600});
        this.graphics.fillStyle(0x000000, 0.8);
        this.graphics.fillRect(0, 0, 700, 100);
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.strokeRect(0, 0, 700, 100);
        
        //El texto
        this.text = this.add.text(400, 400, "Este es el texto de la ventana", { font: "24px Arial", fill: "#ffffff" });
        
        //Gráfico adicional
        this.graphicsNombre = this.add.graphics({x: this.graphics.x, y: this.graphics.y - 30});
        this.graphicsNombre.fillStyle(0x000000, 0.8);
        this.graphicsNombre.fillRect(0, 0, 150, 30);
        this.graphicsNombre.lineStyle(4, 0x000000, 1);
        this.graphicsNombre.strokeRect(0, 0, 150, 30);
        
        //Texto adicional
        this.textNombre = this.add.text(400, 400, 'AAAAA', {fontFamily: 'Arial', fontSize: '16px', color: '#ffffff'});
        this.textNombre.setOrigin(0.5);
        
        //Configuracion basica de la pantalla y texto
        this.graphics.setVisible(false);
        this.graphicsNombre.setVisible(false);
        this.text.setVisible(false);
        this.textNombre.setVisible(false);
        hablando = false;

        //Teclas para dialogo
        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Dialogos:

        const dialogosBruja = [
            "¡Ah! Hola...",
            "Mis hermanas me han mandado quedarme aqui vigilandote, no  \nme esperaba que me encontraras...",
            "... Lo siento mucho por ti, es una pena que tu vida vaya a \nacabar tan pronto por nuestra culpa.",
            "A mis hermanas les encanta realizar sacrificios humanos pero \nla verdad es que a mi no me gusta nada...",
            "Ojala pudiera dejarte ir, pero mis hermanas de dan demasiado \nmiedo...",
            "¡Espera! He tenido una idea, yo no puedo dejarte salir, \n¡Pero si que puedo abrir los portales que llevan a las llaves!",
            "Por desgracia tu huida seguirá siendo algo muy dificil de \nconseguir...",
            "Tras los portales se encuentran tres pruebas muy dificiles \nque tendrás que superar si quieres conseguir las llaves.",
            "Estoy segura de que podrás lograrlo, y si no pues bueno... \nIbas a morir de todas formas...",
            "Voy a abrir los portales, ¡Consigue las llaves deprisa! Si \nmis hermanas terminan los preparativos antes de que huyas...",
            "No quiero ni imaginarme como harían para que tu sacrificio \nfuera incluso más doloroso, pero seguro que ellas sabrían como.",
            "No te preocupes por lo que me pueda pasar a mi cuando se \nenteren de que abrí los portales.",
            "¡Ya iba siendo hora de que les plantase cara a mis hermanas!",
            "Los portales ya están abiertos, ¡Mucha suerte! Y que Belzebut \neste contigo...",
            "¡Ah, espera! Casi se me olvida, porfavor no entres en el \nPortal rojo de el centro hasta que no tengas las otras piezas",
            "Por ese portal solo puede entrar Sorgina, \nMi hermana mayor y la más malvada.",
            "Ahí guarda la ultima pieza de llave, no confia en nosotras \npara salvaguardarla...",
            "Cuando entres estoy seguro de que se enterará, ¡Has de \ncogerla rapido y correr como si tu vida dependiera de ello!",
            "Al fin y al cabo, tu vida depende de ello..."
        ];
        const dialogosMotos = [
            "Ey nena, ¿Qué hace una chica como tu en un sitio como este?",
            "Ja ja ja ja, *coff* *coff*...",
            "¿Yo? Pues nada, estaba dandome un paseo de turisteo cuando \nderrepente vi a las mozas estas recogiendo plantas por la zona.",
            "Con lo buenas que están me paré para hablarlas a ver si caia \nalguna 'minita', ya sabes ja ja ja.",
            "Cuando me dijeron que querían llevarme a la cueva yo tan \ninocente pensé que habia triunfado, ¡Y mirame ahora!",
            "Me dijeron que iban a ofrecerme a su Dios, pero creo que al \nfinal pude convencerlas de que estaba demasiado bueno \npara eso.",
            "Desde ese momento me han dejado aquí en una esquina, no se \na que esperan para dejarme ir ja ja ja ja...",
            "¿No tendrás unas galletas dinosaurus por ahí o algo no? \nMe muero de hambre.",
            "Aunque ahora que te tengo delante me apetecen otras cosas \ntambién ja ja ja *coff* *coff*",
            "Deduzco que a ti tambien te han capturado para un \nsacrificio ¿No?",
            "Que te parece nena, ¿Hacemos que nuestros ultimos momentos \nvivos sean divertidos? ;)"
        ];

        const dialogosGato =[
            "¡Hola, Bienvenida a la cueva!",
            "Soy el fiel amigo y servidor de las brujas, \n¡Y me lo paso pipa viendo los sacrificios humanos que hacen!",
            "Tu eres la siguiente en la lista. Veo que eres \nmuy joven, pobrecita que poco has vivido...",
            "JA JA JA JA JA, ¡Que pringada!",
            "Te aviso de antemano de que no hay escapatoria, la salida\nestá bloqueada por una puerta mágica que necesita 3 llaves.",
            "¡Y no pienso decirte donde están! JA JA JA JA",
            "Disfruta de tus ultimos momentos paseando por \nla cueva si quieres.",
            "O quedate quieta hasta que vuelvan mis amas, \n¡Me da completamente igual!"
        ];

        const dialogosEstanteria =[
            "Hay un montón de libros de hechiceria y herbologia...",
            "'El necronomicon', 'Sacrificios101', \n'Plantas venenosas y como usarlas'...",
            "Que mal rollo..."
        ];
        const dialogosCaldero =[
            "Supongo que con esto hacen sus pociones, que esteriotípico",
            "Esta burbujeando, me pregunto que efecto \ntendría si lo bebo",
            "Huele fatal..."
        ];

        const dialogoCartel1 =[
            "Pone '¡Os tengo dicho que a este portal solo entro yo!,\nHe puesto una alarma de lo harta que me teneis.'",
            "'Considerar este cartel como un último aviso, a la \nproxima que vea dentro le caerá una lluvia de pociones rojas.'",
            "'-Sorgina.'",
            "Estoy acojonadísima."
        ]

        const dialogoCartel2 =[
            "Pone 'Ranking:' '1º Sorgina: 999.999.999 pts' \n'2ºGraciana: 450.900.000 pts'",
            "'3ºMaría: 5 pts'",
            "Incluso en la situación en la que estoy \nme siento mal por María..."
        ]


        const dialogoCartel3 =[
            "Pone 'Alimentar a la cabra:' \n'L,M: Graciana, X,J,V,S: María, D: Sorgina.'",
            "Pobre María."
        ]

        const dialogoPortales =[
            "¿Quiero entrar en el portal ya?\n(Presiona ENTER para entrar y ESC si aún no estas preparado)."
        ]

        this.addOverlap(this.player,this.bruja3, this.graphics, this.text, dialogosBruja, this.graphicsNombre, this.textNombre,"María" );
        this.addOverlap(this.player,this.motos, this.graphics, this.text, dialogosMotos, this.graphicsNombre, this.textNombre,"Pablo Motos" );
        this.addOverlap(this.player,this.gato, this.graphics, this.text, dialogosGato, this.graphicsNombre, this.textNombre,"Gato" );
        this.addOverlap(this.player,this.estanteria, this.graphics, this.text, dialogosEstanteria, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlap(this.player,this.caldero, this.graphics, this.text, dialogosCaldero, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlap(this.player,this.cartel1, this.graphics, this.text, dialogoCartel1, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlap(this.player,this.cartel2, this.graphics, this.text, dialogoCartel2, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlap(this.player,this.cartel3, this.graphics, this.text, dialogoCartel3, this.graphicsNombre, this.textNombre,"Amaia" );

        this.addOverlapPortales(this.player,this.portal1, this.graphics, this.text, dialogoPortales, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlapPortales(this.player,this.portal2, this.graphics, this.text, dialogoPortales, this.graphicsNombre, this.textNombre,"Amaia" );
        this.addOverlapPortales(this.player,this.portal3, this.graphics, this.text, dialogoPortales, this.graphicsNombre, this.textNombre,"Amaia" );
      


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

        this.player.setCollideWorldBounds(false);

        //Tecla enter para minijuegos
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.player.anims.play('stop_up_amaia', true);

        
        console.log(this.game.config.keys);
        if(this.game.config.minijuego == 1){
            this.player.setPosition(980, 700);

        }

    }

    addOverlap(player, npc, graphics, text, dialogo, graphicsN, textNombre, nombre ) {

        this.physics.add.overlap(player, npc, () => {

          graphics.setPosition(npc.x - 355,npc.y + 160);
          graphicsN.setPosition(graphics.x, graphics.y - 30);
          text.setPosition(npc.x - 350,npc.y + 170);
          textNombre.setPosition(graphicsN.x + 50, graphicsN.y + 15);

          textNombre.setText(nombre);
          
          if(Phaser.Input.Keyboard.JustDown(this.espacio)) {
            graphics.setVisible(true);
            graphicsN.setVisible(true);
            text.setVisible(true);
            textNombre.setVisible(true);
            hablando = true;

            if (length < dialogo.length) {
              text.setText(dialogo[length]);
              console.log(dialogo[length]);
              console.log(length);
              length++;
            }

            else{
            if(textNombre.text == "María"){
                this.portal1.setVisible(true);
                this.portal2.setVisible(true);
                this.portal3.setVisible(true);
                this.portalesVisibles = true;
            }
            else if(npc == this.portal2 && keys < 2){
                text.setText()
            } 
            graphics.setVisible(false);
            graphicsN.setVisible(false);
            text.setVisible(false);
            textNombre.setVisible(false);
            hablando = false;
            length = 0;
            }

        }
        else if(Phaser.Input.Keyboard.JustDown(this.escape)){
            graphics.setVisible(false);
            graphicsN.setVisible(false);
            text.setVisible(false);
            textNombre.setVisible(false);
            hablando = false;
            length = 0;
        }      

        });
    }

    addOverlapPortales(player, portal, graphics, text, dialogo, graphicsN, textNombre, nombre) {
        this.physics.add.overlap(player, portal, () => {

            graphics.setPosition(portal.x - 400,portal.y + 100);
            graphicsN.setPosition(graphics.x, graphics.y - 30);
            text.setPosition(portal.x - 395,portal.y + 120);
            textNombre.setPosition(graphicsN.x + 50, graphicsN.y + 15);
            textNombre.setText(nombre);
            
            if(Phaser.Input.Keyboard.JustDown(this.espacio) && this.portalesVisibles) {

                graphics.setVisible(true);
                graphicsN.setVisible(true);
                text.setVisible(true);
                textNombre.setVisible(true);
                hablando = true;
                enPortal = true;
                this.portal = portal;
                if(this.portal.x == this.portal1.x && this.game.config.keys != 2){
                    text.setText("No deberia de entrar hasta que no tenga las otras \n2 piezas...");
                } 
                else{
                text.setText(dialogo[0]);
                }
            }
        });
    }
    salirPortal(graphics, text, graphicsN, textNombre){
        graphics.setVisible(false);
        graphicsN.setVisible(false);
        text.setVisible(false);
        textNombre.setVisible(false);
        hablando = false;
        length = 0;
      }

  
  addOverlapPortales(player,portal,graphics,text,dialogo,graphicsN,textNombre,nombre) {
    this.physics.add.overlap(player, portal, () => {
      graphics.setPosition(portal.x - 400, portal.y + 100);
      graphicsN.setPosition(graphics.x, graphics.y - 30);
      text.setPosition(portal.x - 395, portal.y + 120);
      textNombre.setPosition(graphicsN.x + 50, graphicsN.y + 15);
      textNombre.setText(nombre);

      if (
        Phaser.Input.Keyboard.JustDown(this.espacio) &&
        this.portalesVisibles
      ) {
        graphics.setVisible(true);
        graphicsN.setVisible(true);
        text.setVisible(true);
        textNombre.setVisible(true);
        hablando = true;
        enPortal = true;
        this.portal = portal;
        if (this.portal.x == this.portal1.x && this.game.config.keys != 2) {
          text.setText(
            "No deberia de entrar hasta que no tenga las otras \n2 piezas..."
          );
        } else {
          text.setText(dialogo[0]);
        }
      }
    });
  }
  salirPortal(graphics, text, graphicsN, textNombre) {
    graphics.setVisible(false);
    graphicsN.setVisible(false);
    text.setVisible(false);
    textNombre.setVisible(false);
    hablando = false;
    length = 0;
    enPortal = false;
  }

  //Loop del juego
  update() {
    //console.log(this.player.x);
    //console.log(this.player.y);

    if (this.cursors.right.isDown && !hablando) {
      this.player.setVelocityX(436);
      this.player.setVelocityY(0);
      this.player.anims.play("right_amaia", true);
      this.animation = 1;
    } else if (this.cursors.left.isDown && !hablando) {
      this.player.setVelocityX(-436);
      this.player.setVelocityY(0);
      this.player.anims.play("left_amaia", true);
      this.animation = 2;
    } else if (this.cursors.up.isDown && !hablando) {
      this.player.setVelocityY(-436);
      this.player.setVelocityX(0);
      this.player.anims.play("up_amaia", true);
      this.animation = 3;
    } else if (this.cursors.down.isDown && !hablando) {
      this.player.setVelocityY(436);
      this.player.setVelocityX(0);
      this.player.anims.play("down_amaia", true);
      this.animation = 4;
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      if (this.animation == 1) this.player.anims.play("stop_right_amaia", true);
      else if (this.animation == 2) {
        this.player.anims.play("stop_left_amaia", true);
      } else if (this.animation == 3) {
        this.player.anims.play("stop_up_amaia", true);
      } else if (this.animation == 4) {
        this.player.anims.play("stop_down_amaia", true);
      }
    }


    if (Phaser.Input.Keyboard.JustDown(this.enter) && enPortal) {
      if (this.portal == this.portal1 && this.game.config.keys == 2) {
        this.scene.stop("Cueva");
        this.scene.start("avoidthepotions");
      } else if (this.portal == this.portal2) {
        this.scene.stop("Cueva");
        // this.scene.start('pinball');
      } else if (this.portal == this.portal3) {
        this.scene.stop("Cueva");
        this.scene.start("goatrun");
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.escape) && enPortal) {
      this.salirPortal(
        this.graphics,
        this.graphicsNombre,
        this.text,
        this.textNombre
      );
    }

  }
}

