import Rock from "../../characters/goatrun/Rock.js";
import Bat from "../../characters/goatrun/bat.js";
import Spell from "../../characters/goatrun/Spell.js";
import Player_Goatrun from "../../characters/goatrun/player_goatrun.js";


/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class BaseGoatRun extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(key) {
		super(key);
        this.key = key;
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
        this.load.image('cave', 'src/assets/GoatRun/cave_long.png');
        this.load.image('cave2', 'src/assets/GoatRun/cave_marron.png');
        this.load.image('cave3', 'src/assets/GoatRun/cave_lava.png');
        this.load.image('ground', 'src/assets/GoatRun/platform_1.png');
        this.load.image('ground2', 'src/assets/GoatRun/platform_2.png');
        this.load.image('ground3', 'src/assets/GoatRun/platform_3.png');
        this.load.spritesheet('amaia_goatrun', 
            'src/assets/GoatRun/correr_spritesheet.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('goat', 
            'src/assets/GoatRun/goat_run.png',
            { frameWidth: 144, frameHeight: 144 }
        );
        this.load.spritesheet('amaia_jump', 
            'src/assets/GoatRun/amaia_jump.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('bat',
            'src/assets/GoatRun/bat_spritesheet.png', 
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('bat_doble',
            'src/assets/GoatRun/bat_doble.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.image('rock', 'src/assets/GoatRun/rock_1.png');
        this.load.image('rock2', 'src/assets/GoatRun/rock_2.png');
        this.load.image('rock3', 'src/assets/GoatRun/rock_3.png');
        this.load.spritesheet('amaia_death', 
            'src/assets/GoatRun/amaia_death.png',
            { frameWidth: 64, frameHeight: 64}
        );
        this.load.spritesheet('amaia_agachada', 
            'src/assets/GoatRun/amaia_agachada.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('hearts', 
            'src/assets/GoatRun/hearts.png',
            { frameWidth: 28, frameHeight: 24 }
        );
        this.load.image('heart', 'src/assets/GoatRun/heart.png');
        this.load.image('heart-filled', 'src/assets/GoatRun/heart-filled.png');

        this.load.spritesheet('spell_gravity', 
            'src/assets/GoatRun/gravity_spell.png',
            { frameWidth: 100, frameHeight: 53 }
        );

    
        let i;
        // Fire columns. 1-14
        for (i = 1; i < 15; i++) {
        this.load.image(
            "fire_column_" + i,
            "src/assets/GoatRun/fire" + "/fire_column_medium_" + i + ".png"
        );
        }
    }
	
    
	create(){

        this.initPhysics();

        this.createBackground();

        this.player = new Player_Goatrun(this, 320, 400, 'amaia_goatrun');
        this.physics.world.gravity.y = 400;

        this.heart1 = this.add.sprite(680, 30, 'hearts');
        this.heart2 = this.add.sprite(710, 30, 'hearts');
        this.heart3 = this.add.sprite(740, 30, 'hearts');
        
        this.goat = this.physics.add.sprite(70, 280, 'goat');
        this.goat.setSize(90, 180);

        this.createEnemies();

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
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'bat_doble',
            frames: this.anims.generateFrameNumbers('bat_doble', { start: 0, end: 2 }),
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
            key: 'spell_gravity',
            frames: this.anims.generateFrameNumbers('spell_gravity', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'fire_rock',
            frames: [
              { key: "fire_column_1" },
              { key: "fire_column_2" },
              { key: "fire_column_3" },
              { key: "fire_column_4" },
              { key: "fire_column_5" },
              { key: "fire_column_6" },
              { key: "fire_column_7" },
              { key: "fire_column_8" },
              { key: "fire_column_9" },
              { key: "fire_column_10" },
              { key: "fire_column_11" },
              { key: "fire_column_12" },
              { key: "fire_column_13" },
              { key: "fire_column_14" },
            ],
            frameRate: 10,
            repeat: -1
          });

        this.heart1.anims.play('heart_filled', true);
        this.heart2.anims.play('heart_filled', true);
        this.heart3.anims.play('heart_filled', true);


        this.cursors = this.input.keyboard.createCursorKeys();

        // this.player.setCollideWorldBounds(true);
        this.goat.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.goat, this.platforms);
        this.physics.add.collider(this.rocks, this.platforms);
        this.physics.add.collider(this.bats, this.platforms);
        this.physics.add.collider(this.spells, this.platforms);
        this.physics.add.overlap(this.player, this.goat, this.goatKills, null, this);

        this.createInitialScreen();

        this.scoreText = this.add.text(16, 16, 'Distance: 0/15000', { fontSize: '32px', fill: '#000', fontFamily: 'font'});
        this.hechizoText = this.add.text(16, 46, 'Hechizo de gravedad - Activado', { fontSize: '32px', fill: '#000', fontFamily: 'font'});
        this.hechizoText.setVisible(false);

        // Def variables para el update
        this.jump = false; // para evitar el doble salto
        this.changeCollider = true; // Para el cambio del tamaño de collider cuando se agacha
        this.amaiaIsDeath = false; // comprueba si ha muerto el personaje
        this.isInvulnerable = false; // cuando amaia ha sido golpeada tiene 3 segundos de invulnerabilidad
        this.livesPlayer = 3; // Nº de vidas del personaje
        this.distance = 0; // Recorrido
        this.batCollision = true; // Si es invulnerable no puede colisionar con los bats
        this.rockCollision = true; // Si es invulnerable no puede colisionar con las rocks
        this.startGame = false; // Si se ha comenzado el juego
        this.firstStart = true; // Para la primera vez que se comienza
        this.hechizado = false; // Si el personaje está bajo el hechizo de la gravedad
        this.restart = false; // Para cuando muere el personaje
        this.endGame = false; // Cuando termina el juego
        this.firstTime = false; // Auxiliar para el correcto cambio entre escenas
        

    }


    /*
        - Nivel 1, parecido al de dinosaurio de google, aparecen rapido y con frecuencia pero sin dificultad alguna. 
        Tambien aparece de vez en cuando un hechizo que te libera un poco de la gravedad durante 10 segundoss
        DONE


        - Nivel 2, aparecen más rápidos y hay murcielagos que quitan dos vidas
        DONE


        - Nivel 3, aparecen más frecuentes y algunas rocas tienen fuego, que te matan directamente
        DONE
    */

    createEnemies(){
        this.rocks = this.add.group();
        this.bats = this.add.group();
        this.spells = this.add.group();
        this.contBats = 0;
        const self = this;
            this.timer_enemies = this.time.addEvent({
                delay: Phaser.Math.Between(1800, 2200),
                loop: true, 
                paused: true,
                callback: function(){
                    var numAleatorio = Math.random();
                    if(numAleatorio < 0.5){ // Generamos una piedra
                        var objeto = new Rock(self, 950, 350, 'rock', self.player); 
                        self.rocks.add(objeto);
                    }
                    else{ // Generamos un murcielago
                        let objeto = new Bat(self, 900, 250, 'bat_doble', self.player);
                        self.bats.add(objeto);
                        self.contBats += 1;
                    }
                    var hechizo_random = Math.random();
                    if(hechizo_random < 0.15){
                        setTimeout(() => {
                            let objeto = new Spell(self, 950, 350, 'spell_gravity', self.player);
                            self.spells.add(objeto);
                        }, 1000);
                    }
    
                }
            });
    }

    createInitialScreen(){
        //Pantallita del texto
        this.graphics = this.add.graphics({x: this.game.config.width/15, y: this.game.config.height/3});
        this.graphics.fillStyle(0x000000, 0.8);
        this.graphics.fillRect(0, 0, 700, 100);
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.strokeRect(0, 0, 700, 100);
        //El texto
        this.text = this.add.text(this.graphics.x + 150, this.graphics.y+30, "Nivel 1: pulsa Enter para comenzar", { font: "24px Arial", fill: "#ffffff" });
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    }

	/**
	* Loop del juego
	*/
    update(){

        if (this.enterKey.isDown) {
            this.text.setVisible(false);
            this.text_.setVisible(false);
            this.graphics.setVisible(false);
            this.startGame = true;
        }
        if (this.startGame && !this.restart){
            if(this.firstStart){ // Si es la primera vez que se empieza
                this.goat.anims.play('right_goat', true);
                this.timer_enemies.paused = false;
                this.firstStart = false;
            }
            if(!this.amaiaIsDeath){
                this.background.tilePositionX += 0.15;
                this.distance += 1;
                this.scoreText.setText('Distance: ' + (this.distance || '') + '/15000');
                this.movimientoEnemies();
                
                    if(this.cursors.up.isDown){
                        if(!this.jump){ // Si no está saltando
                            this.player.jumps();
                        }            
                    }
                    if(this.jump){ // Si está saltando ya 
                        this.player.alreadyJumping();
                        if(this.cursors.down.isDown && this.player.body.touching.down){
                            this.player.agacharse();
                            this.jump = false;
                        }
                    }
            
                    if (this.player.body.touching.down && !this.cursors.down.isDown){ // Si amaia está tocando el suelo
                        this.player.aterrizar();
                    }
            
                    if(this.cursors.down.isDown){ // Si se presiona 'abajo'
                        if(!this.jump){ // Solo si no está saltando, si está en el aire no se puede agachar
                            this.player.agacharse();
                        }
                    }
                    else if (!this.changeCollider){
                        this.player.colliderNormal();
                    }
            
                    if(this.cursors.left.isDown){ // Prueba para comprobar animación de muerte
                        this.deathScene();
                        this.amaiaIsDeath = true;
                    }

                    if(this.hechizado == true){
                        this.hechizoText.setVisible(true);
                    }
                    else{
                        this.hechizoText.setVisible(false);
                    }

                    if(!this.isInvulnerable){
                        this.player.alpha = 1;
                    }

                    this.checkLives();
                   // if(!this.endGame){
                    this.checkLevel();
                    // }
            }
        
        }
        else if (this.restart){
            if (this.enterKey.isDown) { // Reinicia el juego
                this.scene.stop(this.key);
                this.scene.start('goatrun_nivel1');
            }
            
            else if (this.cursors.left.isDown) {// (this.escape.isDown){ // Vuelve a la cueva
                this.scene.stop(this.key);
                this.scene.start('cueva');
            }
            
        }
        
    }

    // La cabra mata a amaia
    goatKills(){
        this.player.deathfromGoat();
        this.amaiaIsDeath = true;
        this.deathScene();
    }

    
    // Funcion que accede a los movimientos de todos los enemigos
    movimientoEnemies(){
        if(this.contBats > 0){
            this.bats.getChildren().forEach(function(bat) {
                bat.movimiento_bats();
            }, this);
        }
    }   

    // Comprueba cuantas vidas tiene el personaje para mostrar los corazones por pantalla
    checkLives(){
        if(this.livesPlayer > 0 && this.livesPlayer < 3){
            switch(this.livesPlayer){
                case 1: 
                    this.heart2.anims.play('heart_empty', true);
                    this.heart3.anims.play('heart_empty', true);
                    break;
                case 2: 
                    this.heart3.anims.play('heart_empty', true);
                    break;
            }
        }
        else{
            if(this.livesPlayer <= 0){
                this.heart1.anims.play('heart_empty', true);
                this.heart2.anims.play('heart_empty', true);
                this.heart3.anims.play('heart_empty', true);
                this.deathScene();
                this.amaiaIsDeath = true;
            }
            
        }
    }

    // Comprueba que ha llegado a la distancia necesaria para pasarse el nivel
    checkLevel(){
        /* CADA CLASE HEREDADA HACE SU PROPIO CAMBIO DE NIVEL
        if (this.distance > 15000){
            this.changeScene();
            this.isInvulnerable = false;
            setTimeout(() => {
                this.scene.stop(this.key);
                this.scene.start('goatrun_nivel2');
            }, 3000); 
        }
        */
    }
    

    // Funcion auxiliar que sirve para que cuando Amaia se haya pasado el nivel avance unos metros indicando que se lo ha pasado
    changeScene(){
        this.destroyEnemies();
        this.player.reachEnd();
    }

    // La escena de la muerte
    deathScene(){
        this.time.removeAllEvents(); // Dejamos de generar enemigos
        this.destroyEnemies();
        this.cameras.main.fadeOut(5500);
        this.player.deathScene_();
        setTimeout(() => {
            this.cameras.main.fadeIn(2000);
            this.restartGame();
        }, 5500); 
              
    }

    // Muestra la pantalla de Game Over para dar la opcion de volver a jugar o salir a la cueva
    restartGame(){
        this.graphics2 = this.add.graphics({x: this.game.config.width/15, y: this.game.config.height/3});
        this.graphics2.fillStyle(0x000000, 0.8);
        this.graphics2.fillRect(0, 0, 700, 140);
        this.graphics2.lineStyle(4, 0x000000, 1);
        this.graphics2.strokeRect(0, 0, 700, 100);
        //El texto
        this.text2 = this.add.text(this.graphics2.x + 265, this.graphics2.y+20, "GAME OVER!", { font: "24px Arial", fill: "#ffffff" });
        this.text3 = this.add.text(this.graphics2.x + 115, this.graphics2.y+60, "(<-) para salir, Enter para empezar de nuevo", { font: "24px Arial", fill: "#ffffff" });
        this.restart = true;
    }
    
    // Destruye todos los enemigos que estén creados en el momento de la llamada
    destroyEnemies(){
        this.bats.getChildren().forEach(function(bat) {
            bat.body.destroy();
            bat.destroy();
        }, this);    
        this.contBats = 0;
        this.rocks.getChildren().forEach(function(rock_) {
            rock_.body.destroy();
            rock_.destroy();
        }, this);
        this.spells.getChildren().forEach(function(spell) {
            spell.body.destroy();
            spell.destroy();
        }, this);
    }

    // Vuelve a Amaia invulnerable durante casi 4 segundos. Se muestra en el juego mediante un parpadeo
    makeInvulnerable() {
        this.isInvulnerable = true;
        this.rockCollision = false;
        this.batCollision = false;
        this.turnBlink = 1;
        this.time.addEvent({
            delay: 400, // cada 400 milisegundos (2'5 veces por segundo)
            repeat: 9, // durante 9 ciclos (3'6 segundos en total)
            callback: function() {
                if (this.turnBlink == 0){
                    this.player.alpha = 1;
                    this.turnBlink = 1;
                }
                else{
                    this.player.alpha = 0;
                    this.turnBlink = 0;
                }
            },
            callbackScope: this,
          });
      }


    /* Para la animación de muerte, hace zoom sobre el personaje
    zoomEnPunto(x, y, zoom) {
        const x0 = this.cameras.main.scrollX;
        const y0 = this.cameras.main.scrollY;
        const w0 = this.cameras.main.width;
        const h0 = this.cameras.main.height;

        // Calcular la nueva posición y el tamaño de la cámara después del zoom
        const w1 = w0 / zoom;
        const h1 = h0 / zoom;
        const x1 = x + 10 - w1 / 2;
        const y1 = y + 40 - h1 / 2;

        const dx = x1 - x0;
        const dy = y1 - y0;
        this.cameras.main.scrollX += dx;
        this.cameras.main.scrollY += dy;
        this.cameras.main.setViewport(x1, y1, w1, h1);
    }
    */
}