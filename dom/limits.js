var scrollTop = require("./scrollTop.js");
var scrollLeft = require("./scrollLeft.js");
var size = require("./size.js");

module.exports = function(ofElem) {
  var scroll = ofElem
    ? {x: ofElem.scrollLeft, y: ofElem.scrollTop}
    : {x: scrollLeft(), y: scrollTop()}

  var screen = ofElem
    ? size(ofElem)
    : typeof window.orientation != "undefined"
      ? {x: window.innerWidth, y: window.innerHeight}
      : {x: document.html.clientWidth, y: document.html.clientHeight};

  return {
    x1: scroll.x,
    x2: scroll.x + screen.x,
    y1: scroll.y,
    y2: scroll.y + screen.y
  };
};
