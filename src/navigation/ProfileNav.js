import { createStackNavigator } from 'react-navigation';
import Profile from '../containers/Profile';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  Profile,
  Playlist,
  Song,
});

export default HomeNav;
