/* eslint-disable comma-dangle */
import { createStackNavigator } from 'react-navigation';
import CreatePlaylist from '../containers/CreatePlaylist';
import Playlist from '../containers/Playlist';
import Song from '../containers/Song';

const HomeNav = createStackNavigator({
  // keys are the names of the "routes"
  CreatePlaylist: {
    screen: CreatePlaylist,
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
