import { ActionTypes } from '../actions';

const SongReducer = (state = {
  artist: '', name: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SONG:
      return Object.assign({}, state, {
        artist: action.payload.song.artists[0].name,
        name: action.payload.song.name,
      });
    default:
      return state;
  }
};

export default SongReducer;
