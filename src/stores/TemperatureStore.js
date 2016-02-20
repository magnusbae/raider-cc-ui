import Dispatcher from '../core/Dispatcher';
import EventEmitter from 'events';
import _ from 'lodash';
import ActionTypes from '../constants/ActionTypes';

var CHANGE_EVENT = 'change';

var _temperatures = []; // collection of todo items


class TemperatureStore extends EventEmitter {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll() {
    return _temperatures;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

};

const store = new TemperatureStore();

store.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.RECEIVED_FIREBASE_DATA:
      _temperatures.push(action.data);
      store.emitChange();
      break;
    default:
      //do nothing

  }   
});


export default store;