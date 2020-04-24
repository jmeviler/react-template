import Engine from '~/engine';
import { Storage } from '~/plugins';
import * as ReduxEnhance from '~/plugins/ReduxEnhance';
import res from '~/resources';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import createHistory from 'history/createHashHistory';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter, routerActions, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { i18n } from 'redux-pagan';
import thunk from 'redux-thunk';

import CommonLayout from './CommonLayout';
import Redux, { reducer as redux } from './Redux';
import Rest, { reducer as rest } from './Rest';

const reducer = combineReducers({
  routing: routerReducer,
  i18n,
  redux,
  rest,
});
const history = createHistory();
export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger({
      predicate: () => {
        // eslint-disable-next-line
        return process.env.ENV !== 'production' || localStorage.debug;
      },
    }))
  )
);

ReduxEnhance.init(store, res);

const routes = {
  '/redux': {
    iconType: 'pie-chart',
    title: 'Redux Demo',
    component: Redux,
  },
  '/rest': {
    iconType: 'desktop',
    title: 'Rest Demo',
    component: Rest,
  },
  '/group': {
    iconType: 'pie-chart',
    title: 'group',
    items: {
      '/redux': {
        iconType: 'pie-chart',
        component: Redux,
        title: 'Redux Demo',
        group: 'group',
      },
      '/rest': {
        iconType: 'desktop',
        component: Rest,
        title: 'Rest Demo',
        group: 'group',
      },
    },
  },
};

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
      <LocaleProvider locale={zhCN} >
        <Provider store={store}>
          <ConnectedRouter history={history} >
            <Switch>
              <CommonLayout routes={routes} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </LocaleProvider>
    );
  }
}

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}
