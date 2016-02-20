/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './TempSensorDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

import TemperatureStore from '../../stores/TemperatureStore';
import _ from 'lodash';

function getTemperatureState() {
  return {
    readings: TemperatureStore.getAll()
  };
}

var tempId = 0;

class TempSensorDisplay extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);
    tempId = 0;
    this._onChange = this._onChange.bind(this);
    this.state = getTemperatureState()
  }

  componentWillMount() {
    TemperatureStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TemperatureStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getTemperatureState());
  }

  render() {
    var tempReadings = _.map(this.state.readings, function(reading){
      tempId++;
      return (<li key={tempId}>{reading.ambientTemp}</li>);
    });
    if(tempReadings.length === 0){
      tempReadings.push(<p>No data yet. Are we live?</p>);
    }

    return !this.props.error ? (
      <ul>
        {tempReadings}
      </ul>
    ) : (<p>An error occured</p>);
  }

}

export default TempSensorDisplay;
