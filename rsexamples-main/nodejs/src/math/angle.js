const { mod } = require("./utils");

const RADIANS_PER_DEGREE = Math.PI/180;

// Convierte un valor en grados a radianes
function d2r(deg) { return deg*RADIANS_PER_DEGREE; }

// Convierte un valor en radianes a grados
function r2d(rad) { return rad/RADIANS_PER_DEGREE; }

// Normaliza un valor en radianes para mantenerlo entre 0 y 2*PI
function normalize(rad) { return mod(rad, Math.PI*2); }

// Devuelve un ángulo en radianes
function radians(rad) {
    return normalize(rad);
}

// Devuelve un ángulo en grados
function degrees(deg) {
    return normalize(d2r(deg));
}

// Devuelve el ángulo opuesto al especificado
function opposite(rad) {
    return normalize(rad + Math.PI);
}

// Calcula la diferencia entre 2 ángulos, yendo en sentido horario
// desde el ángulo "a" hasta el ángulo "b" 
function diffClockwise(a, b) {
    return normalize(a - b);
}

// Calcula la diferencia entre 2 ángulos, yendo en sentido antihorario
// desde el ángulo "a" hasta el ángulo "b"
function diffCounterclockwise(a, b) {
    return normalize(b - a);
}

// Calcula la diferencia mínima entre 2 ángulos, independiente del sentido
function diff(a, b) {
    return Math.min(
        diffClockwise(a, b), 
        diffCounterclockwise(a, b)
    );
}

module.exports = {
    d2r: d2r,
    r2d: r2d,
    radians: radians,
    degrees: degrees,
    opposite: opposite,
    diff: diff,
    diffClockwise: diffClockwise,
    diffCounterclockwise: diffCounterclockwise,
};