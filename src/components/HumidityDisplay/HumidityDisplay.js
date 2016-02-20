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

import FirebaseStore from '../../stores/TemperatureStore';
import _ from 'lodash';

function getHumidityState() {
  return {
    humidity: FirebaseStore.getLastHumidity()
  };
}

var HumidityReading = React.createClass({
  render: function() {
    return (
      <span>{this.props.humidity}</span>
    );
  }
});

function renderLatestHumidity(humidity) {
  if (humidity && humidity.humidity) {
    return (
      <div className="raider-cc-humidity-latest">
      <span style={{fontWeight : 'bold'}}>Siste luftfuktighet: </span>
      <HumidityReading humidity={humidity.humidity} />
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

  componentWillMount() {
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
