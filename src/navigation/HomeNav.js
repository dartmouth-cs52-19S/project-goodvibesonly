/* eslint-disable comma-dangle */
import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Playlist: {
    screen: Playlist,
    navigationOptions: {
      header: null,
    }
  },
  Song: {
    screen: Song,
    navigationOptions: {
      header: null,
    }
  },
});

export default HomeNav;
