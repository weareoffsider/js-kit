var cx = require("../../src/dom/cx");
var expect = require("chai").expect;
var SwiftCheck = require("swift-check");
var Gen = SwiftCheck.Gen;
var Prop = SwiftCheck.Prop;

var genClassName = Gen.map(
  Gen.arrayOf(Gen.choose("A", "Z"), 3, 10),
  function(v) { return v.join("") }
);

var genClassSet = Gen.sized(function(rng, size) {
  var names = Gen.arrayOf(genClassName, 3, 10).arbitrary(rng, size);
  return names.reduce(function(acc, name) {
    acc[name] = Gen.Values.boolean().arbitrary(rng, size);
    return acc;
  }, {});
});

var genBlockSet = Gen.map( genClassSet, function(v) {
  return Object.keys(v).reduce(function(acc, key) {
    acc["&__" + key] = v[key];
    return acc;
  }, {});
});

describe("cx", function() {
  it("contains only true keys in the final result", function() {
    Prop.forAll(genClassSet, function(set) {
      var className = cx(set);
      return Object.keys(set).every(function(name) {
        return (className.indexOf(name) != -1) == !!set[name];
      });
    }).check();
  });

  it("replaces classnames correctly", function() {
    Prop.forAll(genBlockSet, genClassName, function(set, blockName) {
      var className = cx(set, blockName);
      return Object.keys(set).every(function(name) {
        return (
          className.indexOf(name.split("&").join(blockName)) != -1
        ) == !!set[name];
      });
    }).check();
  });
});
