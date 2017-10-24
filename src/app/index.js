import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { store } from './store';
import { createMap, handleMove } from './actions/mapActions';

import App from './components/App';

createMap([50, 30]);

document.addEventListener('keydown', handleMove);

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('app'));