
import Prota from '../Cueva/Prota.js'
import DialogoBox from '../Secuencias/dialogos.js'
let length = 0;
let andar = false;
export default class Intro extends Phaser.Scene {
	
	constructor() {
		super({ key: 'final' });
	}



	create() {
        console.log("Ha entrado en Final");
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



        this.dialogBox = new DialogoBox(this);
        this.dialogBox.createBox();
        this.dialogBox.visible(true);

        //Teclas para dialogo
        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cameras.main.startFollow(this.player, true);

        this.player.anims.play('stop_up_amaia', true);

        this.dialogBox.setPosicion(this.bruja1.x, this.bruja1.y + 100);

        this.secuenciaDialogo();



	}

    secuenciaDialogo(){
        
        var dialogo = this.dialogBox.getDialogo(10);
        //Dialogo:
        if (length < dialogo.length) {
          this.dialogBox.setTexto(dialogo[length]);
          console.log(dialogo[length]);
          console.log(length);
          if(length == 0 || length == 4 || length == 6 || length == 8 ||length == 9 ||
             length == 12 || length == 13 || length == 15 || length == 16){
                this.dialogBox.setNombre("Sorgina");
          }
          else if(length == 1 || length == 5 || length == 7 || length == 14 || length == 17){
            this.dialogBox.setNombre("Graciana");
          }
          else if(length == 10){
            this.dialogBox.setNombre("Amaia");
          }
          else
          this.dialogBox.setNombre("María");
          
          length++;
        }
        else{
            this.dialogBox.visible(false);
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
            this.scene.stop('intro');
            this.scene.start('cueva');
        }
        }
        else{
            console.log(this.player.y);
            if(this.player.y < 900){
                this.player.move('Y',136);
                this.player.anims.play('down_amaia', true);
            }
            else{
                this.scene.stop('final');
            }
        }       
    }

}