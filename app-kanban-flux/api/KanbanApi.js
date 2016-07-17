import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
};

let KanbanAPI = {
  fetchCards() {
    return fetch(API_URL + '/cards', {
      header: API_HEADERS
    })
    .then((response) => response.json());
  },

  addCard(card) {
    return fetch(API_URL + '/cards', {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then((response) => response.json());
  },

  updateCard(card, draftCard) {
    return fetch(API_URL + '/cards/' + card.id, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify(draftCard)
    });
  },

  addTask(cardId, task) {
    return fetch(API_URL + '/cards/' + card.id + '/tasks', {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(task)
    })
    .then((response) => response.json());
  },

  deleteTask(cardId, task) {
    return fetch(API_URL + '/cards/' + cardId + '/tasks/' + task.id, {
      method: 'delete',
      headers: API_HEADERS
    });
  },

  toggleTask(cardId, task) {
    return fetch(API_URL + '/cards/' + cardId + '/tasks/' + task.id, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({
        done: !task.done
      })
    });
  }
};

export default KanbanAPI;