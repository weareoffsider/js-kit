// clamp
// return a variable, clamping between a maximum and minimum

module.exports = function(min, value, max) {
  if (min != null && min != undefined && value < min) return min;
  if (max != null && max != undefined && value > max) return max;
  return value;
};
