import Prota from '../Cueva/Prota.js'
import DialogoBox from '../Secuencias/dialogos.js'

let length = 0;
export default class Intro extends Phaser.Scene {
	
	constructor() {
		super({ key: 'intro' });
	}



	preload(){

       //Cargar cueva:
       this.load.image('tiles', 'src/assets/Cueva/Caves.png');
       this.load.tilemapTiledJSON('tilemap', 'src/assets/Cueva/Cueva.json');
        //Cargar NPCs
        this.load.spritesheet('bruja3', 'src/assets/Personajes/bruja3.png', { frameWidth: 19, frameHeight: 28 });
        this.load.spritesheet('bruja1', 'src/assets/Personajes/bruja1.png', { frameWidth: 21, frameHeight: 28});
        this.load.spritesheet('bruja2', 'src/assets/Personajes/bruja2.png', { frameWidth: 19, frameHeight: 28 });
        this.load.spritesheet('gato', 'src/assets/Personajes/gatete.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('cueva_audio','src/audio/cueva.mp3');
        //Cargar prota
        this.load.spritesheet('amaia', 
            'src/assets/Personajes/Prota.PNG',
            { frameWidth: 34, frameHeight: 34 }
        );


    }
	// inicializamos la escena

	create() {
        this.game.config.minijuego = 0;
        this.game.config.keys = 0;
        this.game.config.key1 =  false;
        this.game.config.key2 =  false;
        this.game.config.key3 =  false;
        this.game.config.dGatoInicio =  false;
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

        this.bruja2 = this.physics.add.sprite(875, 1350, 'bruja2').setScale(2);
        this.bruja2.setSize(15, 15);

        this.bruja3 = this.physics.add.sprite(1075, 1350, 'bruja3').setScale(2);
        this.bruja3.setSize(15, 15);


        this.gato = this.physics.add.sprite(690, 1360, 'gato').setScale(2);
        this.gato.setSize(15, 15);


        this.dialogBoxBruja1 = new DialogoBox(this, 0x711e7c);
        this.dialogBoxBruja1.createBox();
        this.dialogBoxBruja1.visible(false);
        this.dialogBoxBruja1.setNombre("Sorgina");

        this.dialogBoxBruja2 = new DialogoBox(this, 0x1c105e);
        this.dialogBoxBruja2.createBox();
        this.dialogBoxBruja2.visible(false);
        this.dialogBoxBruja2.setNombre("Graciana");

        this.dialogBoxBruja3 = new DialogoBox(this, 0x205b17);
        this.dialogBoxBruja3.createBox();
        this.dialogBoxBruja3.visible(false);
        this.dialogBoxBruja3.setNombre("María");

        this.dialogBoxProta = new DialogoBox(this, 0x000000);
        this.dialogBoxProta.createBox();
        this.dialogBoxProta.visible(false);
        this.dialogBoxProta.setNombre("Amaia");

       
        //Teclas para dialogo
        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cameras.main.startFollow(this.player, true);

        this.anims.create({
            key: 'up_bruja1',
            frames: this.anims.generateFrameNumbers('bruja1', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up_bruja2',
            frames: this.anims.generateFrameNumbers('bruja2', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up_bruja3',
            frames: this.anims.generateFrameNumbers('bruja3', { start: 4, end: 7 }),
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

        this.dialogBoxBruja1.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxBruja2.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxBruja3.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxProta.setPosicion(this.bruja1.x, this.bruja1.y + 100);

        this.audioCueva = this.sound.add('cueva_audio');
        this.audioCueva.play();

        this.secuenciaDialogo();


	}

    secuenciaDialogo(){
        
        //Dialogo:
        var dialogo = this.dialogBoxBruja1.getDialogo(9);
        if(length == 0 || length == 3 || length == 5 || length == 8){ //Sorgina
            this.dialogBoxBruja1.visible(true);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(false);
           
            if (length < dialogo.length) {
              this.dialogBoxBruja1.setTexto(dialogo[length]);
              length++;
            }  
        }
        else if(length == 1 || length == 6){//Graciana
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(true);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(false);
          
            if (length < dialogo.length) {
              this.dialogBoxBruja2.setTexto(dialogo[length]);
              length++;
            }
        }
        else if(length == 12|| length == 13){ //Amaia
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(true);
        
            if (length < dialogo.length) {
              this.dialogBoxProta.setTexto(dialogo[length]);
              length++;
        }
        }
        else{ //Maria
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(true);
            this.dialogBoxProta.visible(false);

        if (length < dialogo.length) {
          this.dialogBoxBruja3.setTexto(dialogo[length]); 
          length++;
        }
        }

        if(dialogo.length == length){
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(false);
            length = 0;
            this.audioCueva.pause();
            this.audioCueva.currentTime = 0;
            this.scene.stop('intro');
            this.scene.start('cueva');
        }
    }

    update()
    {

        if(Phaser.Input.Keyboard.JustDown(this.espacio) && length != 11){
            this.secuenciaDialogo(this.grafico, this.texto, this.graphicsN, this.textN, this.dialog);
        }

        
        if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.audioCueva.pause();
            this.audioCueva.currentTime = 0;
            this.scene.stop('intro');
            this.scene.start('cueva');
        }

        if(length == 11){
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
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