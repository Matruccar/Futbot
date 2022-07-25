var assert = require('assert');
var Point = require("../src/math/point");
var Angle = require("../src/math/angle");
var { close } = require("./utils");

describe("magnitude", function () {
  it("[3 4].magnitude == 5", function () {
    assert.equal(5, new Point(3, 4).magnitude)
  });
  it("[0 5].magnitude == 5", function () {
    assert.equal(5, new Point(0, 5).magnitude)
  });
  it("[5 0].magnitude == 5", function () {
    assert.equal(5, new Point(5, 0).magnitude)
  });
});

describe("angle", function () {
  let testCases = new Map();  
  testCases.set(new Point(0, 0), 0);
  testCases.set(new Point(0, 5), 0);
  testCases.set(new Point(0, -5), 180);
  testCases.set(new Point(5, 0), -90);
  testCases.set(new Point(-5, 0), 90);
  testCases.set(new Point(5, 5), -45);
  testCases.set(new Point(-5, 5), 45);
  testCases.set(new Point(5, -5), -135);
  testCases.set(new Point(-5, -5), 135);
  testCases.forEach((a, p) => {
    it(`[${p.x} ${p.y}].angle == ${a}`, function () {
      assert(close(Angle.degrees(a), p.angle), 0.000001);
    });
  });
});

describe("dist", function () {
  it("[6 7].dist([9 11]) == 5", function () {
    assert.equal(new Point(6, 7).dist(new Point(9, 11)), 5);
  });
});

describe("Point.fromAngle (default magnitude)", function () {
  let angles = [0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360];
  angles.forEach(deg => {
    let angle = Angle.degrees(deg);
    let point = Point.fromAngle(angle);
    let x = point.x % 1 == 0 ? point.x : point.x.toFixed(2);
    let y = point.y % 1 == 0 ? point.y : point.y.toFixed(2);
    it(`[${x} ${y}].magnitude == 1`, function () {
      assert(close(point.magnitude, 1, 0.000001));
    });
    it(`[${x} ${y}].angle == ${deg}`, function () {
      assert(close(point.angle, angle, 0.000001));
    });
  });
});

describe("Point.fromAngle (custom magnitude)", function () {
  let angles = [0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360];
  angles.forEach(deg => {
    let angle = Angle.degrees(deg);
    let point = Point.fromAngle(angle, 3);
    let x = point.x % 1 == 0 ? point.x : point.x.toFixed(2);
    let y = point.y % 1 == 0 ? point.y : point.y.toFixed(2);
    it(`[${x} ${y}].magnitude == 3`, function () {
      assert(close(point.magnitude, 3, 0.000001));
    });
    it(`[${x} ${y}].angle == ${deg}`, function () {
      assert(close(point.angle, angle, 0.000001));
    });
  });
});