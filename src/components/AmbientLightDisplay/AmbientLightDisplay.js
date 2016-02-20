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
import s from './AmbientLightDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import ReactGauge from '../ReactGauge';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getAmbientLightState() {
  return {
    ambientLight: FirebaseStore.getLastAmbientLightData()
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

function renderLatestAmbientLightReading(ambientLight) {
  if (ambientLight && ambientLight.lux) {
    return (
      <div className="raider-cc-ambient-light-latest" style={{width: "45%", float: "left"}}>
        <h2>Lysnivå</h2>
        <ReactGauge width="200" height="100" min="0" max="400" value={ambientLight.lux} unit="lux"/>
      </div>
    );
  } else {
    return (
      <p>No ambient light readings received yet. Are we live?</p>
    );
  }
}

class AmbientLightDisplay extends Component {

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
    this.state = getAmbientLightState();
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getAmbientLightState());
  }

  render() {
    return !this.props.error ? (
      <div>
        {renderLatestAmbientLightReading(this.state.ambientLight)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default AmbientLightDisplay;
