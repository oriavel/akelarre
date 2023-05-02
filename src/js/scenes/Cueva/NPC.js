export default class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, dialog, offsetX, offsetY, sizeX, sizeY) {
        super(scene,x,y);
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.dKey = dialog;

        // Agregar la clase al juego
        scene.add.existing(this);
      
        // Agregar la física al objeto
        scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, this.scene.layer, null,null, this);

        // Configurar las propiedades de la física
        this.body.setCollideWorldBounds(false);

    
    }
    
    createSprite(key){
        this.scene.physics.add.sprite(this.x, this.y, key).setScale(2);
        this.setSize(this.sizeX, this.sizeY);
        this.setDepth(1);
        this.body.offset.y = this.offsetY;
        this.body.offset.x = this.offsetX;
    }
    
}