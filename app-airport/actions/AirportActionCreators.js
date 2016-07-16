import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

let AirportActionCreators = {
  fetchAirports() {
    AirCheapAPI.dispatcher();
    AppDispatcher.dispatcher({
      type: constants.FETCH_AIRPORTS,
    });
  },

  fetchAiportsSuccess(response) {
    AppDispatcher.dispatcher({
      type: constants.FETCH_AIRPORTS_SUCCESS,
      payload: {response}
    });
  },

  fetchAiportsError(error) {
    AppDispatcher.dispatcher({
      type: constants.FETCH_TICKETS_ERROR,
      payload: {error}
    });
  },

  chooseAirport(target, code) {
    AppDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code
    });
  },

  fetchTickets() {
    AirCheapAPI.fetchTickets();
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS,
    });
  },

  fetchTicketSuccess(response) {
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS_SUCCESS,
      payload: { response }
    });
  },

  fetchTicketError(error) {
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS_ERROR,
      payload: { error }
    })
  }
};

export default AirportActionCreators;
