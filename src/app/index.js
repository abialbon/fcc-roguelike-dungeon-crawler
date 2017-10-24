import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { store } from './store';
import mapActions from './actions/mapActions';

import App from './components/App';

mapActions([50, 30]);

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
  ,document.getElementById('app'));