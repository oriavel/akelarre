/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Bat from './atp_bats.js';
import GoldenBat from './atp_bats_golden.js';
import Potion from './atp_Potion.js';
import PotionGreen from './atp_potion_green.js';
import PotionRed from './atp_potion_red.js';
import PotionPink from './atp_potion_pink.js';

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
        this.load.script('bat', 'src/js/scenes/atp_bats.js');
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

        // Inicialización de las variables para controlar la aparición de murciélagos
        //this.batInterval = 3000;
        this.nextBatTime = 0;

        // Crea un grupo para las pociones
        //this.potions = this.physics.add.group();
        this.potionGroup = this.add.group({
            classType: Potion,
            runChildUpdate: true
        });

        // Crea un grupo para los murciélagos
        this.batGroup = this.add.group({
            classType: Bat,
            runChildUpdate: true
        });
        
        
        this.batGroup.maxV = 3;
        this.batGroup.spwn = 0;
        
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.physics.add.collider(this.amaia, this.potionGroup, potionCollisionHandler, null, this);
        this.physics.add.collider(this.amaia, this.platforms, null,null, this);
        //this.physics.add.collider(this.amaia, this.potionGroup, null, null, this);
        //this.physics.add.collider(this.potionGroup, this.platforms, potionCollisionPlatform, null, this);
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
                this.batGroup.maxV = 5
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
                
                //sprites para las pociones
                if(this.potionType == 1){
                    //this.potion.setTexture('potionRED');
                    //this.potion.play("red_potion").setScale(3);
                    this.potion = new PotionRed(this, this.witch.x, this.witch.y);
                }
                else if(this.potionType ==2){
                    //this.potion.play("green_potion").setScale(3);
                    this.potion = new PotionGreen(this, this.witch.x, this.witch.y);
                }
                else if(this.potionType ==3){
                    //this.potion.play("pink_potion").setScale(3);                    
                    //this.potion.setTexture('potionPINK');
                    this.potion = new PotionPink(this, this.witch.x, this.witch.y);
                }
                else{
                    this.potion = new Potion(this, this.witch.x, this.witch.y);
                }
                //this.potion.init();
                this.potionGroup.add(this.potion);
                
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

            // Controla la aparición de murciélagos y su movimiento
            // El if comprueba si ha pasado timepo suficiente y si no se supera el maximo
            // de murciélagos a la vez (3)
            if (this.time.now > this.nextBatTime && (this.batGroup.maxV > this.batGroup.spwn - this.amaia.nKills)) {
                // decidimos 50% el lado de aparicion del murcielago
                if(Math.random()>0.50){
                    
                    if(Math.random()<0.15){
                        this.bat = new GoldenBat(this, 20, 375 + Math.random() * 80, 100 + Math.random() * 200 *this.level);
                    }
                    else{
                        this.bat = new Bat(this, 20, 375 + Math.random() * 80, 100 + Math.random() * 200 *this.level);
                    }
                }
                else{
                    if(Math.random()<1.15){
                        this.bat = new GoldenBat(this, this.game.config.width -20, 375 + Math.random() * 80, -100 + Math.random() * -200 *this.level);
                    }
                    else{
                        this.bat = new Bat(this, this.game.config.width -20, 375 + Math.random() * 80, -100 + Math.random() * -200 *this.level);
                    }
                }
                this.bat.body.velocity.x = 200;
                this.batGroup.add(this.bat);
                //this.batGroup.add(this.bat);
                this.batGroup.spwn++;
                //generamos tiempos distintos para el tiempo de aparicion
                this.batInterval = Math.floor(2000 + Math.random() * 5000)
                this.nextBatTime = this.time.now + this.batInterval;
            }
            // Controla el movimiento y la colisión entre el personaje "amaia" y los murciélagos
            this.batGroup.getChildren().forEach(function(bat) {
                // cambia las direcciones de los murciélagos al chocar con los laterales
                bat.checkMovement();
                
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
            if(this.temporizador<1){
                this.potionGroup.getChildren().forEach(function(potion) {
                    potion.death();
                }, this);
            }
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
   
