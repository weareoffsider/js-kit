var bem = require("../../dom/bem");
var expect = require("chai").expect;
var SwiftCheck = require("swift-check");
var Gen = SwiftCheck.Gen;
var Prop = SwiftCheck.Prop;

var g = require("./generators.js");

describe("bem", function() {
  it("BEM Function returns extended cx", function() {
    Prop.forAll(g.genClassName, g.genClassName, function(n1, n2) {
      var bemF = bem(n1);
      return (n1 + "__" + n2) == bemF("&__" + n2);
    }).check();
  });

  it("replaces classnames correctly if object provided", function() {
    Prop.forAll(g.genBlockSet, g.genClassName, function(set, blockName) {
      var bemF = bem(blockName);
      var className = bemF(set);
      return Object.keys(set).every(function(name) {
        return (
          className.indexOf(name.split("&").join(blockName)) != -1
        ) == !!set[name];
      });
    }).check();
  });
});
