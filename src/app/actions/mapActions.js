import { store } from '../store';
import _ from 'lodash';

const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

  export default function createMap([c, r]) {
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
    while (playerNotChosen) {
      let [y, x] = randomCoords([29, 49]);
      if (!mapArray[y][x]) {
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
        shadowArray
      }
    })

  }