
export default function mapReducer (state = {}, action) {
  switch (action.type) {
    case 'CREATE_MAP':
      return {
        ...action.payload
      }

    case 'MOVE_PLAYER':
      let newArray = [...state.entitesArray];
      let [y, x] = state.playerPosition;
      let [y1, x1] = action.payload;
      newArray[y][x] = undefined;
      newArray[y1][x1] = { type: 'player' }
      return {
        ...state,
        playerPosition: [y1, x1],
        entitesArray: newArray
      }

    default:
      return state;
  }
}