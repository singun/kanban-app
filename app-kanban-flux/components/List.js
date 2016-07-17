import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { render } from 'react-dom';
import Card from './Card';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem();
    CardActionCreators.updateCardStatus(draggedId.id, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class List extends Component {
  render() {

    const { connectDropTarget } = this.props;

    var cards = this.props.cards.map((card) => {
      return <Card key={card.id} {...card} />
    });

    return connectDropTarget (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired
}

// export default List;
export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
