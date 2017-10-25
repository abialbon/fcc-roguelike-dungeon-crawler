
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

    case 'TOGGLE_DARK':
      let toggle = !state.dark;
      return {
        ...state,
        dark: toggle
      }

    case 'ADD_HEALTH': 
      let health = state.health;
      return {
        ...state,
        health: health + action.payload.health,
        weapon: action.payload.weapon
      }

    case 'DO_DAMAGE':
      let entity = action.payload.type;
      health = state.health - action.payload.damage;
      let entites = [...state.entitesArray];
      [y1, x1] = action.payload.point;
      let damage;
      switch (state.weapon) {
        case 'stick':
          damage = 10;
          break; 

        case 'whip':
          damage = 13;
          break;

        case 'spear':
          damage = 17;
          break;

        case 'gun':
          damage = 20;
          break;

        case 'laser-gun':
          damage = 25;
          break;
      }

      entites[y1][x1] = {
        type: entity == 'enemy' ? 'enemy' : 'boss',
        damage: action.payload.damage - damage
      }
      return {
        ...state,
        health: health,
        entitesArray: entites
      }

    case 'ADD_XP':
      return {
        ...state,
        xp: state.xp + 10
      }

    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
        dungeon: state.dungeon + 1
      }

    default:
      return state;
  }
}