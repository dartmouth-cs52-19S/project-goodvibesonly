import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import ProfileNav from './ProfileNav';
import CreatePlaylistNav from './CreatePlaylistNav';
import HomeNav from './HomeNav';

const TabBar = createBottomTabNavigator({
  HomeNav,
  CreatePlaylistNav,
  ProfileNav,
}, {
  initialRouteName: 'HomeNav',
});


export default createAppContainer(TabBar);
