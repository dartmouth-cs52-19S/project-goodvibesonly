/* eslint-disable react/destructuring-assignment */
// profile component

import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   playlists: [],
    // };
    this.viewPlaylist = this.viewPlaylist.bind(this);
  }

  onHomeClick() {
    console.log('onHomeClick');
    // console.log(this.state.playlists);
  }

  onUserClick() {
    console.log('onUserClick');
  }

  onSettingsClick() {
    console.log('onSettingsClick');
  }

  viewPlaylist() {
    this.props.navigation.navigate('Playlist');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text>
                    My Playlists...
          </Text>
        </View>
        <View style={styles.container3}>
          <Button title="playlist" onPress={this.viewPlaylist} />
          <Text> Playlist 1 </Text>
          <Text> Playlist 2 </Text>
          <Text> Playlist 3 </Text>
        </View>
        <View id="songBar">
          <Text>
                    Song Bar Here
          </Text>
        </View>
        <View style={styles.container4}>
          <Button title="user" onPress={this.onUserClick} />
          <Button title="settings" onPress={this.onSettingsClick} />
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container4: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
