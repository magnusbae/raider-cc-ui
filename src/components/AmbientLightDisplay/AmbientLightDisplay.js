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

import FirebaseStore from '../../stores/TemperatureStore';
import _ from 'lodash';

function getAmbientLightState() {
  return {
    ambientLight: FirebaseStore.getLastAmbientLightData()
  };
}

var AmbientLightReading = React.createClass({
  render: function() {
    return (
      <span>{this.props.ambientLight}</span>
    );
  }
});

function renderLatestAmbientLightReading(ambientLight) {
  if (ambientLight && ambientLight.lux) {
    return (
      <div className="raider-cc-ambient-light-latest">
      <span style={{fontWeight : 'bold'}}>Siste lysnivå: </span>
      <AmbientLightReading ambientLight={ambientLight.lux} />
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

  componentWillMount() {
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
