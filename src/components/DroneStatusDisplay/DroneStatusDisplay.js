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
import s from './DroneStatusDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import ReactGauge from '../ReactGauge';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getDroneStatusState() {
  return {
    status: FirebaseStore.getLastDroneStatusData()
  };
}

var opts = {
  lines: 12, // The number of lines to draw
  angle: 0, // The length of each line
  lineWidth: 0.7, // The line thickness
  pointer: {
    length: 1, // The radius of the inner circle
    strokeWidth: 0.03, // The rotation offset
    color: '#000000' // Fill color
  },
  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',   // to see which ones work best for you
  generateGradient: true
};

function renderLatestDroneStatus(status) {
  if (status && status.battery) {
    return (
      <div className="raider-cc-drone-status-latest" style={{width: "45%", float: "left"}}>
        <h2>Batterinivå</h2>
        <ReactGauge width="200" height="100" min="0" max="100" value={status.battery} unit="%"/>
      </div>
    );
  } else {
    return (
      <p>No drone status received yet. Are we live?</p>
    );
  }
}

class DroneStatusDisplay extends Component {

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
    this.state = getDroneStatusState();
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getDroneStatusState());
  }

  render() {
    return !this.props.error ? (
      <div>
        {renderLatestDroneStatus(this.state.status)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default DroneStatusDisplay;
