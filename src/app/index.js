import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { store } from './store';
import mapActions from './actions/mapActions';

import App from './components/App';

mapActions.createMap([50, 30]);
store.dispatch({
  type: 'ADD_PLAYER'
})
store.dispatch({
  type: 'ADD_ENEMIES'
})

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
  ,document.getElementById('app'));