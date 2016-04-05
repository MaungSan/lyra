'use strict';
var React = require('react'),
    connect = require('react-redux').connect,
    getIn = require('../../util/immutable-utils').getIn,
    model = require('../../model'),
    marks = require('../../model/primitives/marks'),
    lookup = model.lookup,
    getClosestGroupId = require('../../util/hierarchy').getClosestGroupId,
    addMark = require('../../actions/primitiveActions').addMark,
    selectMark = require('../../actions/selectMark');

function mapStateToProps(reduxState, ownProps) {
  var selectedMarkId = getIn(reduxState, 'inspector.selected');
  var sceneId = getIn(reduxState, 'scene.id');
  var closestGroupId = selectedMarkId ? getClosestGroupId(reduxState, selectedMarkId) : sceneId;
  console.log(closestGroupId);

  return {
    closestGroupId: closestGroupId,
    selected: selectedMarkId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMark: function(id) {
      dispatch(selectMark(id));
    },
    addMark: function(parentId, type) {
      dispatch(addMark(marks(type).defaultProperties({
        _parent: parentId
      })));
    }
  };
}

// Splitting each sidebar into its column
var AddMarksTool = connect(
  mapStateToProps,
  mapDispatchToProps
)(React.createClass({
  classNames: 'new Marks',

  render: function() {
    var parentId = this.props.closestGroupId;

    return (
      <ul className={this.classNames}>
        <li onClick={this.props.addMark.bind(null, parentId, 'rect')} >RECT</li>
        <li onClick={this.props.addMark.bind(null, parentId, 'symbol')}>SYMBOL</li>
        <li onClick={this.props.addMark.bind(null, parentId, 'area')}>AREA</li>
        <li onClick={this.props.addMark.bind(null, parentId, 'line')}>LINE</li>
        <li onClick={this.props.addMark.bind(null, parentId, 'text')}>TEXT</li>
      </ul>
    );
  }
}));

module.exports = AddMarksTool;
