import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './src/containers/Profile';
import Playlist from './src/containers/Playlist';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Good Vibes Only Main Component!</Text>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
