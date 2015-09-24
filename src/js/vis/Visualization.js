var vg = require('vega'),
    sg = require('../state/signals'),
    Group = require('./primitives/marks/Group');

var SG_WIDTH = 'vis_width', SG_HEIGHT = 'vis_height';

function Visualization() {
  Group.call(this);

  this.width  = 500;
  this.height = 500;
  this.padding = 'auto';

  return this;
}

var prototype = (Visualization.prototype = Object.create(Group.prototype));
prototype.constructor = Visualization;

prototype.init = function() {
  this.width  = sg.def(SG_WIDTH, this.width);
  this.height = sg.def(SG_HEIGHT, this.height);
  return Group.prototype.init.call(this);
};

prototype.export = function(resolve) {
  var spec = Group.prototype.export.call(this, resolve);

  // Always resolve width/height signals.
  spec.width  = spec.width.signal  ? sg.value(SG_WIDTH)  : spec.width;
  spec.height = spec.height.signal ? sg.value(SG_HEIGHT) : spec.height; 

  // Remove mark-specific properties
  delete spec.type;
  delete spec.from;
  delete spec.properties;
  return spec;
};

prototype.manipulators = function() { 
  return Group.prototype.manipulators.call(this).marks[0];
};

module.exports = Visualization;