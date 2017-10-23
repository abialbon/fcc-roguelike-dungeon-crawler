const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

export default function mapReducer (state, action) {
  switch (action.type) {
    case 'CREATE_MAP':
      return {
        ...state,
        mapArray: action.payload
      }
    
    case 'ADD_PLAYER':
      let playerNotChosen = true;
      let gameArray = [...state.gameArray];
      while (playerNotChosen) {
        let r = randomCoords([29, 49]);
        if (!state.mapArray[r[0]][r[1]]) {
          gameArray[r[0]][r[1]] = { 
            type: 'player'
           }
          playerNotChosen = false;
        }
      }
      return {
        ...state,
        gameArray: gameArray
      }

    case 'ADD_ENEMIES':
      let gameArrayEnemies = [...state.gameArray];
      for (let i = 0; i < 10; i++) {

        let enemyNotChosen = true;
        while (enemyNotChosen) {
          let r = randomCoords([29, 49]);
          if ((!state.mapArray[r[0]][r[1]]) && (!gameArrayEnemies[r[0]][r[1]])) {
            gameArrayEnemies[r[0]][r[1]] = { 
              type: 'enemy'
             }
            enemyNotChosen = false;
          }
        } 
      }
      return {
        ...state,
        gameArray: gameArrayEnemies
      }
    
    default:
      return state;
  }
}