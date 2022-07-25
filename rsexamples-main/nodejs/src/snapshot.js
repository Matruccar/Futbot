const Angle = require("./math/angle");
const Point = require("./math/point");

// Esta clase representa la información que tenemos del ambiente de simulación
// en el ciclo de ejecución actual.
// Incluye los datos provenientes de los sensores del robot y aplica las transformaciones 
// necesarias para obtener posición/rotación del robot y posición de la pelota. 
class Snapshot {
    data; // Los datos provenientes del simulador
    color; // Color del equipo (Y o B)
    robot; // Datos del robot (posición y rotación)
    ball; // Datos de la pelota (posición)

    constructor(data) {
        this.data = data;
        this.color = data.robot.color;
        this.processRobotSensors(data.robot);
        this.processBallSignal(data.ball);
        this.mergeTeamData(data.team);
    }

    // Devuelve true si el robot detectó la señal de la pelota. Esto nos permite
    // distinguir si la información que tenemos de la pelota proviene de un compañero
    // o si es propia.
    isBallDetected() {
        return this.data.ball != null;
    }

    // Procesa los sensores del robot (gps y compass) para obtener la posición y
    // rotación del robot
    processRobotSensors(robot_data) {
        let [x, y] = robot_data.gps;
        let [cx, cy] = robot_data.compass;
        this.robot = {
            name: robot_data.name,
            index: robot_data.index,
            position: new Point(x, y),
            rotation: Angle.radians(Math.atan2(cx, cy) + Math.PI/2)
        };
    }

    // Procesa la señal de la pelota (dirección e intensidad) para obtener la
    // posición de la misma. El cálculo requiere primero obtener la info del
    // robot porque la dirección e intensidad de la señal son relativas a la
    // posición y orientación del robot.
    processBallSignal(ball_data) {
        if (!ball_data) return;
        let dist = Math.sqrt(1/ball_data.strength);
        let [x, y] = ball_data.direction;
        let da = Angle.radians(Math.atan2(y, x));
        let a = Angle.radians(this.robot.rotation + da);
        let dx = Math.sin(a) * dist;
        let dy = Math.cos(a) * -1 * dist;
        let bx = this.robot.position.x + dx;
        let by = this.robot.position.y + dy;
        this.ball = {
            position: new Point(bx, by)
        }
    }

    // Incorporamos la información enviada por el resto del equipo (si la hubiera)
    mergeTeamData(team_data) {
        // Si ya tenemos información de la pelota significa que la detectamos de
        // primera mano y podemos ignorar los mensajes del equipo
        if (!this.ball) {
            if (team_data && team_data.length > 0) {
                let {x, y} = team_data[0];
                this.ball = {
                    position: new Point(x, y) 
                };
            }
        }
    }
}

module.exports = Snapshot;