import { createStore, combineReducers, applyMiddleware } from 'redux';
import mapReducer from './reducers/mapReducer';
import logger from 'redux-logger';

export const store = createStore(mapReducer, {}, applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
})