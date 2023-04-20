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
        this.load.image('potion', 'src/assets/potionreal2.png');
        this.load.image('potionRED', 'src/assets/potionreal2RED.png');
        this.load.image('potionPINK', 'src/assets/potionreal2PINK.png');
        this.load.image('potionGREEN', 'src/assets/potionreal2GREEN.png');
    }
	

    
	create(){
        this.initPhysics();
        this.startGame= true;
        this.physics.add.existing(this, { arcade: true });
        // Crea el sprite para el personaje "amaia"
        this.amaia = this.physics.add.sprite(300, 400, 'amaia');
        this.amaia.speed = 200;
        this.amaia.canJump = true;
        this.amaia.inversedControlsTimer = 0;
        this.amaia.jumpTimer = 0;
        this.amaia.nKills = 0;
        //this.amaia.setData('vel', this.amaiaMovementSpeed);
        //this.amaia.setData('cad_vel', this.fechaCaducaVel);
        
        // Crea el sprite para la bruja "witch"
        this.witch = this.physics.add.sprite(50, 50, 'witch');
        this.witch.body.allowGravity = false;
        this.witch.body.velocity.x = 200;
        //Crea el suelo
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'ground').setScale(2).refreshBody();


        // Inicialización de las variables para controlar el lanzamiento de pociones
        this.potionInterval = 1500;
        this.nextPotionTime = 0;
        this.potionVelocity = 75;

        // Inicialización de las variables para controlar la aparición de murciélagos
        this.batInterval = 3000;
        this.nextBatTime = 0;

        // Crea un grupo para las pociones
        this.potions = this.physics.add.group();
        //this.potions.body.allowGravity = false;

        /*
        // Crea las diferentes pociones y las añade al grupo de pociones
        for (let i = 0; i < 5; i++) {
            const potionType = i % 3; // Hay tres tipos de pociones distintos --- potion${potionType}
            const potion = this.potions.create(Math.random() * this.game.config.width, -50, 'potion');
            potion.body.velocity.y = this.potionVelocity;
        }
        */

        // Crea un grupo para los murciélagos
        this.bats = this.physics.add.group();
        this.bats.maxV = 3;
        this.bats.spwn = 0;
        
        
        // Crea los murciélagos y los añade al grupo de murciélagos
        /*
        for (let i = 0; i < 3; i++) {
            this.bat = this.bats.create(20 + i , 250 + Math.random() * 200, 'bat');
            this.bat.body.allowGravity = false;
            this.bat.body.velocity.x = 100 + Math.random() * 200;
            //this.bat.setCollideWorldBounds(true);
        }
        */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.amaia, this.potions, potionCollisionHandler, null, this);
        this.physics.add.collider(this.amaia, this.platforms, null,null, this);
        this.physics.add.collider(this.amaia, this.potions, null, null, this);
        this.physics.add.collider(this.potions, this.platforms, potionCollisionPlatform, null, this);
        this.amaia.setCollideWorldBounds(true);
        this.witch.setCollideWorldBounds(true);
    }

	

    update() {
        if (this.startGame) {
            // Controla el movimiento del personaje "amaia"
            if (this.cursors.left.isDown) {
                console.log(-this.amaia.speed);
                this.amaia.body.velocity.x = -this.amaia.speed;
            }
            else if (this.cursors.right.isDown) {
                this.amaia.body.velocity.x = this.amaia.speed;
            }
            else {
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
                
                //sprites para las pociones
                if(this.potionType == 1){
                    this.potion.setTexture('potionRED');
                }
                else if(this.potionType ==2){
                    this.potion.setTexture('potionGREEN');
                }
                else if(this.potionType ==3){
                    this.potion.setTexture('potionPINK');
                }
                this.potion.body.velocity.y = this.potionVelocity;
                this.nextPotionTime = this.time.now + this.potionInterval;
                // cambia el sentido de la bruja
                if(this.witch.body.velocity.x > 0 || this.witch.x + this.witch.width / 2 >= this.game.config.width){
                    this.witch.body.velocity.x = -200;
                }
                else{
                    this.witch.body.velocity.x = 200;
                }
                //generamos un tiempo aleatorio para la siguiente pocion
                this.potionInterval = Math.floor(Math.random() * 4000);
            }

            // Controla la colisión entre el personaje "amaia" y las pociones
            this.potions.getChildren().forEach(function(potion) {
                this.physics.collide(this.amaia, potion, potionCollisionHandler, {type: potion.getData("type")}, this);
                this.physics.add.collider(potion, this.platforms, potionCollisionPlatform, null, this);
            }, this);

            // Controla la aparición de murciélagos y su movimiento
            // El if comprueba si ha pasado timepo suficiente y si no se supera el maximo
            // de murciélagos a la vez (3)
            if (this.time.now > this.nextBatTime && (this.bats.maxV > this.bats.spwn - this.amaia.nKills)) {
                console.log("ENTRA");
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
                this.bats.spwn++;
                console.log(Math.random());
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
                }
            }
            
        }

    }
}
    // Función que se ejecuta cuando una poción colisiona con el personaje "amaia"


    // Función que se ejecuta cuando un murciélago colisiona con el

function potionCollisionHandler(amaia, potion) {
    console.log("Daño de pocion" + potion.getData("type"));
    if(potion.getData("type") == 1){ // Pocion RED
        amaia.disableBody(true,true); //muere
    }
    else if(potion.getData("type") == 2){ //Pocion GREEN
        //velocidad movimiento amaia a la mitad hasta que mate un murciélago
        amaia.speed = 50;
    }
    else if(potion.getData("type") == 3){ //Pocion PINK
        //controles invertidos
        amaia.speed = -amaia.speed;
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
    potion.body.destroy();
    potion.destroy();
    
}
function batCollisionHandler(amaia, bat) {
    // si al chocar amaia no se encuentra por encima del murcielago, la que sufre daño es ella
    if(amaia.y < bat.y-13){
        bat.body.destroy();
        bat.destroy();
        //si está bajo los efectos de la pocion de inversion de controles
        if(amaia.speed == -50){
            amaia.speed = -200;
        }
        else{
            amaia.speed = 200;
        }
        amaia.nKills++;
        amaia.body.velocity.y = -100;
    }
    else{
        amaia.disableBody(true,true);
    }
    // decrementar la salud del jugador??
}
