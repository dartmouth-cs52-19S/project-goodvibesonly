import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Profile from './Profile';
import Playlist from './Playlist';
import Home from './Home';

const TabBar = createBottomTabNavigator({
  Home,
  Playlist,
  Profile,
}, {
  initialRouteName: 'Home',
});


export default createAppContainer(TabBar);
