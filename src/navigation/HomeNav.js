import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  Home,
  Playlist,
  Song,
});

export default HomeNav;
