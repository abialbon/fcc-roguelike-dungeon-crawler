import { store } from '../store';
import _ from 'lodash';

const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

export const createMap = function([c, r]) {
  // Create empty arrays
  let mapArray = [];
  let entitesArray = [];
  let shadowArray = [];

  // Filling the array with empty arrays for rows [ h => row coords ]
  for (let i = 0; i < r; i++) {
    mapArray.push([]);
    entitesArray.push([])
    shadowArray.push([])
  }

  // Create the map
  const map = new ROT.Map.Rogue(c,r);
  map.create((x, y, v) => {
    mapArray[y][x] = v; 
  })

  // Add the player
  let playerNotChosen = true;
  let playerPosition;
  while (playerNotChosen) {
    let [y, x] = randomCoords([29, 49]);
    if (!mapArray[y][x]) {
      playerPosition = [y, x];
      entitesArray[y][x] = { 
        type: 'player'
        }
      playerNotChosen = false;
    }
  }

  // Create 10 enemies
  for (let i = 0; i < 7; i++) {

    let enemyNotChosen = true;
    while (enemyNotChosen) {
      let [y, x] = randomCoords([29, 49]);
      if ((!mapArray[y][x]) && (!entitesArray[y][x])) {
        entitesArray[y][x] = { 
          type: 'enemy'
          }
        enemyNotChosen = false;
      }
    } 
  }

  // Create health & weapons
  for (let i = 0; i < 7; i++) {
    
    let healthNotChosen = true;
    while (healthNotChosen) {
      let [y, x] = randomCoords([29, 49]);
      if ((!mapArray[y][x]) && (!entitesArray[y][x])) {
        entitesArray[y][x] = { 
          type: 'health'
          }
          healthNotChosen = false;
        }
    } 
  }

  store.dispatch({
    type: 'CREATE_MAP',
    payload: {
      mapArray,
      entitesArray,
      shadowArray,
      playerPosition
    }
  })

}

export const handleMove = function(e) {
  let mapArray = store.getState().mapArray;
  let entitesArray = store.getState().entitesArray;
  // Find coordinate of the next 
  let y1, x1;
  let [y, x] = store.getState().playerPosition;
  let index = ((y) * 50) + x;

  // Helper function to get the coords
  const coordCal= (index) => [Math.floor(index / 50), index % 50]
  // Find the coords of the next tile
  switch (e.which) {
    case 37:
      [y1, x1] = coordCal(index - 1);
      break;

    case 38:
      [y1, x1]  = coordCal(index - 50);
      break;

    case 39:
      [y1, x1]  = coordCal(index + 1);
      break;

    case 40:
      [y1, x1]  = coordCal(index + 50);
      break;
    
  }
  
  // Determine if wall
  if (mapArray[y1][x1]) {
    console.log('Wall')
    return;
  }

  store.dispatch({ type: 'MOVE_PLAYER', payload: [y1, x1] })
  
}