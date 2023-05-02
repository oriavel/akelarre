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
    getDialogo(index){
        var i = 0;
        var found = false;
        var idArray = [];
        var dialogos = [];
        var aux = "";
        //Dialogos:
        var idBruja3 = 0; 
        idArray.push(idBruja3);
        const dialogosBruja = [
            "¡Ah! Hola...",
            "Mis hermanas me han mandado quedarme aquí vigilándote, no  \nme esperaba que me encontraras...",
            "... Lo siento mucho por ti, es una pena que tu vida vaya a \nacabar tan pronto por nuestra culpa.",
            "A mis hermanas les encanta realizar sacrificios humanos pero \nla verdad es que a mi no me gusta nada...",
            "Ojalá pudiera dejarte ir, pero mis hermanas de dan demasiado \nmiedo...",
            "¡Espera! He tenido una idea, yo no puedo dejarte salir, \n¡Pero sí que puedo abrir los portales que llevan a las llaves!",
            "Por desgracia tu huida seguirá siendo algo muy dificil de \nconseguir...",
            "Tras los portales se encuentran tres pruebas muy difíciles \nque tendrás que superar si quieres conseguir las llaves.",
            "Estoy segura de que podrás lograrlo, y si no pues bueno... \nIbas a morir de todas formas...",
            "Voy a abrir los portales, ¡Consigue las llaves deprisa! Si \nmis hermanas terminan los preparativos antes de que huyas...",
            "No quiero ni imaginarme como harían para que tu sacrificio \nfuera incluso más doloroso, pero seguro que ellas sabrían como.",
            "No te preocupes por lo que me pueda pasar a mi cuando se \nenteren de que abrí los portales.",
            "¡Ya iba siendo hora de que les plantase cara a mis hermanas!",
            "Los portales ya están abiertos, ¡Mucha suerte! Y que Belzebut \nesté contigo...",
            "¡Ah, espera! Casi se me olvida, porfavor no entres en el \nPortal rojo de el centro hasta que no tengas las otras piezas",
            "Por ese portal solo puede entrar Sorgina, \nMi hermana mayor y la más malvada.",
            "Ahí guarda la ultima pieza de llave, no confía en nosotras \npara salvaguardarla...",
            "Cuando entres estoy seguro de que se enterará, ¡Has de \ncogerla rápido y correr como si tu vida dependiera de ello!",
            "Al fin y al cabo, tu vida depende de ello..."
        ];
        dialogos.push(dialogosBruja);

        var idMotos = 1; 
        idArray.push(idMotos);
        const dialogosMotos = [
            "Ey nena, ¿Qué hace una chica como tú en un sitio como este?",
            "Ja ja ja ja, *coff* *coff*...",
            "¿Yo? Pues nada, estaba dándome un paseo de turisteo cuando \nde repente vi a las mozas estas recogiendo plantas por la zona.",
            "Con lo buenas que están me paré para hablarlas a ver si caía \nalguna 'minita', ya sabes ja ja ja.",
            "Cuando me dijeron que querían llevarme a la cueva yo tan \ninocente pensé que había triunfado, ¡Y mírame ahora!",
            "Me dijeron que iban a ofrecerme a su Dios, pero creo que al \nfinal pude convencerlas de que estaba demasiado bueno \npara eso.",
            "Desde ese momento me han dejado aquí en una esquina, no se \na que esperan para dejarme ir ja ja ja ja...",
            "¿No tendrás unas galletas dinosaurus por ahí o algo no? \nMe muero de hambre.",
            "Aunque ahora que te tengo delante me apetecen otras cosas \ntambién ja ja ja *coff* *coff*",
            "Deduzco que a ti también te han capturado para un \nsacrificio ¿No?",
            "Qué te parece nena, ¿Hacemos que nuestros últimos momentos \nvivos sean divertidos? ;)"
        ];
        dialogos.push(dialogosMotos);

        var idGato = 2; 
        idArray.push(idGato);
        const dialogosGato =[
            "¡Hola, Bienvenida a la cueva!",
            "Soy el fiel amigo y servidor de las brujas, \n¡Y me lo paso pipa viendo los sacrificios humanos que hacen!",
            "Tú eres la siguiente en la lista. Veo que eres \nmuy joven, pobrecita que poco has vivido...",
            "JA JA JA JA JA, ¡Qué pringada!",
            "Te aviso de antemano de que no hay escapatoria, la salida\nestá bloqueada por una puerta mágica que necesita 3 llaves.",
            "¡Y no pienso decirte donde están! JA JA JA JA",
            "Disfruta de tus últimos momentos paseando por \nla cueva si quieres.",
            "O quédate quieta hasta que vuelvan mis amas, \n¡Me da completamente igual!"
        ];
        dialogos.push(dialogosGato);

        var idEst = 3; 
        idArray.push(idEst);
        const dialogosEstanteria =[
            "Hay un montón de libros de hechicería y herbología...",
            "'El necronomicón', 'Sacrificios101', \n'Plantas venenosas y cómo usarlas'...",
            "Que mal rollo..."
        ];
        dialogos.push(dialogosEstanteria);

        var idCald = 4; 
        idArray.push(idCald);
        const dialogosCaldero =[
            "Supongo que con esto hacen sus pociones, que esteriotípico",
            "Está burbujeando, me pregunto que efecto \ntendría si lo bebo",
            "Huele fatal..."
        ];
        dialogos.push(dialogosCaldero);

        var idCartel1 = 5; 
        idArray.push(idCartel1);
        const dialogoCartel1 =[
            "Pone '¡Os tengo dicho que a este portal sólo entro yo!,\nHe puesto una alarma de lo harta que me teneis.'",
            "'Considerar este cartel como un último aviso, a la \npróxima que vea dentro le caerá una lluvia de pociones rojas.'",
            "'-Sorgina.'",
            "Estoy acojonadísima."
        ];
        dialogos.push(dialogoCartel1);

        var idCartel2 = 6; 
        idArray.push(idCartel2);
        const dialogoCartel2 =[
            "Pone 'Ranking:' '1º Sorgina: 999.999.999 pts' \n'2º Graciana: 450.900.000 pts'",
            "'3º María: 5 pts'",
            "Supongo que a parte de sacrificando humanos se entretienen \njugando a otra cosa, me siento mal por María..."
        ];
        dialogos.push(dialogoCartel2);

        var idCartel3 = 7; 
        idArray.push(idCartel3);
        const dialogoCartel3 =[
            "Pone 'Alimentar a la cabra:' \n'L,M: Graciana, X,J,V,S: María, D: Sorgina.'",
            "Pobre María."
        ];
        dialogos.push(dialogoCartel3);

        var idPortales = 8; 
        idArray.push(idPortales);
        const dialogoPortales =[
            "¿Quiero entrar en el portal ya?\n(Presiona ENTER para entrar y ESC si aún no estás preparado)."
        ];
        dialogos.push(dialogoPortales);

        var idIntro = 9;
        idArray.push(idIntro);
        const dialogoIntro = [ //Sorgina: 0, 3, 5, 8. Graciana: 1,6. Maria: 2, 4, 7, 9. Amaia: 10
            "MUA JA JA JA JA, ¡Al fin!\n¡Hermanas, por fin tenemos un sacrificio para nuestro venerado \nBelzebut!", 
            "¡Y pelirroja, estoy segura de que le encantará!",
            "...",
            "¿Pasa algo, María?",
            "¡N- No Sorgina, para nada!",
            "Eso pensaba, ¡Estupendo! Ahora sólo queda terminar los \npreparativos para el ritual, ¡Graciana, vamos!",
            "¡ji ji ji, que ganas!",
            "...",
            "¡María!, ya sabes qué hacer, ¿Verdad?",
            "S-Si hermana, ¡Voy!",
            "",
            "...",
            "En menuda me he metido...",
        ];
        dialogos.push(dialogoIntro);

        var idFinal = 10;
        idArray.push(idFinal);
        const dialogoFinal = [ //Sorgina: 0, 2, 4, 6, 8, 9, 12, 13, 15, 16. Graciana: 1, 5, 7, 14, 17. Maria: 3, 11, 18. Amaia: 10
        "Ugh...Estoy agotada...",
<<<<<<< Updated upstream
        "¡Hermana! ¿Que ha pasado? No me digas que esta humana...", 
        "¡Silencio Graciana!...esta humana es mucho mas habil \nde lo que nunca me habría imaginado...",
        "No se como has podido abrir los portales, pero me has impresionado.",
=======
        "¡Hermana! ¿Qué ha pasado? No me digas que esta humana...", 
        "¡Silencio Graciana!... esta humana es mucho mas hábil \nde lo que nunca me habría imaginado...",
        "No se cómo has podido abrir los portales, \npero me has impresionado.",
>>>>>>> Stashed changes
        "...",
        "Hermana...¿Qué quieres que hagamos ahora?",
        "Cuando nuestro señor recibe una ofrenda no sólo \nabsorbe el cuerpo de el sacrificio, también su mente.",
        "Entonces, si seguimos con el plan y sacrificamos \na esta chica...",
        "Vería como perdí contra esta humana. \n¡No puedo permitirlo!",
        "Tú, chica, puedes irte.",
        "¿Cómo?",
        "!!",
        "No te pienses que te dejo ir sin más.\nEn cuanto salgas de esta cueva no recordarás nada \nde lo acontecido.",
        "Te olvidarás de nosotras y de la cueva,\ncomo si nunca hubiera pasado nada.",
        "Pero...",
        "¡Silencio! Considera esto como premio por \nhaber conseguido las llaves",
        "Verte sólo me recuerda la humillación de la derrota,\n¡Vete ya antes de que cambie de opinión!",
        "...",
        "¡A-Adios!..."
        ];
        dialogos.push(dialogoFinal);
        

        while(!found && i < idArray.length){
            if(index == idArray[i])
                found = true;
            else
            i++;
        }
        if(found)
            aux = dialogos[i];

        return aux;

    }



}