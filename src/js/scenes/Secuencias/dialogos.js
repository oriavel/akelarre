export default class Dialogos{
    constructor(scene) {
        this.scene = scene;
        // Agregar la clase al juego
        scene.add.existing(this);
      
        // Agregar la física al objeto
        scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, this.scene.layer, null,null, this);

    }

    createBox() { //Coger ajustes segun x e y
        //Pantallita del texto
        this.graphics = this.scene.add.graphics({x: 1200, y: 800});
        this.graphics.fillStyle(0x000000, 0.8);
        this.graphics.fillRect(0, 0, 700, 100);
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.strokeRect(0, 0, 700, 100);

        //El texto
        this.text = this.scene.add.text(400, 400, "Este es el texto de la ventana", { font: "24px Arial", fill: "#ffffff" });

        //Gráfico adicional
        this.graphicsNombre = this.scene.add.graphics({x: this.graphics.x, y: this.graphics.y - 30});
        this.graphicsNombre.fillStyle(0x000000, 0.8);
        this.graphicsNombre.fillRect(0, 0, 150, 30);
        this.graphicsNombre.lineStyle(4, 0x000000, 1);
        this.graphicsNombre.strokeRect(0, 0, 150, 30);

        //Texto adicional
        this.textNombre = this.scene.add.text(400, 400, 'AAAAA', {fontFamily: 'Arial', fontSize: '16px', color: '#ffffff'});
        this.textNombre.setOrigin(0.5);

        //Configuracion basica de la pantalla y texto
        this.graphics.setVisible(false);
        this.graphicsNombre.setVisible(false);
        this.text.setVisible(false);
        this.textNombre.setVisible(false);
    }

    visible(op){ //Para poner todo visible o no
        if(op){
            this.graphics.setVisible(true);
            this.graphicsNombre.setVisible(true);
            this.text.setVisible(true);
            this.textNombre.setVisible(true);
        }
        else{
            this.graphics.setVisible(false);
            this.graphicsNombre.setVisible(false);
            this.text.setVisible(false);
            this.textNombre.setVisible(false);
        }
    }

    setTexto(frase){
        this.text.setText(frase);
    }
    setNombre(nom){
        this.textNombre.setText(nom);
    }
    
    setPosicion(x,y){
        this.graphics.setPosition(x - 355,y + 160);
        this.graphicsNombre.setPosition(this.graphics.x, this.graphics.y - 30);
        this.text.setPosition(x - 350,y + 170);
        this.textNombre.setPosition(this.graphicsNombre.x + 50, this.graphicsNombre.y + 15);
    }
    getNombre(){
        return this.textNombre.text;
    }

}