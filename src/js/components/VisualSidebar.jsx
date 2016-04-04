'use strict';
var React = require('react'),
    ScaleList = require('./visualization/ScaleList'),
    LayerList = require('./visualization/LayerList'),
    model = require('../model');

var VisualSidebar = React.createClass({
  classNames: 'sidebar col4 lt-blue-bg',
  getInitialState: function() {
    return {
      classes: 'col2'
    };
  },
  render: function() {
    return (
      <div className={this.classNames}>
        <header>
          <h2 className="hed">
            Visualization
          </h2>
        </header>
        <LayerList ref="layerList"
          layers={model.Scene.marks} />

        <ScaleList ref="scaleList"
          scales={model.scale()} />
      </div>
    );
  }
});

module.exports = VisualSidebar;
