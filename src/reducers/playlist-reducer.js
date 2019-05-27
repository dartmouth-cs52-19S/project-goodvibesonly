import { ActionTypes } from '../actions';

const PlaylistReducer = (state = {
  all: [], current: '', currentId: null, message: '', playstate: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYLISTS:
      return Object.assign({}, state, { all: action.payload.all });
    case ActionTypes.FETCH_PLAYLIST:
      return Object.assign({}, state, { current: action.payload.current, currentId: action.payload.current._id });
    case ActionTypes.CREATE_PLAYLIST:
      return Object.assign({}, state, { message: action.payload.message, currentId: action.payload.playlistId });
    default:
      return state;
  }
};

export default PlaylistReducer;
