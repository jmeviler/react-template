import React, { Component } from 'react';

import reducer, * as actions from './state';

export default class Rest extends Component {
  render = () => {
    return (
      <div >
        Rest demo
      </div>
    );
  }
}

export {
  reducer,
};
