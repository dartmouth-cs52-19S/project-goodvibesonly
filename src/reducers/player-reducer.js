import { ActionTypes } from '../actions';

const PlayerReducer = (state = { playstate: '' }, action) => {
  switch (action.type) {
    case ActionTypes.PLAYSTATE:
      return Object.assign({}, state, { playstate: action.payload.currentSong.item.name });
    case ActionTypes.PLAY:
      return Object.assign({}, state, { });
    case ActionTypes.PAUSE:
      return Object.assign({}, state, { });
    default:
      return state;
  }
};

export default PlayerReducer;
