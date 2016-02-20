import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  receivedSocketData: function(data) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVED_SOCKET_DATA,
      data: data,
    });
  },


};
