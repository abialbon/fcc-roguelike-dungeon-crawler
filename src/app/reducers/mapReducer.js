
export default function mapReducer (state = {}, action) {
  switch (action.type) {
    case 'CREATE_MAP':
      return {
        ...state,
        ...action.payload
      }

    case 'MOVE_PLAYER':
      let newArray = [...state.entitesArray];
      let [y, x] = state.playerPosition;
      let [y1, x1, shadowArray] = action.payload;
      newArray[y][x] = undefined;
      newArray[y1][x1] = { type: 'player' }
      return {
        ...state,
        playerPosition: [y1, x1],
        entitesArray: newArray,
        shadowArray: shadowArray
      }

    default:
      return state;
  }
}