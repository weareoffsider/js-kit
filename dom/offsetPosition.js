module.exports = function(element) {
  var parent = element.offsetParent;
  var parentBounds = parent.getBoundingClientRect();
  var bounds = elements.getBoundingClientRect();

  return {
    x: bounds.left - parentBounds.left + parent.scrollLeft,
    y: bounds.top - parentBounds.top + parent.scrollTop
  };
}
