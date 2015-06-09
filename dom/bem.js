
// bem
// Provide a function for establishing class names

var cx = require("./cx.js");

module.exports = function(blockName) {
  return function(classObj) {
    if (typeof classObj == "string") {
      return classObj.split("&").join(blockName);
    } else {
      return cx(classObj, blockName);
    }
  }
};
