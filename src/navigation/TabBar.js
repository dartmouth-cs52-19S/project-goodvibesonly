import { createAppContainer, createBottomTabNavigator, customTabs } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import ProfileNav from './ProfileNav';
import CreatePlaylistNav from './CreatePlaylistNav';
import HomeNav from './HomeNav';

const TabBar = createBottomTabNavigator({
  HomeNav: {
    screen: HomeNav,
    navigationOptions: {
      tabBarIcon: (<Ionicons size={30} name="ios-home" />),
    },

  },
  CreatePlaylistNav: {
    screen: CreatePlaylistNav,
    navigationOptions: {
      tabBarIcon: (<Ionicons size={40} name="ios-add" />),
    },

  },
  ProfileNav: {
    screen: ProfileNav,
    navigationOptions: {
      tabBarIcon: (<Ionicons size={30} name="ios-person" />),
    },

  },
},
{
  defaultNavigationOptions: customTabs,
  tabBarPosition: 'bottom',
  initialRouteName: 'HomeNav',
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: 'white',
      color: 'black',
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
    activeTabStyle: {
    },
  },
});


export default createAppContainer(TabBar);
