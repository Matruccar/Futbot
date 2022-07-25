const Angle = require("./math/angle");
const Point = require("./math/point");
const Snapshot = require("./snapshot");
const { clamp } = require("./math/utils");

const MAX_SPEED = 10;

// Esta clase representa un robot. Incluye funciones primitivas de navegación
// que permiten mover al robot en la cancha. Estas funciones de navegación no 
// tienen un efecto inmediato en el simulador sino que recién se aplican en el 
// siguiente ciclo de simulación.
class Robot {
    role; // El rol define el comportamiento del robot
    snapshot; // La snapshot contiene la información actualizada del mundo
    leftVelocity = 0; // Velocidad del motor izquierdo
    rightVelocity = 0; // Velocidad del motor derecho
    teamMessages = []; // Mensajes a enviar al resto del equipo

    constructor(role) {
        this.role = role;
    }

    // La posición y rotación del robot las obtenemos de la snapshot
    get position() { return this.snapshot.robot.position; }
    get rotation() { return this.snapshot.robot.rotation; }

    // La función "loop" se ejecuta en cada iteración. Recibe la información
    // del mundo y devuelve el mensaje a enviar al simulador, el cual contiene
    // las velocidades a aplicar a cada motor y los mensajes para el resto
    // del equipo. 
    // El comportamiento del robot se define en el método "run" (ver más abajo)
    loop(data) {
        this.snapshot = new Snapshot(data);
        this.run();
        let teamMessages = this.teamMessages.slice();
        this.teamMessages.length = 0;
        return {
            team: teamMessages,
            L: this.leftVelocity,
            R: this.rightVelocity,
        };
    }

    // Encola un mensaje para el resto del equipo
    sendDataToTeam(data) {
        this.teamMessages.push(data);
    }

    // Modifica la velocidad de los motores de forma que el robot gire hacia 
    // el ángulo especificado. Tiene en cuenta la simetría del robot.
    lookAtAngle(a) {
        let vl, vr;
        let ra = this.rotation;
        let delta = Math.min(Angle.diff(a, ra), Angle.diff(a, Angle.opposite(ra)));
        let threshold = Angle.degrees(1);

        if (delta < threshold) {
            vl = 0;
            vr = 0;
        } else {
            let vel = clamp(delta / Angle.degrees(30), 0, 1);
            let p = Point.fromAngle(Angle.radians(a - ra));
            if (p.x < 0) {
                vl = vel * -1;
                vr = vel;
            } else {
                vl = vel;
                vr = vel * -1;
            }
            if (p.y > 0) {
                vl *= -1;
                vr *= -1;
            }
        }
        
        this.leftVelocity = vl * MAX_SPEED;
        this.rightVelocity = vr * MAX_SPEED;
    }

    // Modifica la velocidad de los motores de forma que el robot gire para
    // "mirar" al punto especificado. Tiene en cuenta la simetría del robot
    lookAtPoint(point) {        
        let {x: rx, y: ry} = this.position;
        let {x: px, y: py} = point;
        this.lookAtAngle(new Point(px - rx, py - ry).angle);
    }

    // Modifica la velocidad de los motores de manera que el robot se acerque
    // al punto especificado. Tiene en cuenta la simetría del robot.
    moveToPoint(point) {
        let vl, vr;
        let {x: rx, y: ry} = this.position;
        let {x: px, y: py} = point;
        let a = new Point(px - rx, py - ry).angle;
        let ra = this.rotation;
        let delta = Math.min(Angle.diff(a, ra), Angle.diff(a, Angle.opposite(ra)));
        let decrease = (Angle.r2d(delta) / 90) * 2;
        let p = Point.fromAngle(Angle.radians(a - ra));
        if (p.x < 0) {
            vl = 1 - decrease;
            vr = 1;
        } else {
            vl = 1;
            vr = 1 - decrease;
        }
        if (p.y > 0) {
            vl *= -1;
            vr *= -1;
        }
        
        this.leftVelocity = vl * MAX_SPEED;
        this.rightVelocity = vr * MAX_SPEED;
    }

    // Modifica la velocidad de los motores de forma que el robot se acerque a 
    // la pelota. Tiene en cuenta la simetría del robot.
    moveToBall() {
        this.moveToPoint(this.snapshot.ball.position);
    }

    // El método "run" implementa la lógica de comportamiento del robot
    run() {
        // Si el robot detectó la señal de la pelota en este ciclo de simulación 
        // le comunica esta información a sus compañeros de forma que todos los
        // robots tengan información aproximada de la ubicación de la pelota
        if (this.snapshot.isBallDetected()) {
            this.sendDataToTeam(this.snapshot.ball.position);
        }
        
        // El comportamiento del robot depende del rol que tenga asignado
        this.role.applyOn(this, this.snapshot);
    }
}

module.exports = Robot;