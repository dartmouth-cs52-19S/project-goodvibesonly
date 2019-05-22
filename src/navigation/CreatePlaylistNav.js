import { createStackNavigator } from 'react-navigation';
import CreatePlaylist from '../containers/CreatePlaylist';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  CreatePlaylist,
  Playlist,
  Song,
});

export default HomeNav;
