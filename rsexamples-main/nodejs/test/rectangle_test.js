var assert = require('assert');
var Point = require("../src/math/point");
var Rectangle = require("../src/math/rectangle");

function equal(rect1, rect2) {
  return rect1.origin.x == rect2.origin.x 
    && rect1.origin.y == rect2.origin.y 
    && rect1.corner.x == rect2.corner.x
    && rect1.corner.y == rect2.corner.y;
}

describe("grow-1", function () {
  let rect = new Rectangle(new Point(0, 0), new Point(5, 5));
  let expected = new Rectangle(new Point(-1, -1), new Point(6, 6));
  let actual = rect.growBy(1, 1);
  assert(equal(actual, expected));
});

describe("grow-2", function () {
  let rect = new Rectangle(new Point(-7, -6), new Point(5, 5));
  let expected = new Rectangle(new Point(-9, -9), new Point(7, 8));
  let actual = rect.growBy(2, 3);
  assert(equal(actual, expected));
});


describe("shrink-1", function () {
  let rect = new Rectangle(new Point(0, 0), new Point(5, 5));
  let expected = new Rectangle(new Point(1, 1), new Point(4, 4));
  let actual = rect.shrinkBy(1, 1);
  assert(equal(actual, expected));
});

describe("shrink-2", function () {
  let rect = new Rectangle(new Point(-7, -6), new Point(5, 5));
  let expected = new Rectangle(new Point(-5, -3), new Point(3, 2));
  let actual = rect.shrinkBy(2, 3);
  assert(equal(actual, expected));
});

describe("containsPoint", function () {
  let rect = new Rectangle(new Point(0, 0), new Point(1, 1));
  let points = [
    [new Point(0.5, 0.5), true],
    [new Point(0.25, 0.75), true],
    [new Point(0.75, 0.25), true],
    [new Point(-1, 0.5), false],
    [new Point(-1, -0.5), false],
    [new Point(1, 0.5), false],
    [new Point(1, -0.5), false],
    [new Point(-1, 2), false],
  ];
  for (let i = 0; i < points.length; i++) {
    let [p, b] = points[i];
    it(`rect.containsPoint([${p.x}, ${p.y}]) == ${b}`, function () {
      assert.equal(rect.containsPoint(p), b);
    });
  }
});