import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { render } from 'react-dom';
import Card from './Card';
import constants from './constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateCardStatus(draggedId, props.Id)
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
            return <Card key={card.id}
                        taskCallbacks={this.props.taskCallbacks}
                        id={card.id}
                        title={card.title}
                        color={card.color}
                        description={card.description}
                        tasks={card.tasks} />
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
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
}

// export default List;
export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
