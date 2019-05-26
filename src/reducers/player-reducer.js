import { ActionTypes } from '../actions';

const PlayerReducer = (state = { playstate: '', isPlaying: null }, action) => {
  switch (action.type) {
    case ActionTypes.PLAYSTATE:
      return Object.assign({}, state, { playstate: action.payload });
    case ActionTypes.PLAY:
      return { isPlaying: true };
    case ActionTypes.PAUSE:
      return { isPlaying: false };
    default:
      return state;
  }
};

export default PlayerReducer;
