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
import s from './HumidityDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import ReactGauge from '../ReactGauge';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getHumidityState() {
  return {
    humidity: FirebaseStore.getLastHumidity()
  };
}

function renderLatestHumidity(humidity) {
  if (humidity && humidity.humidity) {
    return (
      <div className="raider-cc-humidity-latest" style={{width: "45%", float: "left"}}>
        <h2>Luftfuktighet</h2>
        <ReactGauge width="200" height="100" min="0" max="100" value={humidity.humidity} unit="%"/>
      </div>
    );
  } else {
    return (
      <p>No humidity readings received yet. Are we live?</p>
    );
  }
}

class HumidityDisplay extends Component {

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
    this.state = getHumidityState();
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getHumidityState());
  }

  render() {
    return !this.props.error ? (
      <div>
        {renderLatestHumidity(this.state.humidity)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default HumidityDisplay;
