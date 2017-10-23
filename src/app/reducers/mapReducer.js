const randomCoords = ([c, r]) => [ _.random(c), _.random(r)]; 

export default function mapReducer (state, action) {
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