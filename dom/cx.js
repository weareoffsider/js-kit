
// cx
// Return all truthy values as keys to a className, also replacing & with the
// block name

module.exports = function(classObj, blockName) {
  return Object.keys(classObj).reduce(function(acc, className) {
    var active = classObj[className];
    if (active && blockName) {
      acc.push(className.split("&").join(blockName));
    } else if (active) {
      acc.push(className);
    }
    return acc;
  }, []).join(" ");
};
