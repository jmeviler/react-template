import React, { Component } from 'react';

import reducer, * as actions from './state';

export default class Redux extends Component {
  render = () => {
    return (
      <div >
        Redux demo
      </div>
    );
  }
}

export {
  reducer,
};
