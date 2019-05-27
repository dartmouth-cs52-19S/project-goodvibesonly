/* eslint-disable react/destructuring-assignment */
// profile component

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Songbar from './Songbar';

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
        <View style={styles.top}>
          <Text style={styles.topText}>
            My Playlists...
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton1}>
            <Text style={styles.buttonText}>Playlist 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton2}>
            <Text style={styles.buttonText}>Playlist 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton3}>
            <Text style={styles.buttonText}>Playlist 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton4}>
            <Text style={styles.buttonText}>Playlist 4</Text>
          </TouchableOpacity>
        </View>
        <Songbar />
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
  topText: {
    fontSize: 30,
    textAlign: 'left',
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  playlistButton1: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#1DB5E5',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playlistButton2: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#E31688',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playlistButton3: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#F7EB58',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playlistButton4: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#907CFD',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
