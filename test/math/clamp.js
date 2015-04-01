var clamp = require("../../math/clamp");
var expect = require("chai").expect;
var SwiftCheck = require("swift-check");
var Gen = SwiftCheck.Gen;
var Prop = SwiftCheck.Prop;

// this is admittedly overkill testing, but I'm playing with testing

var resultWithinRange = Prop.forAll(Gen.chooseInt(0, 100), function(num) {
  var clamped = clamp(0, num, 100);
  return num == clamped;
});

var resultBelowMaximum = Prop.forAll(Gen.chooseInt(-1000, 1000), function(num) {
  var clamped = clamp(-100, num, 100);
  return clamped <= 100;
});

var resultAboveMinimum = Prop.forAll(Gen.chooseInt(-1000, 1000), function(num) {
  var clamped = clamp(-100, num, 100);
  return clamped >= -100;
});

describe("clamp", function() {
  it("should always return the same value if in between the bounds", function() {
    resultWithinRange.check();
  });

  it("should never return a value below the minimum", function() {
    resultAboveMinimum.check();
  });

  it("should never return a value above the maximum", function() {
    resultBelowMaximum.check();
  });

  it("should allow for ommission of minimum", function() {
    Prop.forAll(Gen.chooseInt(-1000, 0), function(num) {
      var clamped = clamp(null, num, 100);
      return clamped <= 0;
    }).check();
  });

  it("should allow for ommission of maximum", function() {
    Prop.forAll(Gen.chooseInt(0, 1000), function(num) {
      var clamped = clamp(0, num, null);
      return clamped >= 0;
    }).check();
  });
});
