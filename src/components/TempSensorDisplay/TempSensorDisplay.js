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
import ReactGauge from '../ReactGauge';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getTemperatureState() {
  return {
    reading: FirebaseStore.getLastTemperature()
  };
}

function renderLatestTemperature(reading) {
  if (reading && reading.ambientTemp) {
  return (
    <div className="raider-cc-temp-latest" style={{width: "45%", float: "left"}}>
      <h2>Siste temperatur</h2>
      <ReactGauge width="200" height="100" min="-20" max="100" value={reading.ambientTemp} unit="deg (C)"/>
    </div>
  );
  } else {
    return (
      <p>No data yet. Are we live?</p>
    );
  }
}

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
    this._onChange = this._onChange.bind(this);
    this.state = getTemperatureState()
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getTemperatureState());
  }

  render() {
    return !this.props.error ? (
      <div>
        {renderLatestTemperature(this.state.reading)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default TempSensorDisplay;
