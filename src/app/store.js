import { createStore, applyMiddleware } from 'redux';
import mapReducer from './reducers/mapReducer';
import logger from 'redux-logger';

// Initial game state has a mapArray and a GameArray
const initGameState = ([c, r]) => {
  let mapArray = [];
  let gameArray = [];
  // Filling the array with empty arrays for rows [ h => row coords ]
  for (let i = 0; i < r; i++) {
    mapArray.push([]);
    gameArray.push([])
  }
  return {
    mapArray,
    gameArray
  }
}

export const store = createStore(mapReducer, initGameState([50, 30]), applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
})