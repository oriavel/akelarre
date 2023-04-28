import Rock from "../characters/goatrun/Rock.js";
import Bat from "../characters/goatrun/bat.js";


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
        this.physicsPlugin.world.gravity.y = 400;
        this.physicsPlugin.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    }

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('cave', 'src/assets/cave_long.png');
        this.load.image('cave2', 'src/assets/cave_marron.png');
        this.load.image('cave3', 'src/assets/cave_lava.png'); // http://joyreactor.com/post/1390622
        this.load.image('ground', 'src/assets/platform_1.png');
        this.load.image('ground2', 'src/assets/platform_2.png');
        this.load.image('ground3', 'src/assets/platform_3.png');
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
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('bat_doble',
            'src/assets/bat_doble.png',
            { frameWidth: 1424, frameHeight: 1420 }
        );
        this.load.image('rock', 'src/assets/rock_1.png');
        this.load.image('rock2', 'src/assets/rock_2.png');
        this.load.image('rock3', 'src/assets/rock_3.png');
        this.load.spritesheet('amaia_death', 
            'src/assets/amaia_death.png',
            { frameWidth: 64, frameHeight: 64}
        );
        this.load.spritesheet('amaia_agachada', 
            'src/assets/amaia_agachada.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('hearts', 
            'src/assets/hearts.png',
            { frameWidth: 28, frameHeight: 24 }
        );
        this.load.image('heart', 'src/assets/heart.png');
        this.load.image('heart-filled', 'src/assets/heart-filled.png');

        this.load.spritesheet('spell_gravity', 
            'src/assets/gravity_spell.png',
            { frameWidth: 90, frameHeight: 88 }
        );

    }
	
    
	create(){
        this.initPhysics();
    
        this.background = this.add.tileSprite(0, 0, 800, 500, 'cave').setOrigin(0).setScrollFactor(0, 1);
        // this.background.setScale(2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();
        this.platforms.create(400, 565, 'ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(320, 400, 'amaia_goatrun').setOrigin(0.5, 0.3).setScale(1.6);
        this.player.setSize(15,35);

        this.physics.world.gravity.y = 400;

        this.heart1 = this.add.sprite(680, 30, 'hearts');
        this.heart2 = this.add.sprite(710, 30, 'hearts');
        this.heart3 = this.add.sprite(740, 30, 'hearts');
        
        this.rock = this.physics.add.sprite(700, 350, 'rock').setScale(0.6);
        this.rock.body.velocity.x = -150;
        
        this.rock2 = this.physics.add.sprite(950, 350, 'rock').setScale(0.6);
        this.rock2.body.velocity.x = -140;
        
        
        this.goat = this.physics.add.sprite(70, 280, 'goat');
        this.goat.setSize(90, 180);

        this.bat = new Bat(this, 850, 300, 'bat_doble', this.player);
        // this.bat = this.physics.add.sprite(850, 300, 'bat_doble');
        this.bat.setScale(0.04);
        this.bat.body.setSize(100, 60);
        // this.bat = this.physics.add.sprite(850, 300, 'bat').setScale(2);
        this.bat.body.allowGravity = false;
        this.bat.body.velocity.x = -150;

        this.bat2 = this.physics.add.sprite(1200, 300, 'bat').setScale(2);
        this.bat2.body.allowGravity = false;
        this.bat2.body.velocity.x = -150;

        const self = this;
        /*
        // 681 x 89
        this.rocks = this.add.group();
        this.timer_rocks = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000),
            loop: true,
            callback: function() {
                var objeto = new Rock(self, 900, 350, 'rock', self.player); 
                self.rocks.add(objeto);               
            }
        });

        // this.start = this.getTime();
        this.bats = this.add.group();
        this.contBats = 0;
        this.timer_bats = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 4000),
            loop: true,
            callback: function() {
                let objeto = new Bat(self, 900, 250, 'bat', self.player);
                self.bats.add(objeto);
                self.contBats += 1;
            },
        });
        */

        this.rocks = this.add.group();
        this.bats = this.add.group();
        this.contBats = 0;
        this.timer_enemies = this.time.addEvent({
            delay: Phaser.Math.Between(1800, 2200),
            loop: true, 
            callback: function(){
                var numAleatorio = Math.random();
                if(numAleatorio < 0.5){ // Generamos una piedra
                    var objeto = new Rock(self, 900, 350, 'rock', self.player); 
                    self.rocks.add(objeto);
                }
                else{ // Generamos un murcielago
                    let objeto = new Bat(self, 900, 250, 'bat', self.player);
                    self.bats.add(objeto);
                    self.contBats += 1;
                }
                var hechizo_random = Math.random();
                if(hechizo_random < 0.1){
                    let objeto = new Spell();
                }

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

        this.anims.create({
            key: 'bat_doble',
            frames: this.anims.generateFrameNumbers('bat_doble', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'amaia_death',
            frames: this.anims.generateFrameNumbers('amaia_death', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'amaia_agachada',
            frames: this.anims.generateFrameNumbers('amaia_agachada', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'heart_filled',
            frames: [ { key: 'hearts', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'heart_empty',
            frames: [ { key: 'hearts', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'spell',
            frames: this.anims.generateFrameNumbers('spell', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.heart1.anims.play('heart_filled', true);
        this.heart2.anims.play('heart_filled', true);
        this.heart3.anims.play('heart_filled', true);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.player.setCollideWorldBounds(true);
        this.goat.setCollideWorldBounds(true);

        this.bat.anims.play('bat_doble', true);
        this.bat2.anims.play('bat', true);
        this.goat.anims.play('right_goat', true);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.goat, this.platforms);
        this.physics.add.collider(this.rock, this.platforms);
        this.physics.add.collider(this.rock2, this.platforms);
        this.physics.add.collider(this.rocks, this.platforms);
        this.physics.add.collider(this.bats, this.platforms);


        /*
        this.rocksCollider = this.physics.add.collider(this.player, this.rocks,function(){
            self.collisionRocks();
        },
            null,
            this
        );
        */

        //Pantallita del texto
        this.graphics = this.add.graphics({x: this.game.config.width/15, y: this.game.config.height/3});
        this.graphics.fillStyle(0x000000, 0.8);
        this.graphics.fillRect(0, 0, 700, 100);
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.strokeRect(0, 0, 700, 100);
        //El texto
        this.text = this.add.text(this.graphics.x + 150, this.graphics.y+30, "Nivel 1: pulsa Enter para comenzar", { font: "24px Arial", fill: "#ffffff" });
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        

        this.scoreText = this.add.text(16, 16, 'distance: 0/20000', { fontSize: '32px', fill: '#000', fontFamily: 'font'});
        this.player.anims.play('right_amaia_goats', true);
        // Def variables para el update
        this.jump = false; // para evitar el doble salto
        var powerup_salto = false; // ¿meto power up para saltar más?
        this.changeCollider = true; // Para el cambio del tamaño de collider cuando se agacha
        this.amaiaIsDeath = false;
        this.isInvulnerable = false;
        this.livesPlayer = 3; // Nº de vidas del personaje
        this.distance = 0;
        this.batCollision = true;
        this.rockCollision = true;
        this.startGame = false;
        

    }


    /*
        - Nivel 1, parecido al de dinosaurio de google, aparecen rapido y con frecuencia pero sin dificultad alguna. 
        Tambien aparece de vez en cuando un hechizo que te libera un poco de la gravedad durante 10 segundoss
        - Nivel 2, aparecen más rápidos y hay murcielagos que quitan dos vidas
        - Nivel 3, aparecen más frecuentes y algunas rocas tienen fuego, que te matan directamente

    */


	/**
	* Loop del juego
	*/
    update(){

        if (this.enterKey.isDown) {
            this.text.setVisible(false);
            this.graphics.setVisible(false);
            this.startGame = true;
        }
        if (this.startGame){
            console.log("Llega aquí por lo menos -update");
            this.background.tilePositionX += 0.15;
            this.distance += 1;
            this.scoreText.setText('Distance: ' + (this.distance || '') + '/20000');
            this.movimientoEnemies();
            if(!this.amaiaIsDeath){
                if(this.cursors.up.isDown){
                    if(!this.jump){ // Si no está saltando
                        this.jump = true;
                        this.player.setVelocityY(-250);
                        this.player.anims.play('jump_amaia', true);
                    }            
                }
                if(this.jump){ // Si está saltando ya 
        
                    if (this.player.body.velocity.y < 0) { // Va hacia arriba
                        this.player.anims.play('jump_amaia', true);
                    } else if (this.player.body.velocity.y > 0) { // Va hacia abajo
                        this.player.anims.play('fall_amaia', true);
                    }
                    else{ // Está en el aire
                        this.player.anims.play('still_amaia', true);
                    }
                }
        
                if (this.player.body.touching.down && !this.cursors.down.isDown){ // Si amaia está tocando el suelo
                    this.jump = false; // No permitimos el doble salto de esta manera
                    this.player.anims.play('right_amaia_goats', true);
                }
        
                if(this.cursors.down.isDown){ // Si se presiona 'abajo'
                    if(!this.jump){ // Solo si no está saltando, si está en el aire no se puede agachar
                        this.player.anims.play('amaia_agachada', true);
                        this.player.setSize(15,20);
                        this.player.setOrigin(0.5, 0.3).setScale(1.6)
                        this.player.body.setOffset(20, 20);
                        this.changeCollider = false;
                    }
                }
                else if (!this.changeCollider){
                    this.player.setOrigin(0.5, 0.3).setScale(1.6);
                    this.player.setSize(15,35);
                    this.changeCollider = true;
                }
        
                if(this.cursors.left.isDown){ // Prueba para comprobar animación de muerte
                    this.deathScene();
                    this.amaiaIsDeath = true;
                }

                this.checkLives();
                this.checkLevel();
            }
        
        }
        
    }


    // Funcion que accede a los movimientos de todos los enemigos
    movimientoEnemies(){
        console.log("entra funcion, cont: " + this.contBats);
        if(this.contBats > 0){
            this.bats.getChildren().forEach(function(bat) {
                bat.movimiento_bats();
            }, this);
        }
    }   

    /* Cosas que tengo que hacer
    - Añadir los 3 niveles
    - Añadir más enemigos en otros niveles ??
    */

    checkLives(){
        if(this.livesPlayer > 0 && this.livesPlayer < 3){
            switch(this.livesPlayer){
                case 1: 
                    this.heart2.anims.play('heart_empty', true);
                    break;
                case 2: 
                    this.heart3.anims.play('heart_empty', true);
                    console.log("cccc");
                    break;
            }
        }
        else{
            if(this.livesPlayer <= 0){
                this.heart1.anims.play('heart_empty', true);
                this.deathScene();
                this.amaiaIsDeath = true;
            }
            
        }
    }

    checkLevel(){
        if (this.distance > 10000){
            this.scene.stop('goatrun');
            this.scene.start('goatrun_nivel2');
        }
    }

    deathScene(){
        this.time.removeAllEvents(); // Dejamos de generar enemigos
        this.destroyEnemies();
        this.cameras.main.fadeOut(5500);
        this.player.anims.play('amaia_death', true);
        //this.background.setScrollFactor(0);
        //this.background.tilePositionX += 0.0;
        this.player.setSize(15,35);
        this.player.setOrigin(0.5, 0.32).setScale(1.6);
        this.zoomEnPunto(this.player.body.x, this.player.body.y, 3);
        this.cameras.main.setZoom(2);        
    }

    
    destroyEnemies(){
        this.bats.getChildren().forEach(function(bat) {
            bat.body.destroy();
        }, this);    
        this.contBats = 0;
        this.rocks.getChildren().forEach(function(rock_) {
            rock_.body.destroy();
        }, this);
    }


    makeInvulnerable() {
        // Establece la variable isInvulnerable en true
        this.isInvulnerable = true;
        this.rockCollision = false;
        this.batCollision = false;
        this.time.addEvent({
            delay: 200, // cada 200 milisegundos (5 veces por segundo)
            repeat: 15, // durante 30 ciclos (3 segundos en total)
            callback: function() {
              this.player.alpha = Phaser.Math.Between(0, 1); // cambiar la opacidad del sprite al azar
            },
            callbackScope: this,
          });
      }

    zoomEnPunto(x, y, zoom) {
        // Obtener las coordenadas de la esquina superior izquierda de la cámara
        const x0 = this.cameras.main.scrollX;
        const y0 = this.cameras.main.scrollY;

        // Obtener el ancho y la altura de la cámara
        const w0 = this.cameras.main.width;
        const h0 = this.cameras.main.height;

        // Calcular la nueva posición y el tamaño de la cámara después del zoom
        const w1 = w0 / zoom;
        const h1 = h0 / zoom;
        const x1 = x + 10 - w1 / 2;
        const y1 = y + 40 - h1 / 2;

        // Ajustar la posición de la cámara para que el punto de referencia quede en la misma posición relativa después del zoom
        const dx = x1 - x0;
        const dy = y1 - y0;
        this.cameras.main.scrollX += dx;
        this.cameras.main.scrollY += dy;

        // Establecer la nueva posición y tamaño de la cámara
        this.cameras.main.setViewport(x1, y1, w1, h1);
    }
}
