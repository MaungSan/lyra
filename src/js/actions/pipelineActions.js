'use strict';

var dl = require('datalib'),
    counter = require('../util/counter'),
    datasetActions = require('./datasetActions'),
    addDataset = datasetActions.addDataset,
    ADD_PIPELINE = 'ADD_PIPELINE';

/**
 * Action creator to add a new Pipeline in the store. A new pipeline requires
 * a new source dataset. Thus, we need to dispatch multiple actions.
 *
 * @param {Object} pipeline - The properties of the pipeline.
 * @param {Object} dataset - The properties of the dataset.
 * @returns {Function} An async action function
 */
function addPipeline(pipeline, dataset) {
  return function(dispatch) {
    var pid = pipeline._id || counter.global();

    var ds = addDataset(dl.extend({_parent: pid}, dataset));
    dispatch(ds);

    pipeline = dl.extend({
      _id: pid,
      _source: pipeline._source || ds.id
    }, pipeline);

    dispatch({
      type: ADD_PIPELINE,
      id: pipeline._id,
      props: pipeline
    });
  };
}

module.exports = {
  // Action Names
  ADD_PIPELINE: ADD_PIPELINE,

  // Action Creators
  addPipeline: addPipeline
};
