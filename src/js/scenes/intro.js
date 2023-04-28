
let length = 0;
let moverB = false;
export default class Intro extends Phaser.Scene {
	
	constructor() {
		super({ key: 'intro' });
	}



	preload(){

        //Cargar cueva:
        this.load.image('tiles', 'src/assets/Caves.png')
        this.load.tilemapTiledJSON('tilemap', 'src/assets/Cueva.json')

        //Cargar NPCs
        this.load.spritesheet('bruja3', 'src/assets/Personajes/bruja3.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bruja1', 'src/assets/Personajes/bruja1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bruja2', 'src/assets/Personajes/bruja2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gato', 'src/assets/Personajes/gatete.png', { frameWidth: 32, frameHeight: 32 });

        //Cargar prota
        this.load.spritesheet('amaia', 
            'src/assets/Personajes/Prota.PNG',
            { frameWidth: 34, frameHeight: 34 }
        );


    }
	// inicializamos la escena

	create() {

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
        this.bruja1 = this.physics.add.sprite(975, 1350, 'bruja1').setScale(2);
        this.bruja1.setSize(15, 15);
        this.bruja1.setDepth(1);
        this.bruja1.body.offset.y = 16;
        this.bruja1.body.immovable = true;

        this.bruja2 = this.physics.add.sprite(875, 1350, 'bruja2').setScale(2);
        this.bruja2.setSize(15, 15);
        this.bruja2.setDepth(1);
        this.bruja2.body.offset.y = 16;
        this.bruja2.body.immovable = true;

        this.bruja3 = this.physics.add.sprite(1075, 1350, 'bruja3').setScale(2);
        this.bruja3.setSize(15, 15);
        this.bruja3.setDepth(1);
        this.bruja3.body.offset.y = 16;
        this.bruja3.body.immovable = true;


        this.gato = this.physics.add.sprite(690, 1360, 'gato').setScale(2);
        this.gato.setSize(13, 20);
        this.gato.setDepth(1);
        this.gato.body.offset.x = 5;
        //this.gato.body.offset.y = 7;
        this.gato.body.immovable = true;


        //Pantallita del texto
        let graphics = this.add.graphics({x: 1200, y: 600});
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, 700, 100);
        graphics.lineStyle(4, 0x000000, 1);
        graphics.strokeRect(0, 0, 700, 100);

        this.graficos = graphics;
        
        //El texto
        let text = this.add.text(400, 400, "Este es el texto de la ventana", { font: "24px Arial", fill: "#ffffff" });
        
        this.texto = text;

        //Gráfico adicional
        let graphicsNombre = this.add.graphics({x: graphics.x, y: graphics.y - 30});
        graphicsNombre.fillStyle(0x000000, 0.8);
        graphicsNombre.fillRect(0, 0, 150, 30);
        graphicsNombre.lineStyle(4, 0x000000, 1);
        graphicsNombre.strokeRect(0, 0, 150, 30);

        this.graphicsN = graphicsNombre;
        
        //Texto adicional
        let textNombre = this.add.text(400, 400, 'AAAAA', {fontFamily: 'Arial', fontSize: '16px', color: '#ffffff'});
        textNombre.setOrigin(0.5);

        this.textN = textNombre;
        
        //Configuracion basica de la pantalla y texto
        graphics.setVisible(true);
        graphicsNombre.setVisible(true);
        text.setVisible(true);
        textNombre.setVisible(true);

        this.graficos.setVisible(true);
        this.graphicsN.setVisible(true);
        this.texto.setVisible(true);
        this.textN.setVisible(true);

        //Teclas para dialogo
        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cameras.main.startFollow(this.player, true);

        this.anims.create({
            key: 'up_bruja1',
            frames: this.anims.generateFrameNumbers('bruja1', { start: 1, end: 4 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up_bruja2',
            frames: this.anims.generateFrameNumbers('bruja2', { start: 1, end: 4 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up_bruja3',
            frames: this.anims.generateFrameNumbers('bruja3', { start: 1, end: 4 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'stop_up_amaia',
            frames: this.anims.generateFrameNumbers('amaia', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        const dialogo = [ //Sorgina: 0, 3, 5, 8. Graciana: 1,6. Maria: 2, 4, 7, 9. Amaia: 10
            "MUA JA JA JA JA, ¡Al fin!\n¡Hermanas, por fin tenemos un sacrificio para nuestro venerado \nBelzebut!", 
            "¡Y pelirroja, estoy segura de que le encantará!",
            "...",
            "¿Pasa algo, María?",
            "¡N- No Sorgina, para nada!",
            "Eso pensaba, ¡Estupendo! Ahora solo queda terminar los \npreparativos para el ritual, ¡Graciana, vamos!",
            "¡ji ji ji, que ganas!",
            "...",
            "¡María!, ya sabes que hacer, ¿Verdad?",
            "S-Si hermana, ¡Voy!",
            "...",
            "En menuda me he metido...",
            "" //Para que no se raye
        ];
        
        this.dialog = dialogo;

        this.player.anims.play('stop_up_amaia', true);

        this.graficos.setPosition(this.bruja1.x - 355,this.bruja1.y + 260);
        this.graphicsN.setPosition(graphics.x, graphics.y - 30);
        this.texto.setPosition(this.bruja1.x - 350,this.bruja1.y + 270);
        this.textN.setPosition(this.graphicsN.x + 50, this.graphicsN.y + 15);


        
        this.secuenciaDialogo(graphics, this.bruja1, this.bruja2, this.bruja3, text, graphicsNombre, textNombre, dialogo);

        this.events.on(moverB, function() {
            while(this.bruja1.y > 1050){
                this.bruja1.setVelocityY(-100);
                this.bruja1.anims.play('up_bruja1', true);
            }
            length++;
            console.log('El evento "mi_evento" se ha activado');
          });

          /*

          });
        */
	}

    secuenciaDialogo(graphics, bruja1, bruja2, bruja3, text, graphicsN, textNombre, dialogo){
        

        //Dialogo:
        if (length < dialogo.length) {
          text.setText(dialogo[length]);
          console.log(dialogo[length]);
          console.log(length);
          if(length == 0 || length == 3 || length == 5 || length == 8){
            textNombre.setText("Sorgina");
          }
          else if(length == 1 || length == 6){
            textNombre.setText("Graciana");
          }
          else if(length == 10|| length == 11){
            textNombre.setText("Amaia");
          }
          else
            textNombre.setText("María");
          
          length++;
        }
        if(length == 9){
            moverB = true;
        }
        else if(dialogo.length == length){
            graphics.setVisible(false);
            graphicsN.setVisible(false);
            text.setVisible(false);
            textNombre.setVisible(false);
            length = 0;
            this.scene.stop('intro');
            this.scene.start('cueva');
        }
    }

    update()
    {

        if(Phaser.Input.Keyboard.JustDown(this.espacio)){
            this.secuenciaDialogo(this.graficos, this.bruja1, this.bruja2, this.bruja3, this.texto, this.graphicsN, this.textN, this.dialog);
        }

        
        if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.scene.stop('intro');
            this.scene.start('cueva');
        }

       
    }
}