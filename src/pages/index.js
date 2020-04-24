import Engine from '~/engine';
import { Storage } from '~/plugins';
import * as ReduxEnhance from '~/plugins/ReduxEnhance';
import res from '~/resources';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter, connectRouter, routerActions, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import qhistory from 'qhistory';
import { parse, stringify } from 'qs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { i18n } from 'redux-pagan';
import thunk from 'redux-thunk';

import Redux, { reducer as redux } from './Redux';
import Rest, { reducer as rest } from './Rest';

const history = qhistory(
  createHashHistory(),
  stringify,
  parse
);

const reducer = combineReducers({
  router: connectRouter(history),
  i18n,
  redux,
  rest,
});

export const store = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger({
      predicate: () => {
        // eslint-disable-next-line
        // return process.env.ENV !== 'production' || localStorage.debug;
      },
    }))
  )
);

ReduxEnhance.init(store, res);

export default class Pages extends Component {
  state = { isReady: false }

  componentDidMount = async () => {
    try {
      await Engine.init({
        storage: new Storage({ scope: 'template-react' }),
        apiEndpoint: `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_DOMAIN}`,
        onInitSuccess: this.onInitSuccess,
        onLogout: this.onLogout,
      });
      this.setState({ isReady: true });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  onInitSuccess = () => {

  }

  onLogout = () => {
    store.dispatch(routerActions.replace('/account/login'));
  }

  render = () => {
    if (!this.state.isReady) {
      return null;
    }

    return (
      <ConfigProvider locale={zhCN} >
        <Provider store={store}>
          <ConnectedRouter history={history} >
            <Switch>
              <Route exact path="/" component={Rest} />
              <Route exact path="/test" component={Redux} />
              <Redirect to="/" />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </ConfigProvider>
    );
  }
}

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}
