import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import PlaylistReducer from './playlist-reducer';
import PlayerReducer from './player-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  playlists: PlaylistReducer,
  player: PlayerReducer,
});

export default rootReducer;
