import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  dispatcher(action = []) {
    console.log('dispatcher=', action);
    super.dispatcher(action);
  }
}

export default new AppDispatcher();
