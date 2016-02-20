import Dispatcher from '../core/Dispatcher';
import EventEmitter from 'events';
import _ from 'lodash';
import ActionTypes from '../constants/ActionTypes';

var CHANGE_EVENT = 'change';

var _temperatures = [];
var _images = [];
var _humidities = [];
var _barometricPressure = [];
var _ambientLightReadings =[];

class FirebaseStore extends EventEmitter {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAllTemperatures() {
    return _temperatures;
  }

  getLastTemperature() {
    return _temperatures[_temperatures.length - 1];
  }

  getAllImages() {
    return _images;
  }

  getLastImage() {
    return _images[_images.length - 1];
  }

  getAllHumidities() {
    return _humidities;
  }

  getLastHumidity() {
    return _humidities[_humidities.length - 1];
  }

  getAllBarometricPressures() {
    return _barometricPressure;
  }

  getLastBarometricPressure() {
    return _barometricPressure[_barometricPressure.length - 1];
  }

  getAllAmbientLightData() {
    return _ambientLightReadings;
  }

  getLastAmbientLightData() {
    return _ambientLightReadings[_ambientLightReadings.length - 1];
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

const store = new FirebaseStore();

store.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.RECEIVED_FIREBASE_DATA:
      _temperatures.push(action.data);
      store.emitChange();
      break;
    case ActionTypes.RECEIVED_CAMERA_DATA:
      _images.push(action.data);
      store.emitChange();
      break;
    case ActionTypes.RECEIVED_HUMIDITY_DATA:
      _humidities.push(action.data);
      store.emitChange();
      break;
    case ActionTypes.RECEIVED_BAROMETER_DATA:
      _barometricPressure.push(action.data);
      store.emitChange();
      break;
    case ActionTypes.RECEIVED_AMBIENT_LIGHT_DATA:
      _ambientLightReadings.push(action.data);
      store.emitChange();
      break;
    default:
      //do nothing

  }   
});


export default store;