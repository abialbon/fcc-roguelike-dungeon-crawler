import { createStore, combineReducers, applyMiddleware } from 'redux';
import mapReducer from './reducers/mapReducer';

const initGameState = {
  health: 100,
  level: 1,
  weapon: 'stick',
  xp : 0,
  dungeon: 1,
  dark: true
}

export const store = createStore(mapReducer, initGameState);
store.subscribe(() => {
  console.log(store.getState());
})