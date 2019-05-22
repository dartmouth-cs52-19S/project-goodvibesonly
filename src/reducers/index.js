import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import PlaylistReducer from './playlist-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  playlists: PlaylistReducer,
});

export default rootReducer;
