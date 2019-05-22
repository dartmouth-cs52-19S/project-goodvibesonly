import { ActionTypes } from '../actions';

const PlaylistReducer = (state = { all: [], current: '' }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYLISTS:
      return Object.assign({}, state, { all: action.payload.all });
    case ActionTypes.FETCH_PLAYLIST:
      return Object.assign({}, state, { current: action.payload.current });
    default:
      return state;
  }
};

export default PlaylistReducer;
