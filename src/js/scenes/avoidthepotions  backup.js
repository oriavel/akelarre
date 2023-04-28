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
        //this.physicsPlugin = null;
        
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
        // poner un fondo decente
        this.load.image('cave', 'src/assets/AvoidThePotions/cueva_potions.png');
        this.load.image('ground', 'src/assets/AvoidThePotions/platform.png');
        // Hacer una amaia original
        this.load.spritesheet('amaia', 
            'src/assets/Personajes/Prota.png',
            { frameWidth: 34, frameHeight: 34 }
        );
        //el 1 y 2 son los que están en llamas
        this.load.spritesheet('amaia_onFire', 
            'src/assets/Personajes/Prota_ardiendo.png',
            { frameWidth: 34, frameHeight: 34 }
        );
        // Lo voamos a usar como las brujas de manera temporal
        this.load.spritesheet('witch', 
            'src/assets/AvoidThePotions/BrujaEscoba.png',
            { frameWidth: 50, frameHeight: 32 }
        );
        // mini malos
        this.load.spritesheet('bat',
            'src/assets/AvoidThePotions/bat_spritesheet.png', 
            { frameWidth: 31, frameHeight: 32}
        );
        this.load.spritesheet('golden_bat',
            'src/assets/AvoidThePotions/goldenbat_spritesheet.png', 
            { frameWidth: 31, frameHeight: 32}
        );
        this.load.spritesheet('potionRED',
            'src/assets/AvoidThePotions/red_potion/red_full_potion.png', 
            { frameWidth: 16, frameHeight: 16}
        );
        this.load.spritesheet('potionPINK',
            'src/assets/AvoidThePotions/pink_potion/pink_full_potion.png', 
            { frameWidth: 16, frameHeight: 16}
        );
        this.load.spritesheet('potionGREEN',
            'src/assets/AvoidThePotions/green_potion/green_full_potion.png', 
            { frameWidth: 16, frameHeight: 16}
        );
        this.load.spritesheet('potion',
            'src/assets/AvoidThePotions/yellow_potion/yellow_full_potion.png', 
            { frameWidth: 16, frameHeight: 16}
        );
        this.load.image('fire_column_1', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_1.png');
        this.load.image('fire_column_2', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_2.png');
        this.load.image('fire_column_3', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_3.png');
        this.load.image('fire_column_4', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_4.png');
        this.load.image('fire_column_5', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_5.png');
        this.load.image('fire_column_6', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_6.png');
        this.load.image('fire_column_7', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_7.png');
        this.load.image('fire_column_8', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_8.png');
        this.load.image('fire_column_9', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_9.png');
        this.load.image('fire_column_10', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_10.png');
        this.load.image('fire_column_11', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_11.png');
        this.load.image('fire_column_12', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_12.png');
        this.load.image('fire_column_13', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_13.png');
        this.load.image('fire_column_14', 'src/assets/AvoidThePotions/columna_fuego/fire_column_medium_14.png');

        this.load.image('poison_cloud_1', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud1.png');
        this.load.image('poison_cloud_2', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud2.png');
        this.load.image('poison_cloud_3', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud3.png');
        this.load.image('poison_cloud_4', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud4.png');
        this.load.image('poison_cloud_5', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud5.png');
        this.load.image('poison_cloud_6', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud6.png');
        this.load.image('poison_cloud_7', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud7.png');
        this.load.image('poison_cloud_8', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud8.png');
        this.load.image('poison_cloud_9', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud9.png');
        this.load.image('poison_cloud_10', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud10.png');
        this.load.image('poison_cloud_11', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud11.png');
        this.load.image('poison_cloud_12', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud12.png');
        this.load.image('poison_cloud_13', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud13.png');
        this.load.image('poison_cloud_14', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud14.png');
        this.load.image('poison_cloud_15', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud15.png');
        this.load.image('poison_cloud_16', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud16.png');
        this.load.image('poison_cloud_17', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud17.png');
        this.load.image('poison_cloud_18', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud18.png');
        this.load.image('poison_cloud_19', 'src/assets/AvoidThePotions/Poison Cloud/Poison Cloud19.png');
    
        this.load.image('bat_death_1', 'src/assets/AvoidThePotions/npc_death/FX001_01.png');
        this.load.image('bat_death_2', 'src/assets/AvoidThePotions/npc_death/FX001_02.png');
        this.load.image('bat_death_3', 'src/assets/AvoidThePotions/npc_death/FX001_03.png');
        this.load.image('bat_death_4', 'src/assets/AvoidThePotions/npc_death/FX001_04.png');
        this.load.image('bat_death_5', 'src/assets/AvoidThePotions/npc_death/FX001_05.png');
        
        this.load.image('floor_kick_1', 'src/assets/AvoidThePotions/golpe_suelo/FX002_05.png');
        this.load.image('floor_kick_2', 'src/assets/AvoidThePotions/golpe_suelo/FX002_06.png');
        this.load.image('floor_kick_3', 'src/assets/AvoidThePotions/golpe_suelo/FX002_07.png');
        this.load.image('floor_kick_4', 'src/assets/AvoidThePotions/golpe_suelo/FX002_08.png');
        
        this.load.image('floor_kick_pink_1', 'src/assets/AvoidThePotions/golpe_suelo_pink/FX002_05.png');
        this.load.image('floor_kick_pink_2', 'src/assets/AvoidThePotions/golpe_suelo_pink/FX002_06.png');
        this.load.image('floor_kick_pink_3', 'src/assets/AvoidThePotions/golpe_suelo_pink/FX002_07.png');
        this.load.image('floor_kick_pink_4', 'src/assets/AvoidThePotions/golpe_suelo_pink/FX002_08.png');
        
        this.load.image('vacio','src/assets/vacio.png');
    }
	

    
	create(){

        this.background = this.add.tileSprite(0, 0, 800, 500, 'cave').setOrigin(0).setScale(1.95);
        this.anims.create({
            key: 'exploding_death_potion',
            frames: [
                { key: 'fire_column_1' },
                { key: 'fire_column_2' },
                { key: 'fire_column_3' },
                { key: 'fire_column_4' },
                { key: 'fire_column_5' },
                { key: 'fire_column_6' },
                { key: 'fire_column_7' },
                { key: 'fire_column_8' },
                { key: 'fire_column_9' },
                { key: 'fire_column_10' },
                { key: 'fire_column_11' },
                { key: 'fire_column_12' },
                { key: 'fire_column_13' },
                { key: 'fire_column_14' }
            ],
            frameRate: 10,
        });
        this.anims.create({
            key: 'exploding_poison_potion',
            frames: [
                { key: 'poison_cloud_1' },
                { key: 'poison_cloud_2' },
                { key: 'poison_cloud_3' },
                { key: 'poison_cloud_4' },
                { key: 'poison_cloud_5' },
                { key: 'poison_cloud_6' },
                { key: 'poison_cloud_7' },
                { key: 'poison_cloud_8' },
                { key: 'poison_cloud_9' },
                { key: 'poison_cloud_10' },
                { key: 'poison_cloud_11' },
                { key: 'poison_cloud_12' },
                { key: 'poison_cloud_13' },
                { key: 'poison_cloud_14' },
                { key: 'poison_cloud_15' },
                { key: 'poison_cloud_16' },
                { key: 'poison_cloud_17' },
                { key: 'poison_cloud_18' },
                { key: 'poison_cloud_19' }
            ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'bat',
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'goldenBat',
            frames: this.anims.generateFrameNumbers('golden_bat', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'bat_death',
            frames: [
                { key: 'bat_death_1' },
                { key: 'bat_death_2' },
                { key: 'bat_death_3' },
                { key: 'bat_death_4' },
                { key: 'bat_death_5' }
            ],
            frameRate: 10,
        });
        this.anims.create({
            key: 'floor_kick',
            frames: [
                { key: 'floor_kick_1' },
                { key: 'floor_kick_2' },
                { key: 'floor_kick_3' },
                { key: 'floor_kick_4' }
            ],
            frameRate: 8,
        });
        this.anims.create({
            key: 'floor_kick_pink',
            frames: [
                { key: 'floor_kick_pink_1' },
                { key: 'floor_kick_pink_2' },
                { key: 'floor_kick_pink_3' },
                { key: 'floor_kick_pink_4' }
            ],
            frameRate: 8,
        });
        this.anims.create({
            key: 'red_potion',
            frames: this.anims.generateFrameNumbers('potionRED', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'pink_potion',
            frames: this.anims.generateFrameNumbers('potionPINK', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'yellow_potion',
            frames: this.anims.generateFrameNumbers('potion', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'green_potion',
            frames: this.anims.generateFrameNumbers('potionGREEN', { start: 0, end: 6 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'amaia_running_left',
            frames: this.anims.generateFrameNumbers('amaia', { start: 8, end: 11 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'amaia_running_right',
            frames: this.anims.generateFrameNumbers('amaia', { start: 12, end: 15 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'amaia_stay',
            frames: this.anims.generateFrameNumbers('amaia', { start: 1, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'amaia_burning_red',
            frames: this.anims.generateFrameNumbers('amaia_onFire', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: 2
        });
        this.anims.create({
            key: 'amaia_burning_green',
            frames: this.anims.generateFrameNumbers('amaia_onFire', { start: 2, end: 3 }),
            frameRate: 3,
            repeat: 2
        });
        this.anims.create({
            key: 'amaia_hit',
            frames: this.anims.generateFrameNumbers('amaia_onFire', { start: 6, end: 7 }),
            frameRate: 5,
            repeat: 1
        });
        this.anims.create({
            key: 'witch_right',
            frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'witch_left',
            frames: this.anims.generateFrameNumbers('witch', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.initPhysics();
        this.physics.add.existing(this, { arcade: true });
        // Crea el sprite para el personaje "amaia"
        this.amaia = this.physics.add.sprite(300, 400, 'amaia').setScale(2);
        this.amaia.setSize(16,25);
        this.amaia.setOffset(9,8);
        this.amaia.speed = 200;
        this.amaia.canJump = true;
        this.amaia.inversedControlsTimer = 0;
        this.amaia.jumpTimer = 0;
        this.amaia.nKills = 0;
        this.amaia.lives = 2;
        this.amaia.isHurt = "none";
        //this.amaia.setData('vel', this.amaiaMovementSpeed);
        //this.amaia.setData('cad_vel', this.fechaCaducaVel);
        
        // Crea el sprite para la bruja "witch"
        this.witch = this.physics.add.sprite(50, 70, 'witch');
        this.witch.setScale(2.25);
        this.witch.setSize(35,25)
        this.witch.body.allowGravity = false;
        //this.witch.body.velocity.x = 200;
        //Crea el suelo
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();


        // Inicialización de las variables para controlar el lanzamiento de pociones
        this.potionInterval = 1500;
        this.nextPotionTime = 0;
        this.potionVelocity = 75;

        // Inicialización de las variables para controlar la aparición de murciélagos
        //this.batInterval = 3000;
        this.nextBatTime = 0;

        // Crea un grupo para las pociones
        this.potions = this.physics.add.group();


        // Crea un grupo para los murciélagos
        this.bats = this.physics.add.group();
        this.bats.maxV = 3;
        this.bats.spwn = 0;
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.amaia, this.potions, potionCollisionHandler, null, this);
        this.physics.add.collider(this.amaia, this.platforms, null,null, this);
        this.physics.add.collider(this.amaia, this.potions, null, null, this);
        this.physics.add.collider(this.potions, this.platforms, potionCollisionPlatform, null, this);
        this.amaia.setCollideWorldBounds(true);
        this.witch.setCollideWorldBounds(true);

        this.fireGroup = this.physics.add.group();
        this.tiempoInicio = 62000;
        this.temporizador = this.tiempoInicio;
        this.livesLeft = this.add.text(16, 16, 'Lives: '+ this.amaia.lives, { fontSize: '32px', fill: 'white', fontFamily: 'font'});
        this.timeLeft = this.add.text(this.game.config.width -250 , 16, 'Time Left: '+ this.temporizador/60000 + 'm', { fontSize: '32px', fill: 'white', fontFamily: 'font'});

        this.nivel = "facil";
        this.levelMultiplier = 1;


        //Pantallita del texto
        this.graphics = this.add.graphics({x: this.game.config.width/15, y: this.game.config.height/3});
        this.graphics.fillStyle(0x000000, 0.8);
        this.graphics.fillRect(0, 0, 700, 100);
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.strokeRect(0, 0, 700, 100);
        
        //El texto
        this.text = this.add.text(this.graphics.x + 150, this.graphics.y+30, "Para empezar la partida, pulsa enter", { font: "24px Arial", fill: "#ffffff" });
        
        // Teclas pantalla inicio
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.startGame = false;
        //this.startGame= true;
    }

	

    update() {
        this.livesLeft.setText('Lives: ' + this.amaia.lives);
        if (this.enterKey.isDown) {
            this.text.setVisible(false);
            this.graphics.setVisible(false);
            this.startGame = true;
          }
        // Comprueba la animación de amaia que se debe usar
        if(this.amaia.isHurt != "none"){
            if(this.amaia.isHurt == "RED"){
                this.amaia.anims.play("amaia_burning_red",true);
            }
            else if(this.amaia.isHurt == "GREEN"){
                this.amaia.anims.play("amaia_burning_green",true);
            }
            else if(this.amaia.isHurt == "HIT"){
                this.amaia.anims.play("amaia_hit",true);
            }
            this.amaia.on('animationcomplete', () => {
                // Una vez termina la animacion, se desactiva la animación
                this.amaia.isHurt = "none";
            });
        }
        else if(this.amaia.body.velocity.x > 0){
            this.amaia.play("amaia_running_right",true);
        }
        else if (this.amaia.body.velocity.x < 0){
            this.amaia.play("amaia_running_left",true);
        }
        else if (this.amaia.body.velocity.x == 0){
            this.amaia.play("amaia_stay",true);
        }

        if(this.witch.body.velocity.x > 0){
            this.witch.play("witch_right",true);
        }
        else if (this.witch.body.velocity.x < 0){
            this.witch.play("witch_left",true);
        }

        if (this.startGame && this.amaia.lives > 0 && this.temporizador>0) {
            this.timeLeft.setText('Time Left: '+ Math.floor(this.temporizador/60000) + 'm '+ Math.floor(this.temporizador%60000/1000) + 's');
        
            //Al llegar a la mitad de tiempo, aumentamos la dificultad
            if(this.temporizador < this.tiempoInicio/2 && this.nivel == "facil"){
                this.nivel = "medio";
                this.levelMultiplier = 2;
                this.bats.maxV = 5
            }

            // Con este if, evitamos que el tiempo se ponga en negativo
            if(this.tiempoInicio - this.time.now < 1){
                this.temporizador = 0;
            }
            else{
                this.temporizador = this.tiempoInicio - this.time.now;
            }
            
            // Controla el movimiento del personaje "amaia"
            if (this.cursors.left.isDown) {
                this.amaia.body.velocity.x = -this.amaia.speed;
            }
            if (this.cursors.right.isDown) {
                this.amaia.body.velocity.x = this.amaia.speed;
            }
            if(!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this.amaia.body.velocity.x = 0;
            }

            

            


            if(this.cursors.up.isDown && this.amaia.body.touching.down && this.amaia.canJump){
                this.amaia.body.velocity.y = -250;
            }
            // Controla el lanzamiento de pociones por parte de la bruja "witch"
            if (this.time.now > this.nextPotionTime) {
                this.potionType = Math.floor(Math.random() * 4); // Hay tres tipos de pociones distintos
                this.potion = this.potions.create(this.witch.x, this.witch.y, 'potion',this.potionType);
                this.potion.setData('type', this.potionType);
                this.potion.setSize(16,16);
                //sprites para las pociones
                if(this.potionType == 1){
                    //this.potion.setTexture('potionRED');
                    this.potion.play("red_potion").setScale(3);
                }
                else if(this.potionType ==2){
                    this.potion.play("green_potion").setScale(3);
                }
                else if(this.potionType ==3){
                    this.potion.play("pink_potion").setScale(3);                    
                    //this.potion.setTexture('potionPINK');
                }
                else{
                    this.potion.play("yellow_potion").setScale(3);
                }
                this.potion.body.velocity.y = this.potionVelocity;
                this.nextPotionTime = this.time.now + this.potionInterval;
                // cambia el sentido de la bruja
                if(this.witch.body.velocity.x > 0 || this.witch.x + this.witch.width >= this.game.config.width){
                    this.witch.body.velocity.x = -200;
                }
                else{
                    this.witch.body.velocity.x = 200;
                }
                //generamos un tiempo aleatorio para la siguiente pocion
                this.potionInterval = Math.floor(Math.random() * 4000);
                this.potionInterval = this.potionInterval/this.levelMultiplier;
            }

            // Controla la colisión entre el personaje "amaia" y las pociones
            this.potions.getChildren().forEach(function(potion) {
                if(this.temporizador == 0){
                    var potion_air_explosion = this.add.sprite(potion.body.x+15, potion.body.y+5, 'bat_death').setScale(2);
                    potion.destroy();
                    potion_air_explosion.play('bat_death');
                    potion_air_explosion.on('animationcomplete', () => {
                        // Eliminar el sprite una vez que la animación haya terminado
                        potion_air_explosion.destroy();
                    }); 
                }
                else{
                    this.physics.collide(this.amaia, potion, potionCollisionHandler, {type: potion.getData("type")}, this);
                    this.physics.add.collider(potion, this.platforms, potionCollisionPlatform, null, this);
                }
            }, this);

            // Controla la aparición de murciélagos y su movimiento
            // El if comprueba si ha pasado timepo suficiente y si no se supera el maximo
            // de murciélagos a la vez (3)
            if (this.time.now > this.nextBatTime && (this.bats.maxV > this.bats.spwn - this.amaia.nKills)) {
                
                // decidimos 50% el lado de aparicion del murcielago
                if(Math.random()>0.50){
                    this.bat = this.bats.create(20 , 375 + Math.random() * 80, 'bat');
                    this.bat.body.allowGravity = false;
                    this.bat.body.velocity.x = 100 + Math.random() * 200;
                }
                else{
                    this.bat = this.bats.create(this.game.config.width -20 , 375 + Math.random() * 80, 'bat');
                    this.bat.body.allowGravity = false;
                    this.bat.body.velocity.x = -100 + Math.random() * -200;
                }
                
                    //dificultad de nivel facil o medio
                    this.bat.body.velocity.x *= this.levelMultiplier;
                this.bat.setScale(1.4);
                this.bat.setSize(15,15);
                // 15% de posibilidades de que salga un murciélago dorado
                if(Math.random()<0.15){
                    this.bat.tipo = "golden";
                    this.bat.play("goldenBat");
                }
                else{
                    this.bat.tipo = "default";
                    this.bat.play("bat");
                }
                this.bats.spwn++;
                //generamos tiempos distintos para el tiempo de aparicion
                this.batInterval = Math.floor(2000 + Math.random() * 5000)
                this.nextBatTime = this.time.now + this.batInterval;

                
            }
            // Controla la colisión entre el personaje "amaia" y los murciélagos
            this.bats.getChildren().forEach(function(bat) {
                // cambia las direcciones de los murciélagos al chocar con los laterales
                if (bat.body.position.x < 0 || bat.body.position.x > this.game.config.width -20) {
                    bat.body.velocity.x *= -1;
                }
                this.physics.collide(this.amaia, bat, batCollisionHandler, null, this);
            }, this);

            // COmprueba que pasen los milisegundos de castigo por la pocion de salto
            if(!this.amaia.canJump && this.amaia.jumpTimer < this.time.now && this.amaia.jumpTimer !=0){
                // si el valor es -1 quiere decir que acaba de caernos una pocion de salto
                // iniciamos la cuenta atrás
                if(this.amaia.jumpTimer == -1){
                    this.amaia.jumpTimer = 2000 + this.time.now;
                }
                // si el valor es distinto a -1 quiere decir que ya hemos cumplido el castigo
                // se nos devuelve la capacidad de salto
                else if(this.amaia.jumpTimer<this.time.now && this.amaia.jumpTimer>0){
                    this.amaia.canJump = true;
                    this.amaia.jumpTimer = 0;
                }
            }
            // Temporizador controles invertidos
            if(this.amaia.inversedControlsTimer < this.time.now && this.amaia.inversedControlsTimer !=0){
                // si el valor es -1 quiere decir que acaba de caernos una pocion de inversion de controles
                // iniciamos la cuenta atrás
                if(this.amaia.inversedControlsTimer == -1){
                    this.amaia.inversedControlsTimer = 5000 + this.time.now;
                }
                // si el valor es distinto a -1 quiere decir que ya hemos cumplido el castigo
                // se nos devuelven los controles normales
                else if(this.amaia.inversedControlsTimer<this.time.now && this.amaia.inversedControlsTimer>0){
                    this.amaia.inversedControlsTimer = 0;
                    this.amaia.speed = -this.amaia.speed;
                }
            }
            
        }
        else if(this.amaia.lives < 1 || this.temporizador<1){
            if(this.amaia.lives < 1){
            this.amaia.disableBody(true,true);
            }
            this.witch.body.velocity.x = -250;
            this.amaia.body.velocity.x = 250;
            this.amaia.setCollideWorldBounds(false);
            this.witch.setCollideWorldBounds(false);
        }

    }
}
    // Función que se ejecuta cuando una poción colisiona con el personaje "amaia"


    // Función que se ejecuta cuando un murciélago colisiona con el

function potionCollisionHandler(amaia, potion) {
    console.log("Daño de pocion: " + potion.getData("type"));
    if(potion.getData("type") == 1){ // Pocion RED
        amaia.lives = 0; //muere
        
    }
    else if(potion.getData("type") == 2){ //Pocion GREEN
        //velocidad movimiento amaia a un cuarto hasta que mate un murciélago
        amaia.speed = 50;
    }
    else if(potion.getData("type") == 3){ //Pocion PINK
        //controles invertidos
        if(this.amaia.speed >0){
            amaia.speed = -amaia.speed;
        }
        amaia.inversedControlsTimer = -1;
    }
    else{ //Pocion Default
        amaia.canJump = false;
        amaia.jumpTimer = -1;
    }
    potion.body.destroy();
    potion.destroy();
    
    // efecto de la pocion que sea
}
function potionCollisionPlatform(potion, platforms) {
    //la pocion toca el suelo y se destruye
    // animacion pocion contra el suelo
    if(potion.getData("type") == 1){ // Pocion RED
        var red_explosion = this.add.sprite(potion.body.x+30, potion.body.y-20, 'exploding_death_potion').setScale(2);
        red_explosion.play('exploding_death_potion');
        var collider_fire = this.fireGroup.create(potion.body.x+30, potion.body.y,'vacio').setScale(1.15);
        collider_fire.body.allowGravity = false;
        collider_fire.setSize(30,90);
        collider_fire.tipo = "RED";
        this.physics.add.collider(this.amaia, collider_fire, seQUEMA, null, this);
        
        red_explosion.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            red_explosion.destroy();
            collider_fire.destroy();
        });
    }
    else if(potion.getData("type") == 2){ // Pocion GREEN
        var green_explosion = this.add.sprite(potion.body.x+30, potion.body.y-35).setScale(1.15);
        var collider_fire = this.fireGroup.create(potion.body.x+30, potion.body.y,"vacio").setScale(1.15);
        green_explosion.play('exploding_poison_potion');
        collider_fire.body.allowGravity = false;
        collider_fire.setSize(37,80);
        collider_fire.tipo = "GREEN";
        this.physics.add.collider(this.amaia, collider_fire, seQUEMA, null, this);
        
        green_explosion.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            collider_fire.destroy();
            green_explosion.destroy();
        });
    }
    else if(potion.getData("type") == 3){ //Pocion PINK
        var pink_explosion = this.add.sprite(potion.body.x+26, potion.body.y+30, 'floor_kick_pink').setScale(1.15);
        pink_explosion.play('floor_kick_pink');
        pink_explosion.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            pink_explosion.destroy();
        });
    }
    else{
        var default_explosion = this.add.sprite(potion.body.x+26, potion.body.y+30, 'floor_kick').setScale(1.15);
        default_explosion.play('floor_kick');
        default_explosion.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            default_explosion.destroy();
        });
    }
    potion.body.destroy();
    potion.destroy();
    
    
}
function seQUEMA(amaia,col){
    col.disableBody(true,true);
    amaia.isHurt = col.tipo;
    if(col.tipo == "GREEN"){
        amaia.speed /=2;
    }
    else if(col.tipo == "RED"){
        amaia.lives--;
        console.log("Te quemas, te quedan "+amaia.lives+" vidas...");
    }
}
function batCollisionHandler(amaia, bat) {
    // si al chocar amaia no se encuentra por encima del murcielago, la que sufre daño es ella
    if(amaia.y < bat.y-35){
        if(bat.tipo == "golden"){
            amaia.lives++;
        }
        var bat_dying = this.add.sprite(bat.body.x+15, bat.body.y+5, 'bat_death').setScale(2);
        bat_dying.play('bat_death');
        bat_dying.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            bat_dying.destroy();
        });
        bat.body.destroy();
        bat.destroy();
        //si está bajo los efectos de la pocion de inversion de controles
        if(amaia.speed <= 200 && amaia.speed > 0){
            amaia.speed = 200;
        }
        else{
            amaia.speed = -200;
        }
        amaia.nKills++;
        amaia.body.velocity.y = -100;
    }
    else{
        amaia.nKills++;
        var bat_dying = this.add.sprite(bat.body.x+15, bat.body.y+5, 'bat_death').setScale(2);
        bat_dying.play('bat_death');
        bat_dying.on('animationcomplete', () => {
            // Eliminar el sprite una vez que la animación haya terminado
            bat_dying.destroy();
        });
        bat.body.destroy();
        bat.destroy();
        amaia.isHurt = "HIT";
        amaia.lives--;
    }
}
