var scrollTop = require("./scrollTop.js");
var scrollLeft = require("./scrollLeft.js");

module.exports = function(element) {
  var bounds = elements.getBoundingClientRect();

  return {
    x: bounds.left + scrollLeft(),
    y: bounds.top + scrollTop()
  };
}
