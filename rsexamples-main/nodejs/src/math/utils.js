
// Operación módulo. Funciona correctamente con valores negativos de "n".
// No confundir con el operador % (remainder) de Javascript. Ver:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
function mod(n, d) {
    return ((n % d) + d) % d;
}

// Restringe el valor numérico "n" entre "min" y "max"
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

module.exports = {
    mod: mod,
    clamp: clamp
};