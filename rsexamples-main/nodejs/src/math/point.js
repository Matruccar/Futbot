const Angle = require("./angle");
const { clamp } = require("./utils");

// Representa un vector de 2 dimensiones (x, y)
class Point {
    static ORIGIN = new Point(0, 0);

    // Devuelve el punto con el ángulo y la magnitud especificada
    static fromAngle(angle, magnitude = 1) {
        let x = magnitude * -1 * Math.sin(angle);
        let y = magnitude * Math.cos(angle);
        return new Point(x, y);
    }

    // Devuelve el promedio de los puntos dados como parámetro 
    static average(points) {
        let x = 0;
        let y = 0;
        let c = points.length;
        for (let i = 0; i < c; i++) {
            x += points[i].x;
            y += points[i].y;
        }
        return new Point(x/c, y/c);
    }

    x; y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Calcula la distancia entre 2 puntos
    dist(point) {
        let dx = point.x - this.x;
        let dy = point.y - this.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    // Devuelve la magnitud del vector
    get magnitude() { return this.dist(Point.ORIGIN); }

    // Devuelve el ángulo del vector
    get angle() {
        if (this.x == 0 && this.y == 0) return Angle.radians(0);
        return Angle.radians(Math.atan2(this.x * -1, this.y));
    }

    // Devuelve el punto más cercano cuyas coordenadas estén dentro
    // del rectángulo pasado como parámetro.
    keepInsideRectangle(rect) {
        let x = clamp(this.x, rect.origin.x, rect.corner.x);
        let y = clamp(this.y, rect.origin.y, rect.corner.y);
        return new Point(x, y);
    }
}

module.exports = Point;