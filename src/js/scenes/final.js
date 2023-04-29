let length = 0;
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

        const dialogo = [ //Sorgina: 0, 2, 4, 6, 8, 9, 12, 13, 15, 16. Graciana: 1, 5, 7, 14, 17. Maria: 3, 11, 18. Amaia: 10
            "Ugh...Estoy agotada...",
            "¡Hermana! ¿Que ha pasado? No me digas que esta humana...", 
            "¡Silencio Graciana!...esta humana es mucho mas habil \nde lo que nunca me habría imaginado...",
            "No se como has podido abrir los portales, pero me has impresionado.",
            "...",
            "Hermana...¿Que quieres que hagamos ahora?",
            "Cuando nuestro señor recibe una ofrenda no solo \nabsorbe el cuerpo de el sacrificio, también su mente.",
            "Entonces, si seguimos con el plan y sacrificamos \na esta chica...",
            "Vería como perdí contra esta humana. \n¡No puedo permitirlo!",
            "Tu, chica, puedes irte.",
            "¿Cómo?",
            "!!",
            "No te pienses que te dejo ir sin más.\nEn cuanto salgas de esta cueva no recordarás nada \nde lo acontecido.",
            "Te olvidarás de nosotras y de la cueva,\ncomo si nunca hubiera pasado nada.",
            "Pero...",
            "¡Silencio! Considera esto como premio por \nhaber conseguido las llaves",
            "Verte solo me recuerda la humillación de la derrota,\n¡Vete ya antes de que cambie de opinión!",
            "...",
            "¡A-Adios!...",
            
            ""//Para que no se raye
        ];
        
        this.dialog = dialogo;

        this.player.anims.play('stop_up_amaia', true);

        this.graficos.setPosition(this.bruja1.x - 355,this.bruja1.y + 260);
        this.graphicsN.setPosition(graphics.x, graphics.y - 30);
        this.texto.setPosition(this.bruja1.x - 350,this.bruja1.y + 270);
        this.textN.setPosition(this.graphicsN.x + 50, this.graphicsN.y + 15);


        
        this.secuenciaDialogo(graphics, this.bruja1, this.bruja2, this.bruja3, text, graphicsNombre, textNombre, dialogo);

	}

    secuenciaDialogo(graphics, bruja1, bruja2, bruja3, text, graphicsN, textNombre, dialogo){
        

        //Dialogo:
        if (length < dialogo.length) {
          text.setText(dialogo[length]);
          console.log(dialogo[length]);
          console.log(length);
          if(length == 0 || length == 4 || length == 6 || length == 8 ||length == 9 ||
             length == 12 || length == 13 || length == 15 || length == 16){
            textNombre.setText("Sorgina");
          }
          else if(length == 1 || length == 5 || length == 7 || length == 14 || length == 17){
            textNombre.setText("Graciana");
          }
          else if(length == 10){
            textNombre.setText("Amaia");
          }
          else
            textNombre.setText("María");
          
          length++;
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