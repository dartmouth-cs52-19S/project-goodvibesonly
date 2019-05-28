import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import PlaylistReducer from './playlist-reducer';
import PlayerReducer from './player-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  playlists: PlaylistReducer,
  player: PlayerReducer,
});

export default rootReducer;
