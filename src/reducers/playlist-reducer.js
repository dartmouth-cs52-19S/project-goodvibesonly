import { ActionTypes } from '../actions';

const PlaylistReducer = (state = { all: [], current: '', playstate: '' }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYLISTS:
      return Object.assign({}, state, { all: action.payload.all });
    case ActionTypes.FETCH_PLAYLIST:
      return Object.assign({}, state, { current: action.payload.current });
    case ActionTypes.PLAYSTATE:
      return Object.assign({}, state, { playstate: action.payload });
    default:
      return state;
  }
};

export default PlaylistReducer;
