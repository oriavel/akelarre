import Bat from "../characters/bat.js";

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
        this.load.image('cave2', 'src/assets/cave_marron.png');
        this.load.image('cave3', 'src/assets/cave_lava.png');
        this.load.image('ground', 'src/assets/platform_1.png');
        this.load.image('ground2', 'src/assets/platform_2.png');
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

    }
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/

    
	create(){
        this.initPhysics();
        // var rocks;
        var timer_rocks;
        // var bats;
        var timer_bats;
        // var deltaTime = 0; CREARLA FUERA
    
        this.background = this.add.tileSprite(0, 0, 800, 500, 'cave3').setOrigin(0).setScrollFactor(0, 1);
        this.background.setScale(2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();
        this.platforms.create(400, 565, 'ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(320, 400, 'amaia_goatrun').setOrigin(0.5, 0.3).setScale(1.6);
        this.player.setSize(15,35);
       //  player.setOrigin(0.5, 0.2);

        this.heart1 = this.add.sprite(680, 30, 'hearts');
        this.heart2 = this.add.sprite(710, 30, 'hearts');
        this.heart3 = this.add.sprite(740, 30, 'hearts');
        
        this.rock = this.physics.add.sprite(700, 350, 'rock').setScale(0.6);
        this.rock.body.velocity.x = -150;
        
        this.rock2 = this.physics.add.sprite(950, 350, 'rock').setScale(0.6);
        this.rock2.body.velocity.x = -140;
        
        
        this.goat = this.physics.add.sprite(70, 280, 'goat');
        this.goat.setSize(90, 180);

        this.bat = this.physics.add.sprite(850, 300, 'bat').setScale(2);
        this.bat.body.allowGravity = false;
        this.bat.body.velocity.x = -150;

        this.bat2 = this.physics.add.sprite(1200, 300, 'bat').setScale(2);
        this.bat2.body.allowGravity = false;
        this.bat2.body.velocity.x = -150;

        const self = this;

        // 681 x 89
        this.rocks = this.physics.add.group();
        timer_rocks = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                var objeto = self.rocks.create(900, 350, 'rock');
                objeto.setScale(0.6);
                objeto.setSize(80, 80);

                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.x = -100;
                console.log("mitad del callback");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
                
            }
        });

        // this.start = this.getTime();
        this.bats = this.physics.add.group();
        this.contBats = 0;
        
        timer_bats = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 4000),
            loop: true,
            callback: function() {
                // Crear un objeto dentro del grupo y define su posición inicial
                // var objeto = this.bats.create(900, 250, 'bat');
                // var objeto = this.physics.add.sprite(900, 250, 'bat').setScale(2);
                var objeto = self.bats.create(900, 250, 'bat');
                self.bats.add(objeto);
                // let objeto = new Bat(this, 900, 250, 1, 'bat');
                objeto.setScale(2);
                objeto.anims.play('bat', true);
                objeto.body.allowGravity = false;
                this.contBats += 1;
                //objeto.body.x += objeto.body.velocity.x * deltaTime;

                // Mover el objeto verticalmente utilizando una onda sinusoidal
                //objeto.body.y = 1000 + 2000 * Math.sin(0.02 * objeto.x);

                // objeto.update();
                // Definir la velocidad del objeto para que se mueva horizontalmente a la izquierda
                objeto.body.velocity.x = -80;
                console.log("mitad del callback de bats");

                // Eliminar el objeto cuando salga de la pantalla
                objeto.outOfBoundsKill = true;
                objeto.checkWorldBounds = true;
            },
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

        this.heart1.anims.play('heart_filled', true);
        this.heart2.anims.play('heart_filled', true);
        this.heart3.anims.play('heart_filled', true);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.player.setCollideWorldBounds(true);
        this.goat.setCollideWorldBounds(true);

        this.bat.anims.play('bat', true);
        this.bat2.anims.play('bat', true);
        this.goat.anims.play('right_goat', true);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.goat, this.platforms);
        this.physics.add.collider(this.rock, this.platforms);
        this.physics.add.collider(this.rock2, this.platforms);
        this.physics.add.collider(this.rocks, this.platforms);
        this.physics.add.collider(this.bats, this.platforms);

        /*
        this.physics.add.collider(this.player, this.rocks, function(){
            console.log("chocan");
            self.collisionRocks();
            console.log("chocan");
        });
        */

        this.rocksCollider = this.physics.add.collider(this.player, this.rocks,function(){
            console.log("chocan");
            self.collisionRocks();
        },
            null,
            this
        );
        
        this.batsCollider = this.physics.add.overlap(this.player, this.bats, function(){
            self.collisionBats();
        },
            null,
            this
        );

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
        

    }

	/**
	* Loop del juego
	*/
    update(){
        console.log("Llega aquí por lo menos -update");
        this.background.tilePositionX += 0.15;
        this.distance += 1;
        this.scoreText.setText('Distance: ' + (this.distance || '') + '/20000');
        // deltaTime = this.time.elapsed/1000;
        this.movimientoBats();
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
        




        /*
        // Lo que tenía antes
        console.log(this.distance);
        if (this.cursors.right.isDown)
        {
            if(!this.jump){
                // player.setVelocityX(160);
                this.player.anims.play('right_amaia_goats', true);
            }
            // goat.setVelocityX(120);
            this.goat.anims.play('right_goat', true);
            
            if (this.cursors.up.isDown && !this.jump){
                this.player.setVelocityY(-250);
                this.jump = true;
                this.player.anims.play('jump_amaia', true); 
            }
            

            if (this.jump){
                if (this.player.body.velocity.y < 0) {
                    this.player.anims.play('jump_amaia', true);
                    console.log(this.player.body.velocity.y);
                } else if (this.player.body.velocity.y > 0) {
                    this.player.anims.play('fall_amaia', true);
                    console.log("amaia cae");
                }
                else{
                    this.player.anims.play('still_amaia', true);
                    console.log("still");
                }
            }
            if (this.player.body.touching.down){
                this.jump = false;
                console.log("amaia toca suelo");
            }
        }
        else
        {
            this.player.setVelocityX(0);
            if(!this.jump){
                this.player.anims.play('right_amaia_goats', true);  
            }
            else{
                this.player.anims.play('jump_amaia', true);
            }
            this.goat.setVelocityX(0);
            this.goat.anims.play('right_goat', true);
        }

        */
    }


    // ANIADIR que los murcielagos se arrojen a por amaia cuando se acerquen a ella
    movimientoBats(){
        if(this.contBats > 0){
            this.bats.getChildren().forEach(function(bat) {
                console.log(bat.anims.currentAnim.key);
                switch (bat.anims.currentAnim.key) {
                    case 1:
                        bat.setSize(10, 10);
                        console.log("llega aqui anim murci");
                        break;
                    case 2:
                        bat.setSize(80, 80);
                        console.log("llega a la segunda");
                        break;
                    // agregar más casos según sea necesario para cada animación
                    default:
                        bat.setSize(15, 22); // tamaño predeterminado
                        break;
                }
                if(Math.abs(this.player.body.position.x - bat.body.position.x) < 155){
                    if(bat.body.position.y > 215){ // OJO ESTO
                        bat.body.velocity.y += 0.4; 
                    }
                    else if (bat.body.position.y < 215){
                        bat.body.velocity.y -= 0.5;
                    }
                }
                else{
                    bat.body.velocity.y += 0;
                }
            
            }, this);
        }
    }   

    /* Cosas que tengo que hacer
    - Hacer clase murcielago separado
    - Añadir corazones
    - Controlar las colisiones:
        - Con roca -> retrocedes un poco y parpadeas 3 segundos siendo inmune DONE
        - Con murcielago -> pierdes corazon (tendrás tres imagino)
    - Añadir los 3 niveles
    - Arreglar lo de la distancia
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
        if (this.distance > 20000){
            // this.scene.stop('goatrun');
            // this.scene.start('goatrun2');
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
        // this.anims.pause(this.anims.currentAnim.frames[3]);
        // this.player.body.setOffset(20, 20);
        
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
    

    // Le resta un corazón a Amaia
    collisionBats(){
        this.makeInvulnerable();
        this.livesPlayer--;
        setTimeout(() => {
            console.log("aaaa");
            this.isInvulnerable = false; // hacer que el sprite sea vulnerable de nuevo
            this.player.alpha = 1; // establecer la opacidad del sprite en 1 (completamente visible)
            this.batsCollider.active = true;
        }, 2900);
    }

    // Retrocede 50 metros a Amaia
    collisionRocks() {
        this.makeInvulnerable();
        this.player.body.position.x -= 50; // Simplemente retrocedemos unos metros para atrás
        this.player.setVelocityX(+0);
        this.rocks.setVelocityX(-100);
        setTimeout(() => {
            console.log("aaaa");
            this.isInvulnerable = false; // hacer que el sprite sea vulnerable de nuevo
            this.player.alpha = 1; // establecer la opacidad del sprite en 1 (completamente visible)
            this.rocksCollider.active = true;
        }, 2900);
    }


    


    makeInvulnerable() {
        // Establece la variable isInvulnerable en true
        this.isInvulnerable = true;
        this.rocksCollider.active = false;
        this.batsCollider.active = false;
        // Hace que el sprite parpadee durante 4 segundos
        /*
        this.tweens.add({
          targets: this,
          alpha: 0.5,
          duration: 4000,
          yoyo: true,
          repeat: 7,
          onComplete: () => {
            // Después de que termine el parpadeo, establece la variable isInvulnerable en false
            this.isInvulnerable = false;
          }
        });
        */
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
