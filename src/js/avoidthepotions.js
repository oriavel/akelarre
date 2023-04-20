/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class AvoidThePotions extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'avoidthepotions' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        // poner un fondo decente
        this.load.image('cave', 'src/assets/cave_long.png');
        this.load.image('ground', 'src/assets/platform.png');
        // Hacer una amaia original
        this.load.spritesheet('amaia', 
            'src/assets/correr_spritesheet.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        // Lo voamos a usar como las brujas de manera temporal
        this.load.spritesheet('witch', 
            'src/assets/goat_run.png',
            { frameWidth: 100, frameHeight: 100 }
        );
        this.load.spritesheet('amaia_jump', 
            'src/assets/amaia_jump.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        // mini malos
        this.load.spritesheet('bat',
            'src/assets/bat_spritesheet.png', 
            { frameWidth: 32, frameHeight: 32}
        );
        // pociones de manera temporal
        this.load.image('potion', 'src/assets/rock_1.png');

    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/

    
	create(){

        var potions;
        var timer_potions;
        var bats;
        var timer_bats;

        this.background = this.add.tileSprite(0, 0, 800, 500, 'cave').setOrigin(0).setScrollFactor(0, 1);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();


        this.player = this.physics.add.sprite(320, 400, 'amaia').setOrigin(0.5, 0.3).setScale(1.6);

        this.potion = this.physics.add.sprite(700, 350, 'potion').setScale(0.6);
        this.potion.body.velocity.y = 150;

        this.witch = this.physics.add.sprite(50, 280, 'witch');

        this.bat = this.physics.add.sprite(850, 300, 'bat').setScale(2);
        this.bat.body.allowGravity = false;
        this.bat.body.velocity.x = -150;

        this.potions = this.physics.add.group();
        this.this.timer_potions = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                var objeto = potions.create(300, 600, 'potion');
                objeto.setScale(0.6);

                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.y = -100;
                console.log("mitad del callback");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
            }
        });

        this.bats = this.physics.add.group();
        this.timer_bats = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 4000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                var objeto = bats.create(150, 500, 'bat');
                objeto.setScale(2);
                objeto.anims.play('bat', true);
                objeto.body.allowGravity = false;

                objeto.body.x += objeto.body.velocity.x * deltaTime;

                // Mover el objeto verticalmente utilizando una onda sinusoidal
                objeto.body.y = 1000 + 2000 * Math.sin(0.02 * objeto.x);


                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.x = -80;
                console.log("mitad del callback de bats");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
            }
        });

        this.anims.create({
            key: 'right_amaia',
            frames: this.anims.generateFrameNumbers('amaia', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_amaia',
            frames: [ { key: 'amaia', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'stop_witch',
            frames: [ { key: 'witch', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump_amaia',
            frames: [ { key: 'amaia_jump', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'fall_amaia',
            frames: [ { key: 'amaia_jump', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'still_amaia',
            frames: [ { key: 'amaia_jump', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'bat',
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        cursors = this.input.keyboard.createCursorKeys();

        player.setCollideWorldBounds(true);
        witch.setCollideWorldBounds(true);

        bat.anims.play('bat', true);
        bat2.anims.play('bat', true);

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(witch, platforms);
        this.physics.add.collider(potion, platforms);
        this.physics.add.collider(potions, platforms);
        this.physics.add.collider(bats, platforms);

        var jump = false; // para evitar el doble salto
    }

	/**
	* Loop del juego
	*/
    update(){
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            //player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            //player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            //player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    
    }   
}