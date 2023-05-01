let length = 0;
export default class Contexto extends Phaser.Scene {
	
	constructor() {
		super({ key: 'context' });
	}

    create(){
        var dialogoContexto = [
            "Nuestra historia comienza con Amaia, una joven estudiante de \nBiologia en la UCM.\n",
            "Tras mucho tiempo dudando, Amaia decidió que haría su TFG \nsobre unos animales aparentemente mutados que estaban apareciendo\nen Zugarramurdi.\n",
            "Este pueblo tenía fama por haber sido hogar de muchas brujas en el \npasado y es por esto que habian surgido teorias por todo internet acerca\nde los animales mutados.\n",
            "A Amaia todo esto le daba igual, hasta que un dia,\nmientras Amaia investigaba los alrededores de la cueva en el que se \nhabian visto a estas sospechosas criaturas,",
            "empezó a oir y ver \nfiguras que le extrañaron.\n¿Hola? ¿Hay alguien ahí? Dijo la pobre e ilusa Amaia pensando que \npodrían ser habitantes del pueblo.",
            "Derrepente, Amaia pudo ver como las \nfiguras sospechosas se paraban en seco, girando sus cuerpos hacia ella.\n",
            "Atemorizada, Amaia empezó a correr de vuelta al pueblo, pero ya era \ndemasiado tarde.\n",
            "Tres mujeres con vestidos largos negros y sombrero corriendo \nhacia ella fue lo ultimo que vió antes de perder el conocimiento...\n",
            "Poco tiempo después nuestra protagonista despierta\nen el interior de la cueva, con dolor de cabeza y las 3 mujeres de \nantes mirandola fijamente...\n",
            ""
        ];

        //Pantallita del texto
        this.dialog = dialogoContexto;

        let graphics = this.add.graphics({x: 0, y: 0});
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(0, 0, 800, 800);
        graphics.lineStyle(4, 0x000000, 1);
        graphics.strokeRect(0, 0, 800, 800);

        this.grafico = graphics;
        //El texto
        let text = this.add.text(10, 10, "", { font: "24px Arial", fill: "#ffffff" });
        text.setDepth(2);
        this.texto = text;

        this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
        graphics.setVisible(true);

        this.secuenciaDialogo(graphics, text, dialogoContexto);
    }

    secuenciaDialogo(graphics, text, dialogo){
        
        graphics.setVisible(true);
        text.setVisible(true);

        //Dialogo:
        if (length < dialogo.length) {
          text.text += dialogo[length];
          console.log(dialogo[length]);
          console.log(length);
        
          length++;
        }
        
        else {
            graphics.setVisible(false);
            text.setVisible(false);
            length = 0;
            this.cambiarEscena();
        }
    }
    cambiarEscena(){
        this.scene.stop('context');
        this.scene.start('intro');
    }

    update()
    {

        if(Phaser.Input.Keyboard.JustDown(this.espacio)){
            this.secuenciaDialogo(this.grafico, this.texto,this.dialog);
            if(length == this.dialog.length)
                this.cambiarEscena();
        }

        
        if(Phaser.Input.Keyboard.JustDown(this.escape)){
            this.cambiarEscena();
        }
            

       
    }
}