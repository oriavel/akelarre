import Prota from '../Cueva/Prota.js'
import DialogoBox from '../Secuencias/dialogos.js'
let length = 0;
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
        this.load.spritesheet('bruja1', 'src/assets/Personajes/bruja1.png', { frameWidth: 21, frameHeight: 28});
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
        this.player = new Prota(this, 975, 1450);

        
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


        this.dialogBox = new DialogoBox(this);
        this.dialogBox.createBox();
        this.dialogBox.visible(true);

       
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


        this.player.anims.play('stop_up_amaia', true);

        this.dialogBox.setPosicion(this.bruja1.x, this.bruja1.y + 100);

        this.secuenciaDialogo();


	}

    secuenciaDialogo(){
        
        //Dialogo:
        this.dialogBox.visible(true);
        var dialogo = this.dialogBox.getDialogo(9);
        if (length < dialogo.length) {
          this.dialogBox.setTexto(dialogo[length]);
          console.log(dialogo[length]);
          console.log(length);
          if(length == 0 || length == 3 || length == 5 || length == 8){
            this.dialogBox.setNombre("Sorgina");
          }
          else if(length == 1 || length == 6){
            this.dialogBox.setNombre("Graciana");
          }
          else if(length == 11|| length == 12){
            this.dialogBox.setNombre("Amaia");
          }
          else
          this.dialogBox.setNombre("María");
          
          length++;
        }

        else if(dialogo.length == length){
            this.dialogBox.visible(false);
            length = 0;
            this.scene.stop('intro');
            this.scene.start('cueva');
        }
    }

    update()
    {

        if(Phaser.Input.Keyboard.JustDown(this.espacio) && length != 10){
            this.secuenciaDialogo(this.grafico, this.texto, this.graphicsN, this.textN, this.dialog);
        }

        
        if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.scene.stop('intro');
            this.scene.start('final');
        }

        if(length == 10){

            this.dialogBox.visible(false);
            if(this.bruja1.y > 1035){
                this.bruja1.setVelocityY(-136);
                this.bruja1.anims.play('up_bruja1', true);
                this.bruja2.setVelocityY(-136);
                this.bruja2.anims.play('up_bruja2', true);
                this.bruja3.setVelocityY(-136);
                this.bruja3.anims.play('up_bruja3', true);
            }
            else{
                
                length++;
            }
        }

       
    }
}