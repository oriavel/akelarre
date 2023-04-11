/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class GoatRun extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'goatrun' });
        this.physicsPlugin = null;
	}

    initPhysics(){
        this.physicsPlugin = this.physics.add;
        this.physicsPlugin.world.gravity.y = 300;
        this.physicsPlugin.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    }

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('cave', 'src/assets/cave_long.png');
        this.load.image('ground', 'src/assets/platform.png');
        this.load.spritesheet('amaia_goatrun', 
            'src/assets/correr_spritesheet.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('goat', 
            'src/assets/goat_run.png',
            { frameWidth: 144, frameHeight: 144 }
        );
        this.load.spritesheet('amaia_jump', 
            'src/assets/amaia_jump.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('bat',
            'src/assets/bat_spritesheet.png', 
            { frameWidth: 32, frameHeight: 32}
        );
        this.load.image('rock', 'src/assets/rock_1.png');

    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/

    
	create(){
        this.initPhysics();
        var rocks;
        var timer_rocks;
        var bats;
        var timer_bats;
        // var deltaTime = 0; CREARLA FUERA
    
        this.background = this.add.tileSprite(0, 0, 800, 500, 'cave').setOrigin(0).setScrollFactor(0, 1);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();

        this.playerr = this.physics.add.sprite(320, 400, 'amaia_goatrun').setOrigin(0.5, 0.3).setScale(1.6);
        this.playerr.setSize(15,35);
       //  player.setOrigin(0.5, 0.2);
    
        this.rock = this.physics.add.sprite(700, 350, 'rock').setScale(0.6);
        this.rock.body.velocity.x = -150;
        
        this.rock2 = this.physics.add.sprite(950, 350, 'rock').setScale(0.6);
        this.rock2.body.velocity.x = -140;
        
        
        this.goat = this.physics.add.sprite(50, 280, 'goat');

        this.bat = this.physics.add.sprite(850, 300, 'bat').setScale(2);
        this.bat.body.allowGravity = false;
        this.bat.body.velocity.x = -150;

        this.bat2 = this.physics.add.sprite(1200, 300, 'bat').setScale(2);
        this.bat2.body.allowGravity = false;
        this.bat2.body.velocity.x = -150;

        // 681 x 89

        rocks = this.physics.add.group();
        timer_rocks = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                var objeto = rocks.create(900, 350, 'rock');
                objeto.setScale(0.6);

                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.x = -100;
                console.log("mitad del callback");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
                
            }
        });

        // this.start = this.getTime();
        bats = this.physics.add.group();
        timer_bats = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 4000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                var objeto = bats.create(900, 250, 'bat');
                objeto.setScale(2);
                objeto.anims.play('bat', true);
                objeto.body.allowGravity = false;

                //objeto.body.x += objeto.body.velocity.x * deltaTime;

                // Mover el objeto verticalmente utilizando una onda sinusoidal
                //objeto.body.y = 1000 + 2000 * Math.sin(0.02 * objeto.x);


                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.x = -80;
                console.log("mitad del callback de bats");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
            }
        });


        this.anims.create({
            key: 'right_amaia_goats',
            frames: this.anims.generateFrameNumbers('amaia_goatrun', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right_goat',
            frames: this.anims.generateFrameNumbers('goat', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_amaia',
            frames: [ { key: 'amaia_goatrun', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'stop_goat',
            frames: [ { key: 'goat', frame: 0 } ],
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


        this.cursors = this.input.keyboard.createCursorKeys();

        this.playerr.setCollideWorldBounds(true);
        this.goat.setCollideWorldBounds(true);

        this.bat.anims.play('bat', true);
        this.bat2.anims.play('bat', true);

        this.physics.add.collider(this.playerr, this.platforms);
        this.physics.add.collider(this.goat, this.platforms);
        this.physics.add.collider(this.rock, this.platforms);
        this.physics.add.collider(this.rock2, this.platforms);
        this.physics.add.collider(rocks, this.platforms);
        this.physics.add.collider(bats, this.platforms);
        console.log("Llega aquí por lo menos");

        this.scoreText = this.add.text(16, 16, 'distance: 0/20000', { fontSize: '32px', fill: '#000', fontFamily: 'font'});

        // Def variables para el update
        var jump = false; // para evitar el doble salto
        var powerup_salto = false; // ¿meto power up para saltar más?
    }

	/**
	* Loop del juego
	*/
    update(){
        this.background.tilePositionX += 0.15;
        this.distance += 1;
        this.scoreText.setText('Distance: ' + this.distance + '/20000');
        // deltaTime = this.time.elapsed/1000;
        console.log(this.distance);
        if (this.cursors.right.isDown)
        {
            if(!this.jump){
                // player.setVelocityX(160);
                this.playerr.anims.play('right_amaia_goats', true);
            }
            // goat.setVelocityX(120);
            this.goat.anims.play('right_goat', true);
            
            if (this.cursors.up.isDown && !this.jump){
                this.playerr.setVelocityY(-250);
                this.jump = true;
                this.playerr.anims.play('jump_amaia', true); 
            }

            if (this.jump){
                if (this.playerr.body.velocity.y < 0) {
                    this.playerr.anims.play('jump_amaia', true);
                    console.log(this.playerr.body.velocity.y);
                } else if (this.playerr.body.velocity.y > 0) {
                    this.playerr.anims.play('fall_amaia', true);
                    console.log("amaia cae");
                }
                else{
                    this.playerr.anims.play('still_amaia', true);
                    console.log("still");
                }
            }
            if (this.playerr.body.touching.down){
                this.jump = false;
                console.log("amaia toca suelo");
            }
        }
        else
        {
            this.playerr.setVelocityX(0);
            if(!this.jump){
                this.playerr.anims.play('stop_amaia', true);  
            }
            else{
                this.playerr.anims.play('jump_amaia', true);
            }
            this.goat.setVelocityX(0);
            this.goat.anims.play('stop_goat', true);
        }
    }
}