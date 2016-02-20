import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  firebaseData: function(data) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVED_FIREBASE_DATA,
      data: data,
    });
  },
  receivedCameraData: function(data) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVED_CAMERA_DATA,
      data: data,
    });
  },
  receivedHumidityData: function(data) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVED_HUMIDITY_DATA,
      data: data,
    });
  },

};