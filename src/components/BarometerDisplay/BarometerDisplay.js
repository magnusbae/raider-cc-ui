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
import s from './BarometerDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import ReactGauge from '../ReactGauge';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getBarometerState() {
  return {
    barometricPressure: FirebaseStore.getLastBarometricPressure()
  };
}

function renderLatestBarometer(barometer) {
  if (barometer && barometer.pressure) {
    return (
      <div className="raider-cc-barometer-pressure-latest" style={{width: "45%", float: "left"}}>
      <h2>Siste lufttrykk</h2>
      <ReactGauge width="200" height="100" min="0" max="100" value={barometer.pressure} unit="hPa"/>
    </div>
    );
  } else {
    return (
      <p>No barometer readings received yet. Are we live?</p>
    );
  }
}

class BarometerDisplay extends Component {

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
    this.state = getBarometerState();
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getBarometerState());
  }

  render() {
    return !this.props.error ? (
      <div>
        {renderLatestBarometer(this.state.barometricPressure)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default BarometerDisplay;
