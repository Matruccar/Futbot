const Server = require("./rsproxy/server");
const Robot = require("./robot");
const { BallFollower, Goalkeeper } = require("./roles");

// Declaramos una variable para contener a nuestros robots
let robots;

// La función "setup" se ejecuta cuando comienza el partido
function setup() {
    // Creamos 3 robots y asignamos sus respectivos roles
    robots = [
        new Robot(new Goalkeeper()),
        new Robot(new BallFollower()),
        new Robot(new BallFollower()),
    ];
}

// La función "loop" se ejecuta para cada iteración del partido.
// En la variable "snapshot" tenemos la información de los sensores 
// del robot, a partir de la cual tenemos que tomar la decisión de
// qué velocidad asignar a cada motor.
function loop(snapshot) {
    // Buscamos el robot correspondiente a la iteración actual y le
    // mandamos el mensaje "loop", pasando como parámetro la snapshot
    let robot = robots[snapshot.robot.index];
    return robot.loop(snapshot);
}

// Iniciamos el servidor usando como puerto el valor pasado como
// parámetro al programa (si no se especifica un puerto, usamos "12345").
const port = process.argv[2] || "12345";
var server = new Server(setup, loop);
server.start(port);
