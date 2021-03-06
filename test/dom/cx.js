var cx = require("../../dom/cx");
var expect = require("chai").expect;
var SwiftCheck = require("swift-check");
var Gen = SwiftCheck.Gen;
var Prop = SwiftCheck.Prop;

var g = require("./generators.js");

describe("cx", function() {
  it("contains only true keys in the final result", function() {
    Prop.forAll(g.genClassSet, function(set) {
      var className = cx(set);
      return Object.keys(set).every(function(name) {
        return (className.indexOf(name) != -1) == !!set[name];
      });
    }).check();
  });

  it("replaces classnames correctly", function() {
    Prop.forAll(g.genBlockSet, g.genClassName, function(set, blockName) {
      var className = cx(set, blockName);
      return Object.keys(set).every(function(name) {
        return (
          className.indexOf(name.split("&").join(blockName)) != -1
        ) == !!set[name];
      });
    }).check();
  });
});
