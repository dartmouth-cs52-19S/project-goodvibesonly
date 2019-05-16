import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './src/containers/Profile';
import Playlist from './src/containers/Playlist';
import Login from './src/containers/Login';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Good Vibes Only Main App Component!</Text>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

// These tabs are not the final ones, just to test each screen
const TabNavigator = createBottomTabNavigator({
  Playlist,
  Profile,
  Login,
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
