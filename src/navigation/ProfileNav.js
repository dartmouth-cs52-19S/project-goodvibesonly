/* eslint-disable comma-dangle */
import { createStackNavigator } from 'react-navigation';
import Profile from '../containers/Profile';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  Profile: {
    screen: Profile,
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
