import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Profile from './Profile';
import CreatePlaylist from './CreatePlaylist';
import Home from './Home';

const TabBar = createBottomTabNavigator({
  Home,
  CreatePlaylist,
  Profile,
}, {
  initialRouteName: 'Home',
});


export default createAppContainer(TabBar);
