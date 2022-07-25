const Angle = require("./math/angle");
const Point = require("./math/point");

// El rol "BallFollower" sigue ciegamente a la pelota.
// ¡Ojo que podemos meter goles en contra! 
class BallFollower {
    applyOn(robot, snapshot) {
        // Si sabemos dónde está la pelota, nos movemos hacia ella.
        // Caso contrario, nos movemos al centro de la cancha
        if (snapshot.ball) {
            robot.moveToBall();
        } else {
            robot.moveToPoint(Point.ORIGIN);
        }
    }
}

// El rol "Goalkeeper" implementa un arquero básico
class Goalkeeper {
    applyOn(robot, snapshot) {
        // Definimos un punto objetivo en el cual queremos ubicar el robot.
        // Este punto está dado por la coordenada X de la pelota y un valor
        // de Y fijo (este valor está definido de forma que esté cerca del 
        // arco pero fuera del área)
        let ball = snapshot.ball ? snapshot.ball.position : Point.ORIGIN;
        let target = new Point(ball.x, -0.55);

        // Si el robot está lo suficientemente cerca del punto objetivo, 
        // entonces giramos para mirar a los laterales. Sino, nos movemos
        // hacia el punto objetivo
        if (robot.position.dist(target) < 0.01) {
            robot.lookAtAngle(Angle.degrees(90));
        } else {
            robot.moveToPoint(target);
        }
    }
}

module.exports = {
    BallFollower: BallFollower,
    Goalkeeper: Goalkeeper
};