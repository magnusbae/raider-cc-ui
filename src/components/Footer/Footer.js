/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';
import Link from '../Link';
import CameraDisplay from '../CameraDisplay';

class Footer extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.ccLeft}>
            <CameraDisplay {...this.props.content}/>
          </div>
          <div className={s.ccCenter}>
            <span className={s.text}>© Raiders of the Lost Pi</span>
          </div>
          <div className={s.ccRight}>
            Box
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(Footer, s);
