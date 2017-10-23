import { store } from '../store';

export default {
  createMap: function([c, r]) {
    let mapArray = [...store.getState().mapArray];
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