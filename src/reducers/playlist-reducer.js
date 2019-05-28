import { ActionTypes } from '../actions';

const PlaylistReducer = (state = {
  all: null, current: '', currentId: null, message: '', playstate: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LOCATION:
      return Object.assign({}, state, { location: action.payload.location });
    case ActionTypes.FETCH_PLAYLISTS:
      return Object.assign({}, state, { all: action.payload.all });
    case ActionTypes.FETCH_PLAYLIST:
      return Object.assign({}, state, { current: action.payload.current, currentId: action.payload.current._id });
    case ActionTypes.CREATE_PLAYLIST:
      return Object.assign({}, state, { message: action.payload.message, currentId: action.payload.playlistId, current: action.payload.playlist });
    default:
      return state;
  }
};

export default PlaylistReducer;
