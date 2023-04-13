/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
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
        this.load.spritesheet('bruja', 'src/assets/Personajes/bruja3.png', { frameWidth: 32, frameHeight: 32 });

        //Cargar prota
        this.load.spritesheet('amaia', 
            'src/assets/Personajes/Prota.PNG',
            { frameWidth: 34, frameHeight: 34 }
        );

        this.load.plugin('DialogModalPlugin', './dialog.js');
        //this.sys.install('DialogModalPlugin');
        //console.log(this.sys.dialogModal);
    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(){
        
        //Cueva
        const map = this.make.tilemap({ key: 'tilemap' })
		const tileset = map.addTilesetImage('PatronCueva', 'tiles')
		
		var suelo = map.createLayer('suelo', tileset)
        var layer = map.createLayer('obstaculos', tileset)

        layer.setCollisionByExclusion([-1 , 0]);

        //Prota
        this.player = this.physics.add.sprite(1550, 450, 'amaia').setScale(2);
        this.player.setSize(15, 15);
        this.player.body.offset.y = 16;
        this.physics.add.collider(this.player, layer);
        this.player.setDepth(2);
        
        //NPCs
        this.bruja = this.physics.add.sprite(1555, 390, 'bruja').setScale(2);
        this.bruja.setSize(15, 15);
        this.bruja.setDepth(1);
 
        this.bruja.body.offset.y = 16;

        this.bruja.body.immovable = true;

        
        /*Para colisiones voy a necesitar:
        -Arriba para Pablo Motos y bruja
        -Izquierda para Gato
        */
        //Colisiones con bruja
        this.collisionUp = false;
        this.collisionDown = false;
        this.collisionLeft = false;
        this.collisionRight = false;

        

        this.physics.add.collider(this.player,this.bruja, () =>{
            console.log('colision');
            var espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            espacio.on('down', function(event) {
                // Crear ventana emergente con el diálogo
                console.log('dialogo?');
               
            }, this);
        
        });

        /*
        this.physics.add.collider(this.player, this.bruja, () =>{
            const playerBounds = this.player.getBounds();
            const brujaBounds = this.bruja.getBounds();

            if (playerBounds.right >= brujaBounds.left && this.player.body.velocity.x > 0) {
            // Si el jugador se mueve a la derecha y choca con el personaje, no se permitirá que el jugador se mueva más a la derecha
            this.collisionRight = true;
            this.player.setVelocityX(0);
            }

            if (playerBounds.left <= brujaBounds.right && this.player.body.velocity.x < 0) {
            // Si el jugador se mueve a la izquierda y choca con el personaje, no se permitirá que el jugador se mueva más a la izquierda
            this.collisionLeft = true;
            this.player.setVelocityX(0);
            }

            if (playerBounds.bottom >= brujaBounds.top && this.player.body.velocity.y > 0) {
            // Si el jugador se mueve hacia abajo y choca con el personaje, no se permitirá que el jugador se mueva más hacia abajo
            this.collisionDown = true;
            this.player.setVelocityY(0);
            }

            if (playerBounds.top <= brujaBounds.bottom && this.player.body.velocity.y < 0) {
            // Si el jugador se mueve hacia arriba y choca con el personaje, no se permitirá que el jugador se mueva más hacia arriba
            this.collisionUp = true;
            this.player.setVelocityY(0);
            
            }
        });
        */


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
            frameRate: 3,
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
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'up_amaia',
            frames: this.anims.generateFrameNumbers('amaia', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_up_amaia',
            frames: this.anims.generateFrameNumbers('amaia', { start: 7, end: 7 }),
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
            frameRate: 4,
            repeat: -1
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player, true);

        this.player.setCollideWorldBounds(false);

    }

    showDialog() {
        // Mostrar el texto de diálogo si el jugador está en colisión con el personaje
          this.dialogText.setText('Tonto el que lo lea');
          console.log('Deberia de estar saliendo el texto');
          this.dialogText.setVisible(true);
      }



	/**
	* Loop del juego
	*/
    update(){

        if (this.cursors.right.isDown && !this.collisionRight){
            this.player.setVelocityX(100);
            this.player.setVelocityY(0);
            this.player.anims.play('right_amaia', true);
            this.animation = 1;

        }
        else if (this.cursors.left.isDown && !this.collisionLeft){
            this.player.setVelocityX(-100);
            this.player.setVelocityY(0);
            this.player.anims.play('left_amaia', true);
            this.animation = 2;

        }
        else if (this.cursors.up.isDown && !this.collisionUp){
            this.player.setVelocityY(-100);
            this.player.setVelocityX(0);
            this.player.anims.play('up_amaia', true);
            this.animation = 3;

        }
        else if (this.cursors.down.isDown && !this.collisionDown){
            this.player.setVelocityY(100);
            this.player.setVelocityX(0);
            this.player.anims.play('down_amaia', true);
            this.animation = 4;
        }
        else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            if(this.animation == 1)
                this.player.anims.play('stop_right_amaia', true);

            else if(this.animation == 2){
                this.player.anims.play('stop_left_amaia', true);
            }
            else if(this.animation == 3){
                this.player.anims.play('stop_up_amaia', true);
            }
            else if(this.animation == 4){
                this.player.anims.play('stop_down_amaia', true);
            }
        }
    /*
        if (this.player.x + this.player.width < this.bruja.x) {
            this.collisionRight = false;
          } else if (this.player.x > this.bruja.x + this.bruja.width) {
            this.collisionLeft = false;
          }
        
          if (this.player.y + this.player.height < this.bruja.y) {
            this.collisionDown = false;
          } else if (this.player.y > this.bruja.y + this.bruja.height) {
            this.collisionUp = false;
            this.dialogText.setVisible(false);
        }
        */
    }
}