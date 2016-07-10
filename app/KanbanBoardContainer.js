import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import 'babel-polyfill';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            console.log('responseData=', responseData);
            this.setState({cards: responseData});
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        });
    }

    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask]}
            }
        });

        this.setState({cards: nextState});

        fetch(API_URL + '/cards/' + cardId + '/tasks', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Server response wasn't OK!");
            }
        })
        .then((responseData) => {
            newTask.id = responseData.id;
            this.setState({cards: nextState});
        })
        .catch((error) => {
            this.setState(prevState);
        });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });

        this.setState({cards: nextState});

        fetch(API_URL + '/cards/' + cardId + '/tasks/' + taskId, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK!");
            }
        })
        .catch((error) => {
            console.error("Fetch error:" , error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({cards: nextState});

        fetch(API_URL + '/cards/' + cardId + '/tasks/' + taskId, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK!");
            }
        })
        .catch((error) => {
            console.error("Fetch error:", errro);
            this.setState(prevState);
        });
    }

    updateCardStatus(cardId, listId) {
      let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
      let card = this.state.cards[cardIndex];

      if(card.status !== listId) {
        this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId}
            }
          }
        }));
      }
    }

    updateCardPosition(cardId, afterId) {
      if(cardId !== afterId) {
        let cardIndex = this.state.cards.findIndex((card) => cardid === cardId);
        let card = this.state.cards[cardIndex];

        let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);

        this.setState(update(this.state, {
          cards: {
            $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          }
        }));
      }
    }

    addCard(card) {
      let prevState = this.state;

      if(card.id === null) {
        let card = Object.assign({}, card, {id: Date.now()});
      }

      let nextState = update(this.state.cards, { $push: [card]});

      this.setState({cards: nextState});

      fetch(API_URL + '/cards', {
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(card)
      })
      .then((response) => {
        if(response.ok) {
          console.log('resonse.ok!!');
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData) => {
        card.id = responseData.id;
        this.setState({
          cards: nextState
        });
      })
      .catch((error) => {
        this.setState(prevState);
      });
    }

    updateCard(card) {
      console.log('state=', this.state);
      console.log('card=', card);
      let prevState = this.state;
      let cardIndex = this.state.cards.findIndex((c) => c.id == card.id);

      let nextState = update(
        this.state.cards, {
          [cardIndex]: { $set: card}
        }
      );

      this.setState({
        cards: nextState
      });

      fetch(API_URL + '/cards/' + card.id, {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify(card)
      })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.error("Fetch error=", error);
        this.setState(prevState);
      });
    }

    render() {
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
          cards: this.state.cards,
          taskCallbacks: {
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTask.bind(this)
          },

          cardCallbacks: {
            addCard: this.addCard.bind(this),
            updateCard: this.updateCard.bind(this),
            updateCardStatus: this.updateCardStatus.bind(this),
            updateCardPosition: this.updateCardPosition.bind(this),
            // persistMove
          }
        });

        return kanbanBoard;
    }
}

export default KanbanBoardContainer;
