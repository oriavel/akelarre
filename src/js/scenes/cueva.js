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

        //Cargar prota
        this.load.spritesheet('amaia', 
            'src/assets/Personajes/Prota.PNG',
            { frameWidth: 34, frameHeight: 34 }
        );
    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(){
        
        //Cueva
        const map = this.make.tilemap({ key: 'tilemap' })
		const tileset = map.addTilesetImage('PatronCueva', 'tiles')
		
		map.createLayer('suelo', tileset)
        var layer = map.createLayer('obstaculos', tileset)

        layer.setCollisionByExclusion([-1]);

        //Prota
        this.player = this.physics.add.sprite(300, 450, 'amaia').setScale(2);
        this.player.setSize(15, 15);
        this.player.body.offset.y = 16;
        this.physics.add.collider(this.player, layer);
        
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

        this.player.setCollideWorldBounds(true);

    }

	/**
	* Loop del juego
	*/
    update(){
        if (this.cursors.right.isDown){
            this.player.setVelocityX(100);
            this.player.setVelocityY(0);
            this.player.anims.play('right_amaia', true);
            this.animation = 1;

        }
        else if (this.cursors.left.isDown){
            this.player.setVelocityX(-100);
            this.player.setVelocityY(0);
            this.player.anims.play('left_amaia', true);
            this.animation = 2;

        }
        else if (this.cursors.up.isDown){
            this.player.setVelocityY(-100);
            this.player.setVelocityX(0);
            this.player.anims.play('up_amaia', true);
            this.animation = 3;

        }
        else if (this.cursors.down.isDown){
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
    }
}