/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './CameraDisplay.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

import FirebaseStore from '../../stores/FirebaseStore';
import _ from 'lodash';

function getCameraState() {
  return {
    image: FirebaseStore.getLastImage()
  };
}

var CameraImage = React.createClass({
  render: function() {
    let src = this.props.src
      ? this.props.src
      : 'data:image/jpg;base64,' + this.props.b64;
    return (
      <img src={src} width="200" height="200"/>
    );
  }
});

function renderLatestImage(image) {
  if (image && image.base64) {
    return (
      <CameraImage b64={image.base64} />
    );
  } else {
    return (
      <CameraImage src="200_placeholder.jpg" />
    );
  }
}

class CameraDisplay extends Component {

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
    this.state = getCameraState();
  }

  componentDidMount() {
    FirebaseStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FirebaseStore.removeChangeListener(this._onChange);
    this.removeCss();
  }

  _onChange() {
    this.setState(getCameraState());
  }

  render() {
    return !this.props.error ? (
      <div className={s.raiderCcCameraImage}>
        {renderLatestImage(this.state.image)}
      </div>
    ) : (<p>An error occured</p>);
  }

}

export default withStyles(CameraDisplay, s);
