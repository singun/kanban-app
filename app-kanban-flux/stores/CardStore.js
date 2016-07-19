import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';
import 'babel-polyfill';

class CardStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  getCard(id) {
    console.log('getCard=', this._state.find((card) => card.id == id));
    return this._state.find((card) => card.id == id);
  }

  getCardIndex(id) {
    // console.log('_state=', this._state);
    return this._state.findIndex((card) => card.id == id);
  }

  reduce(state, action) {
    let cardIndex, taskIndex;

    switch(action.type) {
      case constants.FETCH_CARDS_SUCCESS:
        return action.payload.response;

      case constants.CREATE_CARD:
        return update(this.getState(), {
          $push: [action.payload.card]
        });

      case constants.CREATE_CARD_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {
            id: {
              $set: action.payload.response.id
            }
          }
        });

      case constants.CREATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          $splice: [[cardIndex, 1]]
        });

      case constants.UPDATE_CARD:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {
            $set: action.payload.draftCard
          }
        });

      case constants.UPDATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {
            $set: action.payload.card
          }
        });

      case constants.CREATE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              $push: [action.payload.task]
            }
          }
        });

      case constants.CREATE_TASK_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
          task.id == action.payload.task.id
        ));

        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              [taskIndex]: {
                id: {
                  $set: action.payload.response.id
                }
              }
            }
          }
        });

      case constants.CREATE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
          task.id == action.payload.task.id
        ));

        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              $splice: [[taskIndex, 1]]
            }
          }
        });

      case constants.TOGGLE_CARD_DETAILS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            showDetails: {
              $apply: (currentValue) => (currentValue !== false) ? false : true
            }
          }
        });

      case constants.DELETE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              $splice: [[action.payload.taskIndex, 1]]
            }
          }
        });

      case constants.DELETE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              $splice: [[action.payload.taskIndex, 0, action.payload.task]]
            }
          }
        });

      case constants.TOGGLE_TASK:
        // console.log('payload=', action.payload);
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              [action.payload.taskIndex]: {
                done: {
                  $apply: (done) => !done
                }
              }
            }
          }
        });

      case constants.TOGGLE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {
            tasks: {
              [action.payload.taskIndex]: {
                done: {
                  $apply: (done) => !done
                }
              }
            }
          }
        });

      default:
        return state;
    }
  }
}

export default new CardStore(AppDispatcher);
