import React, { Component, PropTypes} from 'react';
import CardForm from './CardForm';
import DraftStore from '../stores/DraftStore';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';

class NewCard extends Component {
  // componentWillMount() {
  //   this.setState({
  //     id: Date.now(),
  //     title: '',
  //     description: '',
  //     status: 'todo',
  //     color: '#c9c9c9',
  //     tasks: []
  //   });
  // }

  handleChange(field, value) {
    // this.setState({
    //   [field]: value
    // });

    CardActionCreators.updateDraft(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.cardCallbacks.addCard(this.state);
    CardActionCreators.addCard(this.state.draft);
    this.props.history.pushState(null, '/');
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  componentDidMount() {
    setTimeout(() => CardActionCreators.createDraft(), 0);
  }

  render() {
    return(
      <CardForm draftCard={this.state.draft}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    );
  }
}

// NewCard.propTypes = {
//   cardCallbacks: PropTypes.object,
// };

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
  draft: DraftStore.getState()
});

// export default NewCard;
export default Container.create(NewCard);
