export class DialogBox {
  constructor(scene) {
      this.scene = scene;
  }

  /**
   * 
   * @param {Object.<>} opts - Ajustes opcionales de las cajas de texto, por si se quiere cambiar el formato
   * @param {number} opts.borderThickness Grueso de los bordes de la caja de texto
   * @param {hexadecimal_number} opts.borderColor Color de los bordes de la caja de texto
   * @param {number} opts.borderAlpha Canal alpha de los bordes de la caja de texto (transparencia)
   * @param {number} opts.windowAlpha Canal alpha de la caja de texto (transparencia)
   * @param {hexadecimal_number} opts.windowColor Color de la caja de texto
   * @param {number} opts.windowHeight Altura de la caja de texto
   * @param {number} opts.padding Padding del texto
   * @param {number} opts.dialogSpeed Velocidad de aparición de los textos
   * @param {number} opts.x Posición en X de la caja de texto
   * @param {number} opts.y Posición en Y de la caja de texto
   * @param {boolean} opts.visible Color del texto en la caja de texto
   */
  init(opts) {
      if (!opts) opts = {}; 
      this.borderThickness = opts.borderThickness || 3;
      this.borderColor = opts.borderColor || 0x000000;
      this.borderAlpha = opts.borderAlpha || 1; 
      this.windowAlpha = opts.windowAlpha || 0.8; 
      this.windowColor = opts.windowColor || 0x303030;
      this.windowHeight = opts.windowHeight || 150; 
      this.padding = opts.padding || 32; 
      this.dialogSpeed = opts.dialogSpeed || 10;
      this.x = opts.x || this.padding;
      this.y = opts.y;
      this.eventCounter = 0; //Contador de eventos
      this.visible = true; //Variable que dice si el cuadro de texto es visible o no
      this.text; //Referencia a Phaser.Text
      this.textColor = opts.textColor;
      this.dialog; //Referencia a Phaser.Dialog
      this.graphics; //Referencia a Phaser.Graphics
      this.beingAnimated; //Nos dice si el texto está siendo o no activado
      this.createWindow(); //Crear la ventana
  }

  /**
   * Devuelve el ancho de la ventana del canvas
   * @returns El ancho de la ventana del canvas
   */
  getGameWidth() {
      return this.scene.sys.game.config.width;
  }

  /**
   * Devuelve el largo de la ventana del canvas
   * @returns El largo de la ventana del canvas
   */
  getGameHeight() {
      return this.scene.sys.game.config.height;
  }

  /**
   * Calcula las dimensiones de la caja de texto
   * @param {number} width El ancho de la ventana del canvas
   * @param {number} height El alto de la ventana del canvas
   * @returns {Object.<number, number, number, number>} Objeto con el rectángulo con las dimensiones de la caja de texto
   */
  calculateWindowDimensions(width, height) {
      var x = this.x;
      var y = this.y || height - this.windowHeight - this.padding;
      var rectWidth = width - (this.padding * 2);
      var rectHeight = this.windowHeight;
      return {
          x,
          y,
          rectWidth,
          rectHeight
      };
  }

  /**
   * Crea la ventana interior, es decir, el recuadro en el que se mostrará el texto
   * @param {number} x X en la que se va a crear el recuadro
   * @param {number} y Y en la que se va a crear el recuadro
   * @param {number} rectWidth Anchura del recuadro
   * @param {number} rectHeight Altura del recuadro
   */
  createInnerWindow(x, y, rectWidth, rectHeight) {
      this.graphics.fillStyle(this.windowColor, this.windowAlpha);
      this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  /**
   * Crea la ventana exterior, es decir, los bordes de la ventana
   * @param {number} x X en la que se van a crear los bordes
   * @param {number} y Y en la que se van a crear los bordes
   * @param {number} rectWidth Altura del recuadro
   * @param {number} rectHeight Anchura del recuadro
   */
  createOuterWindow(x, y, rectWidth, rectHeight) {
      this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
      this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  /**
   * Crea el cuadro de texto
   */
  createWindow() {
      var gameHeight = this.getGameHeight();
      var gameWidth = this.getGameWidth();
      var dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
      this.graphics = this.scene.add.graphics();
      this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
      this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  }

  /**
   * Muestra u oculta el cuadro de texto
   */
  toggleWindow() {
      this.visible = !this.visible;
      if (this.text) this.text.visible = this.visible;
      if (this.graphics) this.graphics.visible = this.visible;
      if (this.closeBtn) this.closeBtn.visible = this.visible;
      if (this.timedEvent) this.timedEvent.remove();
      if (this.text) this.text.destroy();
  }

  /**
   * Setea el texto a mostrar en pantalla
   * @param {string} text Texto a mostrar
   * @param {boolean} animate Selecciona si queremos o no animar el texto
   */
  setText(text, animate) {
      this.eventCounter = 0;
      this.dialog = text.split('');
      if (this.timedEvent) this.timedEvent.remove();

      var tempText = animate ? '' : text;

      this.textPosition(tempText);
      this.text.setColor(this.textColor);
      this.text.setFontFamily('Silkscreen');
      if (animate) {
          this.timedEvent = this.scene.time.addEvent({
          delay: 150 - (this.dialogSpeed * 30),
          callback: this.animateText,
          callbackScope: this,
          loop: true
          });
      }
  }

  /**
   * Anima el texto
   */
  animateText() {
      this.beingAnimated = true;
      this.eventCounter++;
      this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
      if (this.eventCounter === this.dialog.length) {
        this.timedEvent.remove();
        this.scene.time.addEvent({
          delay: 180,
          callback: this.endTextAnimation,
          callbackScope: this,
          loop: false
      });
      }
  }

  endTextAnimation() {
      this.beingAnimated = false;
  }

  /**
   * Calcular la posición en la que debe ir el texto
   * @param {string} text Texto a mostrar
   */
  textPosition(text) {
      if (this.text) this.text.destroy();
      var x = this.x + 10|| this.padding + 10;
      var y = this.y + 10|| this.getGameHeight() - this.windowHeight - this.padding + 10;
      this.text = this.scene.make.text({
          x,
          y,
          text,
          color : this.textColor,
          style: {
            wordWrap: { width: this.getGameWidth() - (this.padding * 2) - 25 }
          }
      });
  }
}

export default class DialogScene extends Phaser.Scene {
  constructor() {
      super({key: 'dialog', active: true, visible: true});
      this.dialogBox = new DialogBox(this);
      this.nameBox = new DialogBox(this);
      this.hasCreatedWindow = false;
      this.isToggled = true;
      this.event = false;
  }

  update() {
      if(this.dialogBox.beingAnimated && !this.event) {
          this.events.emit("isBeingAnimated");
          this.event = true;
      }
      else if (!this.dialogBox.beingAnimated && this.event) {
          this.events.emit("isNotBeingAnimated");
          this.event = false;
      }
  }

  createWindow() {
      this.dialogBox.init({
          textColor : "#FFFFFF",
          windowColor: 0x292929
      });
      this.nameBox.init({
          borderThickness : 3,
          windowColor: 0xE3BE39,
          windowHeight: 35,
          padding: 290,
          x:20,
          y:380,
          textColor: "#FFFFFF"
      });
      
      this.hasCreatedWindow = true;
  }

  setText(character, text, animate) {
      this.dialogBox.setText(text, animate);
      this.nameBox.setText(character, false);
      
  }

  toggleWindow() {
      this.dialogBox.toggleWindow();
      this.nameBox.toggleWindow();
      this.isToggled = !this.isToggled;
  }
}