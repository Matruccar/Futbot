
function close(a, b, tolerance = Number.EPSILON) {
  return Math.abs(a - b) < tolerance;
}

module.exports = {
  close: close
};