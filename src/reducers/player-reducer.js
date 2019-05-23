import { ActionTypes } from '../actions';

const PlayerReducer = (state = { playstate: '', isPlaying: null }, action) => {
  switch (action.type) {
    case ActionTypes.PLAYSTATE:
      return Object.assign({}, state, { playstate: action.payload });
    case ActionTypes.PLAY:
      return Object.assign({}, state, { isPlaying: true });
    case ActionTypes.PAUSE:
      return Object.assign({}, state, { isPlaying: false });
    default:
      return state;
  }
};

export default PlayerReducer;
