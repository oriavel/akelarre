
import Prota from '../Cueva/Prota.js'
import DialogoBox from '../Secuencias/dialogos.js'
let length = 0;
let andar = false;
export default class Intro extends Phaser.Scene {
	
	constructor() {
		super({ key: 'final' });
	}



	create() {
        //Cueva
        const map = this.make.tilemap({ key: 'tilemap' })
		const tileset = map.addTilesetImage('PatronCueva', 'tiles')
		
		var suelo = map.createLayer('suelo', tileset)
        var layer = map.createLayer('obstaculos', tileset)

        //Prota
        this.player = new Prota(this,980, 700);
        
        //NPCs
        this.bruja1 = this.physics.add.sprite(980, 600, 'bruja1').setScale(2);
        this.bruja1.setSize(15, 15);
        this.bruja1.setDepth(1);
        this.bruja1.body.offset.y = 16;
        this.bruja1.body.immovable = true;
        
        this.bruja2 = this.physics.add.sprite(880, 600, 'bruja2').setScale(2);
        this.bruja2.setSize(15, 15);
        this.bruja2.setDepth(1);
        this.bruja2.body.offset.y = 16;
        this.bruja2.body.immovable = true;

        this.bruja3 = this.physics.add.sprite(1080, 600, 'bruja3').setScale(2);
        this.bruja3.setSize(15, 15);
        this.bruja3.setDepth(1);
        this.bruja3.body.offset.y = 16;
        this.bruja3.body.immovable = true;




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

        this.player.anims.play('stop_up_amaia', true);

        this.dialogBoxBruja1.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxBruja2.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxBruja3.setPosicion(this.bruja1.x, this.bruja1.y + 100);
        this.dialogBoxProta.setPosicion(this.bruja1.x, this.bruja1.y + 100);

        this.secuenciaDialogo();
        this.audioCueva = this.sound.add('cueva_audio');
        this.audioCueva.play();


	}

    secuenciaDialogo(){
        
        var dialogo = this.dialogBoxBruja1.getDialogo(10);
        //Dialogo:
        if (length < dialogo.length) {
          

          if(length == 0 || length == 2 || length == 3 || length == 6 || length == 8 ||length == 9 ||
             length == 12 || length == 13 || length == 15 || length == 16){
                this.dialogBoxBruja1.visible(true);
                this.dialogBoxBruja2.visible(false);
                this.dialogBoxBruja3.visible(false);
                this.dialogBoxProta.visible(false);
                this.dialogBoxBruja1.setTexto(dialogo[length]);
          }
          else if(length == 1 || length == 5 || length == 7 || length == 14 || length == 17){
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(true);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(false);
            this.dialogBoxBruja2.setTexto(dialogo[length]);
          }
          else if(length == 10){
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(true);
            this.dialogBoxProta.setTexto(dialogo[length]);
          }
          else{
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(true);
            this.dialogBoxProta.visible(false);
            this.dialogBoxBruja3.setTexto(dialogo[length]);
          }
          
          length++;
        }
        else{
            this.dialogBoxBruja1.visible(false);
            this.dialogBoxBruja2.visible(false);
            this.dialogBoxBruja3.visible(false);
            this.dialogBoxProta.visible(false);
            length = 0;
            andar = true;
        }

    }

    update()
    {

        if(!andar){
        if(Phaser.Input.Keyboard.JustDown(this.espacio)){
            this.secuenciaDialogo();
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.scene.stop('final');
            this.scene.start('pantallaFinal');
        }
        }
        else{
            if(this.player.y < 900){
                this.player.move('Y',136);
                this.player.anims.play('down_amaia', true);
            }
            else{
                this.audioCueva.stop();
                this.scene.stop('final');
                this.scene.start('pantallaFinal');
            }
        }       
    }

}