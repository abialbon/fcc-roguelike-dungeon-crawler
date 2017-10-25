import { store } from '../store';
import _ from 'lodash';

function hideBoard(playerPosition, shadowArray) {
  let index = (playerPosition[0] * 50) + playerPosition[1];
  let tilesToCover = [
    index -3, index - 2, index - 1, index, index + 1, index + 2, index + 3,
    index - 50 - 2, index - 50 - 1, index - 50, index - 50 + 1, index - 50 + 2,
    index + 50 - 2, index + 50 - 1, index + 50, index + 50 + 1, index + 50 + 2,
    index - 100 - 1, index - 100, index - 100 + 1,
    index + 100 - 1, index + 100, index + 100 + 1,
    index - 150, 
    index + 150
  ];
  const coordCal= (index) => [Math.floor(index / 50), index % 50]
  tilesToCover.forEach((index) => {
    if ((index > -1) && (index < 1499)) {
      let [y2, x2] = coordCal(index);
      shadowArray[y2][x2] = 1;
    }
  })
  return shadowArray;
}
const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

export const createMap = function([c, r]) {
  // Create empty arrays
  let mapArray = [];
  let entitesArray = [];
  let shadowArray = [];
  let dark = store.getState().dark;
  let level = store.getState().level;
  let weapons = ['whip', 'spear', 'gun', 'laser-gun'];

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
          type: 'enemy',
          damage: _.random(15, 24)
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
          type: 'health',
          health: _.random(15, 25),
          weapon: weapons[_.random(0, 3)]
          }
          healthNotChosen = false;
        }
    } 
  }

  // shadowArray
  hideBoard(playerPosition, shadowArray);

  store.dispatch({
    type: 'CREATE_MAP',
    payload: {
      mapArray,
      entitesArray,
      shadowArray,
      playerPosition,
    }
  })

}

export const handleMove = function(e) {
  let mapArray = store.getState().mapArray;
  let entitesArray = store.getState().entitesArray;
  let dark = store.getState().dark;
  let xp = store.getState().xp;
  let shadowArray = [];
  let level = store.getState().level;
  for (let i = 0; i < 30; i++) {
    shadowArray.push([]);
  }
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
  if ((y1 == 0 && x1 == 0) || mapArray[y1][x1]) {
    console.log('Wall')
    return;
  }

  let nextEntity = entitesArray[y1][x1];
  if (nextEntity && nextEntity.type == 'health') {
    store.dispatch({
      type: 'ADD_HEALTH',
      payload: nextEntity
    })
  } else if (nextEntity && nextEntity.type == 'enemy') {
    //Enemy logic here
    if (nextEntity.damage > 0) {
      store.dispatch({
        type: 'DO_DAMAGE',
        payload: {
          point: [y1, x1],
          damage: nextEntity.damage
        }
      })
      return;
    } else {
      store.dispatch({ type: 'ADD_XP' });
      hideBoard([y1, x1], shadowArray);
      store.dispatch({ type: 'MOVE_PLAYER', payload: [y1, x1, shadowArray] });
    }

    // Leveling up
    function levelup() {
      store.dispatch({
        type: 'LEVEL_UP'
      });
      createMap([50, 30]);
    }

    if ((level ==1) && (xp > 10)) {
      levelup()  
      return;
    } else if ((level == 2) && (xp > 30)) {
      levelup();
      return;
    }
    return;
  }

  hideBoard([y1, x1], shadowArray);
  store.dispatch({ type: 'MOVE_PLAYER', payload: [y1, x1, shadowArray] })
  
}