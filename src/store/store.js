import React, {Component} from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import user from './reducers/user';
import home from './reducers/home';
import info from './reducers/info';
import welfare from './reducers/welfare';
import my from './reducers/my';
import common from './reducers/common';
import persist from './reducers/persist';

const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['persist'],
};

const reducers = combineReducers({
  user,
  home,
  info,
  welfare,
  my,
  persist,
  common,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

export class StoreProvider extends Component {
  constructor(props) {
    super(props);
  }
  state = {persistIsFinish: false};
  componentDidMount() {
    persistStore(store, {}, () => {
      this.setState({persistIsFinish: true});
    });
  }
  render() {
    if (!this.state.persistIsFinish) {
      return null;
    }
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default store;
