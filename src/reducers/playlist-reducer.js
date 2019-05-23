import { ActionTypes } from '../actions';

const PlaylistReducer = (state = {
  all: [], current: '', message: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYLISTS:
      return Object.assign({}, state, { all: action.payload.all, message: '' });
    case ActionTypes.FETCH_PLAYLIST:
      return Object.assign({}, state, { current: action.payload.current, message: '' });
    case ActionTypes.CREATE_PLAYLIST:
      return Object.assign({}, state, { message: action.payload.message });
    default:
      return state;
  }
};

export default PlaylistReducer;
