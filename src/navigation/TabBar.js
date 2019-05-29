import { createAppContainer, createBottomTabNavigator, customTabs } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
// import ProfileNav from './ProfileNav';
// import CreatePlaylistNav from './CreatePlaylistNav';
import HomeNav from './HomeNav';
// import Home from '../containers/Home';
import CreatePlaylist from '../containers/CreatePlaylist';
import Profile from '../containers/Profile';

const TabBar = createBottomTabNavigator({
  HomeNav: {
    screen: HomeNav,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={30} color={tintColor} name="ios-home" />,
    },

  },
  CreatePlaylistNav: {
    screen: CreatePlaylist,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={40} color={tintColor} name="ios-add" />,
    },
  },
  ProfileNav: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={30} color={tintColor} name="ios-person" />,
    },
  },
},
{
  defaultNavigationOptions: customTabs,
  tabBarPosition: 'bottom',
  initialRouteName: 'HomeNav',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    showLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopColor: 'transparent',
      height: 60,
    },
    tabStyle: {
      backgroundColor: '#1DB5E5',
      shadowColor: 'black',
      shadowOffset: { height: 5, width: -5 },
      shadowOpacity: 1,
      shadowRadius: 0,
      marginLeft: 12,
      marginRight: 7,
      marginBottom: 12,
    },
  },
});


export default createAppContainer(TabBar);
