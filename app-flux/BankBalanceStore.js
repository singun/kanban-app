// -------------------------------------------------
// Store version 1
// -------------------------------------------------
// import { EventEmitter } from 'fbemitter';
// import AppDispatcher from './AppDispatcher';
// import bankConstants from './constants';
//
// const CHANGE_EVENT = 'change';
// let __emitter = new EventEmitter();
// let balance = 0;
//
// let BankBalanceStore = {
//   getState() {
//     return balance;
//   },
//
//   addListener(callback) {
//     return __emitter.addListener(CHANGE_EVENT, callback);
//   }
// };
//
// BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
//   switch (action.type) {
//     case bankConstants.CREATED_ACCOUNT:
//       balance = 0;
//       __emitter.emit(CHANGE_EVENT);
//       break;
//     case bankConstants.DEPOSITED_INTO_ACCOUNT:
//       balance = balance + action.amount;
//       __emitter.emit(CHANGE_EVENT);
//       break;
//     case bankConstants.WITHDRAW_FROM_ACCOUNT:
//       balance = balance - action.amount;
//       __emitter.emit(CHANGE_EVENT);
//       break;
//   }
// });
//
// export default BankBalanceStore;


// -------------------------------------------------
// Store version 2 - Store in flux/utils
// -------------------------------------------------
// import AppDispatcher from './AppDispatcher';
// import { Store } from 'flux/utils';
// import bankConstants from './constants';
//
// let balance = 0;
//
// class BankBalanceStore extends Store {
//   getState() {
//     return balance;
//   }
//
//   __onDispatch(action) {
//     switch (action.type) {
//       case bankConstants.CREATED_ACCOUNT:
//         balance = 0;
//         this.__emitChange();
//         break;
//       case bankConstants.DEPOSITED_INTO_ACCOUNT:
//         balance = balance + action.amount;
//         this.__emitChange();
//         break;
//       case bankConstants.CREATED_ACCOUNT:
//         balance = balance - action.amount;
//         this.__emitChange();
//         break;
//     }
//   }
// }
//
// export default new BankBalanceStore(AppDispatcher);


// -------------------------------------------------
// Store version 3 - ReduceStore in flux/utils
// -------------------------------------------------
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';
import { ReduceStore } from 'flux/utils';

class BankBalanceStore extends ReduceStore {
  getInitialState() {
    return 0;
  }

  reduce(state, action) {
    switch (action.type) {
      case bankConstants.CREATED_ACCOUNT:
        return 0;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        return state + action.amount;
      case bankConstants.WITHDRAW_FROM_ACCOUNT:
        return state - action.amount;
      default:
        return state;
    }
  }
}

export default new BankBalanceStore(AppDispatcher);
