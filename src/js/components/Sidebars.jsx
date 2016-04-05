'use strict';
var React = require('react'),
    InspectorSidebar = require('./InspectorSidebar'),
    VisualSidebar = require('./VisualSidebar'),
    PipelinesSidebar = require('./PipelinesSidebar'),
    Toolbar = require('./Toolbar'),
    Hints = require('./Hints'),
    model = require('../model');

// Splitting each sidebar into its column
var Sidebars = React.createClass({
  classNames: 'row',
  render: function() {
    var pipelines = model.pipeline();
    return (
      <div className={this.classNames}>
        <VisualSidebar />
        <InspectorSidebar ref="inspector"
          pipelines={pipelines} />
        <PipelinesSidebar />
        <Toolbar/>
        <Hints/>
      </div>
    );
  }
});

module.exports = Sidebars;
