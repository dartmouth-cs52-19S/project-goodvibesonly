import { ActionTypes } from '../actions';

const PlayerReducer = (state = {
  playstate: '', intervalId: null, processId: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.PLAYSTATE:
      return Object.assign({}, state, { playstate: action.payload.currentSong.item.name });
    case ActionTypes.INTERVAL_ID:
      return Object.assign({}, state, { intervalId: action.payload.intervalId });
    case ActionTypes.PROCESS_ID:
      return Object.assign({}, state, { processId: action.payload.processId });
    default:
      return state;
  }
};

export default PlayerReducer;
