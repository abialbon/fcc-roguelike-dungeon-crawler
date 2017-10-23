import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import _ from 'lodash';

import App from './components/App';

const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

const mapReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_MAP':
      return {
        ...state,
        mapArray: action.payload
      }
    
    case 'ADD_PLAYER':
      console.log('Choosing a player!')
      let playerNotChosen = true;
      let gameArray = state.gameArray;
      while (playerNotChosen) {
        let r = randomCoords([29, 49]);
        console.log(r);
        if (!state.mapArray[r[0]][r[1]]) {
          gameArray[r[0]][r[1]] = { 
            type: 'player'
           }
          playerNotChosen = false;
        }
      }

    case 'ADD_ENEMIES':
      for (let i = 0; i < 10; i++) {

        let enemyNotChosen = true;
        let gameArray = state.gameArray;
        while (enemyNotChosen) {
          let r = randomCoords([29, 49]);
          if ((!state.mapArray[r[0]][r[1]]) && (!gameArray[r[0]][r[1]])) {
            gameArray[r[0]][r[1]] = { 
              type: 'enemy'
             }
            enemyNotChosen = false;
          }
        } 
        
      }
    
    default:
      return state;
  }
}

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

const store = createStore(mapReducer, initGameState([50, 30]))
store.subscribe(() => {
  console.log(store.getState());
});

const mapActions = {
  createMap: function([c, r]) {
    let mapArray = store.getState().mapArray;
    const map = new ROT.Map.Rogue(c,r);
    map.create((x, y, v) => {
      mapArray[y][x] = v; 
    })
    store.dispatch({
      type: 'CREATE_MAP',
      payload: mapArray
    })
  }, // createMap
}

mapActions.createMap([50, 30]);
store.dispatch({
  type: 'ADD_PLAYER'
})

setTimeout(() => {
  store.dispatch({
    type: 'ADD_PLAYER'
  })
}, 3000)

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
  ,document.getElementById('app'));