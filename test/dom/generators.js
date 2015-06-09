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


module.exports = {
  genClassName: genClassName,
  genClassSet: genClassSet,
  genBlockSet: genBlockSet
}
