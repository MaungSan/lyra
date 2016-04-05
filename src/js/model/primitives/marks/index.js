'use strict';

var ctors = {
  area: require('./Area'),
  group: require('./Group'),
  line: require('./Line'),
  rect: require('./Rect'),
  scene: require('./Scene'),
  symbol: require('./Symbol'),
  text: require('./Text')
};

module.exports = function(type) {
  return ctors[type];
};
