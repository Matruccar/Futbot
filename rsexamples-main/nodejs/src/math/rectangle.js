const Point = require("./point");

// Representa un rectángulo alineado al eje. Está compuesto por dos 
// puntos: "origin" y "corner". 
class Rectangle {
    origin;
    corner;

    constructor(origin, corner) {
        this.origin = origin;
        this.corner = corner;
    }

    // Devuelve un nuevo rectángulo "agrandado" por las dimensiones 
    // especificadas para el eje X e Y
    growBy(x, y) {
        let ox = this.origin.x - x;
        let oy = this.origin.y - y;
        let cx = this.corner.x + x;
        let cy = this.corner.y + y;
        return new Rectangle(new Point(ox, oy), new Point(cx, cy));
    }

    // Devuelve un nuevo rectángulo "achicado" por las dimensiones 
    // especificadas para el eje X e Y
    shrinkBy(x, y) {
        let ox = this.origin.x + x;
        let oy = this.origin.y + y;
        let cx = this.corner.x - x;
        let cy = this.corner.y - y;
        return new Rectangle(new Point(ox, oy), new Point(cx, cy));
    }

    // Devuelve true si el punto dado como parámetro está contenido dentro
    // de los límites del rectángulo
    containsPoint(point) {
        let x = point.x;
        let y = point.y;
        let x0 = this.origin.x;
        let y0 = this.origin.y;
        let x1 = this.corner.x;
        let y1 = this.corner.y;
        return (x0 < x) && (y0 < y)
            && (x1 > x) && (y1 > y);
    }
}

module.exports = Rectangle;