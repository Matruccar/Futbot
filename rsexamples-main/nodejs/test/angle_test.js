var assert = require('assert');
var angle = require("../src/math/angle");
var { close } = require("./utils");

describe("degrees-to-radians", function () {
  it("d2r", function () {
    assert.equal(Math.PI, angle.d2r(180));
  });
});

describe("equality", function () {
  it("0 == 360", function() {
    assert.equal(angle.degrees(0), angle.degrees(360));
  });
  it("180 == -180", function() {
    assert.equal(angle.degrees(180), angle.degrees(-180));
  });
  it("-90 == 270", function() {
    assert.equal(angle.degrees(-90), angle.degrees(270));
  });
});

describe("opposite", function () {
  it("opposite(90) == -90", function() {
    assert.equal(angle.opposite(angle.degrees(90)), angle.degrees(-90));
  });
  it("opposite(90) == 270", function() {    
    assert.equal(angle.opposite(angle.degrees(90)), angle.degrees(270));
  });
});

describe("diff", function () {
  it("0 == diff(0, 360)", function () {
    assert(close(angle.degrees(0), 
                 angle.diff(angle.degrees(0),
                            angle.degrees(360)),
                 0.00001));
  });
  it("90 == diff(45, -45)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diff(angle.degrees(45),
                            angle.degrees(-45)),
                 0.00001));
  });
  it("90 == diff(-45, 45)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diff(angle.degrees(-45),
                            angle.degrees(45)),
                 0.00001));
  });
  it("90 == diff(11.78rad, -5.49rad)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diff(11.780972450961723,
                            -5.497787143782138),
                 0.00001));
  });
});

describe("diffClockwise", function () {
  it("90 == diff(45, -45)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diffClockwise(angle.degrees(45),
                                     angle.degrees(-45)),
                 0.00001));
  });
  it("90 == diff(45, 315)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diffClockwise(angle.degrees(45),
                                     angle.degrees(315)),
                 0.00001));
  });
  it("270 == diff(11.78rad, -5.49rad)", function () {    
    assert(close(angle.degrees(270), 
                 angle.diffClockwise(11.780972450961723,
                                     -5.497787143782138),
                 0.00001));
  });
});

describe("diffCounterclockwise", function () {
  it("270 == diff(45, -45)", function () {    
    assert(close(angle.degrees(270), 
                 angle.diffCounterclockwise(angle.degrees(45),
                                            angle.degrees(-45)),
                 0.00001));
  });
  it("270 == diff(45, 315)", function () {    
    assert(close(angle.degrees(270), 
                 angle.diffCounterclockwise(angle.degrees(45),
                                            angle.degrees(315)),
                 0.00001));
  });
  it("90 == diff(11.78rad, -5.49rad)", function () {    
    assert(close(angle.degrees(90), 
                 angle.diffCounterclockwise(11.780972450961723,
                                            -5.497787143782138),
                 0.00001));
  });
});