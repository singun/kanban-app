import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports() {
    fetch('airports.json')
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      //구문 분석된 데이터를 전달하고 AirportActionCreators 성공 액션을 호출한다.
      AirportActionCreators.fetchAiportsSuccess(responseData);
    })
    .catch((error) => {
      // error 객체를 전달하고 AirportActionCreators 오류 액션을 호출한다.
      AirportActionCreators.fetchAiportsError(error);
    });
  },

  fetchTicket() {
    fetch('flight.json')
    .then((resonse) => response.json())
    .then((responseData) => {
      AirportActionCreators.fetchTicketSuccess(responseData);
    })
    .catch((error) => {
      AirportActionCreators.fetchTicketError(error);
    })
  }
};

export default AirCheapAPI;
