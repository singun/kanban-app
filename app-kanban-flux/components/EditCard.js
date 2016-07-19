import React, { Component, PropTypes} from 'react';
import CardForm from './CardForm';
import CardStore from '../stores/CardStore';
import DraftStore from '../stores/DraftStore';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import 'babel-polyfill';

class EditCard extends Component {
  // componentWillMount() {
  //   console.log('params=', this.props.params);
  //   console.log('props=', this.props);
  //   let card = this.props.cards.find((c) => c.id == this.props.params.card_id);
  //   console.log('card=', card);
  //   this.setState({
  //     card: card
  //   });
  //
  //   let card = CardStore.getCard(parseInt(this.props.params.card_id));
  //   this.setState(Object.assign({}, card));
  // }

  handleChange(field, value) {
    // this.setState({
    //   card : {
    //     [field]: value
    //   }
    // });

    CardActionCreators.updateDraft(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.cardCallbacks.updateCard(this.state.card);

    CardActionCreators.updateCard(
      CardStore.getCard(this.props.params.card_id),
      this.state.draft);
    this.props.history.pushState(null, '/');
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  componentDidMount() {
    console.log('cardId=', this.props.params.card_id);
    
    setTimeout(() => {
      CardActionCreators.createDraft(CardStore.getCard(this.props.params.card_id))
    }, 0);
  }

  render() {
    console.log('draft=', this.state.draft);

    return (
      <CardForm draftCard={this.state.draft}
        buttonLabel="Edit Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    );
  }
}

// EditCard.propTypes = {
//   cardCallbacks: PropTypes.object
// }

EditCard.getStores = () => ([DraftStore]);
EditCard.calculateState = (prevState) => ({
  draft: DraftStore.getState()
});

// export default EditCard;
export default Container.create(EditCard);
