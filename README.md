# Akelarre

## Tabla de contenidos
1. [Enlace a página web con versión de producción del juego](#enlace-a-p%C3%A1gina-web-con-versi%C3%B3n-de-producci%C3%B3n-del-juego)
2. [Para ejecutar el código en tu ordenador](#para-ejecutar-el-c%C3%B3digo-en-tu-ordenador)
3. [Presentación](#presentaci%C3%B3n):
	1. [BASIC INFO](#1-basic-info)
	2. [DESCRIPTION](#2-description)
	3. [SETTING](#3-setting)
	4. [MAIN GAME MECHANICS](#4-main-game-mechanics)
	5. [CAPTURAS DEL JUEGO/BOCETOS](#5-capturas-del-juegobocetos)


## Enlace a página web con versión de producción del juego
https://oriavel.github.io/akelarre/


## Para ejecutar el código en tu ordenador

1. Clonar repositorio en tu ordenador: `git clone https://github.com/oriavel/akelarre.git`
2. Abre la terminal del IDE, con la ruta donde quieras que esté el proyecto
3. Ejecuta: `npm i` para instalar las dependencias
4. Ejecuta: `npm start` para ejecutar el juego. Cada vez que hagas un cambio al código tendrás que reiniciar la ejecución para ver las modificaciones.
5. Lo podrás visualizar en tu **navegador** en la ruta: `localhost:8080`


## Presentación
El proyecto es un trabajo universitario para la asignatura "Desarrollo de Videouegos mediante tecnologías Web".

- **Autores**: Pablo Campo, Carlos Martín, Oriana Aveledo, Daniel Cobos 
- **Estudio de desarrollo**: Ass.embly Studios

### 1. BASIC INFO
- Nombre juego: Akelarre
- Género: Aventura, Arcade
- Plataformas: PC Gaming
- Audiencia: Jugadores casuales

### 2. DESCRIPTION
Las brujas de Zugarramurdi te han capturado para un sacrificio humano! :o Si quieres escapar tendrás que completar una serie de arduas pruebas para conseguir la llave de la entrada, siempre y cuando no mueras en el intento >:)
Con este juego pretendemos hacer un homenaje al folklore vasco y a la leyenda de las brujas de Zugarramurdi. 

Las pruebas que el jugador tendrá que superar consistirán en algunos minijuegos clásicos y retos casuales modificados según la estética del juego.
Las pruebas consistirán en:
- Pinball con temática de brujería, en el que habrá que alcanzar una determinada puntuación para poder superar el nivel
- Intentar huir de la cabra. Será un reto plataforma 2d en el que el jugador no podrá detenerse y debe evitar toda clase de obstáculos para que la cabra no le alcance.
- Esquivar las pociones lanzadas por las brujas. Una bruja desde arriba lanzará pociones hacia abajo, el jugador deberá evitarlas y aguantar hasta que el temporizador llegue a 0. 

Cada prueba te dará un fragmento de llave, al completar los 3 los fragmentos se unirán (magia) y obtendrás la llave que te permitirá abrir la puerta de salida y huir.

Durante la pantalla principal el plano será igual que los The Legend of Zelda antiguos, mientras que en las pruebas el plano será frontal.

### 3. SETTING
La pantalla principal será en el interior de la cueva, por lo que tendrá un ambiente oscuro, lleno de misterio, con los únicos sonidos provenientes del ambiente de la cueva (gotas cayendo, murciélagos, etc).
Esta pantalla tendrá un portal en cada lado, menos en el inferior, que será la entrada y salida de la cueva (

### 4. MAIN GAME MECHANICS
Dentro de la pantalla inicial las mecánicas principales serán:
-Movimiento: WASD para moverte
-Espacio: para interactuar con una persona/objeto

En cada prueba los controles cambian:
- Pinball: El jugador podrá usar las flechas izquierda y derecha para controlar cada uno de los flippers, al principio de la ronda también podrá sacar la bola pulsando el espacio
- Huye de la cabra:
	Los controles son sencillos aunque las mecánicas son más interesantes en cuanto se interactúa con otros objetos. Algunos de estos ralentizará o acelerará al jugador mientras que otros supondrán la muerte instantánea del jugador. 
 Espacio: para saltar
- Esquiva pociones: Como la mayoria de juegos de esquivar, el jugador podrá mover a su personaje arriba (para saltar) y hacia los lados

### 5. CAPTURAS DEL JUEGO/BOCETOS
Protagonista dentro de la cueva
![image](https://i.imgur.com/X3vyOzh_d.webp?maxwidth=760&fidelity=grand)

GoatRun!

![image](https://user-images.githubusercontent.com/79701191/228316353-aaf989c8-25e1-40d8-822b-3fd0c5bffe01.png)

Pinball

![image](https://i.imgur.com/EhbQrdY_d.webp?maxwidth=760&fidelity=grand)

Avoid the Potions 

![image](https://i.imgur.com/DgczHpO_d.webp?maxwidth=760&fidelity=grand)


