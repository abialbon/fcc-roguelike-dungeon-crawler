
export default function mapReducer (state, action) {
  switch (action.type) {
    case 'CREATE_MAP':
      return {
        ...action.payload
      }

    default:
      return state;
  }
}