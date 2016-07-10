import React, { Component, PropTypes} from 'react';
import CardForm from './CardForm';

class EditCard extends Component {
  componentWillMount() {
    console.log('params=', this.props.params);
    console.log('props=', this.props);

    let card = this.props.cards.find((c) => c.id == this.props.params.card_id);
    console.log('card=', card);

    this.setState({
      card: card
    });
  }

  handleChange(field, value) {
    this.setState({
      card : {
        [field]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.cardCallbacks.updateCard(this.state.card);
    this.props.history.pushState(null, '/');
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  render() {
    console.log('state=', this.state);
    return (
      <CardForm draftCard={this.state.card}
        buttonLabel="Edit Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    );
  }
}

EditCard.propTypes = {
  cardCallbacks: PropTypes.object
}

export default EditCard;
