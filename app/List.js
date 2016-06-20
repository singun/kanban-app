import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Card from './Card';

class List extends Component {
    render() {
        var cards = this.props.cards.map((card) => {
            return <Card key={card.id}
                        id={card.id}
                        title={card.title}
                        color={card.color}
                        description={card.description}
                        tasks={card.tasks} />
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propType = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object)
}

export default List;