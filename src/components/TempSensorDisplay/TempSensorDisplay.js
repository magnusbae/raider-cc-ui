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

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getTemperatureState() {
  return {
    reading: FirebaseStore.getLastTemperature()
  };
}

var TemperatureReading = React.createClass({
  render: function() {
    return (
      <span>{this.props.temp}</span>
    );
  }
});

function renderLatestTemperature(reading) {
  if (reading && reading.ambientTemp) {
  return (
    <div className="raider-cc-temp-latest">
      <span style={{fontWeight : 'bold'}}>Siste temperatur: </span>
      <TemperatureReading temp={reading.ambientTemp} />
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
