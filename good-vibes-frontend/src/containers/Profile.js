// profile component

import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      playlists: [],
    };
  }
  createPlaylistClick() {
      console.log('createPlaylistClick')
  }
  onHomeClick() {
      console.log('onHomeClick')
  }
  onUserClick() {
      console.log('onUserClick')
  }  
  onSettingsClick() {
      console.log('onSettingsClick')
  }

  render() {
    return (
        <View>
            <View id="top">
                <Text>
                    My Playlists...
                </Text>
                <Button title="Add" onPress={this.createPlaylistClick} className="fas fa-pencil-alt" />
            </View>
            <View id="playlist">
                <Text>
                    Playlist 1
                    {"\n"}
                    {"\n"}
                    Playlist 2
                    {"\n"}
                    {"\n"}
                    Playlist 3
                </Text>
            </View>
            <View id="songBar">
                <Text>
                    Song Bar Here
                </Text>
            </View>
            <View id="bottomButtons">
                <Button title="home" onPress={this.onHomeClick}/>
                <Button title="user" onPress={this.onUserClick}/>
                <Button title="settings" onPress={this.onSettingsClick}/>
            </View>
        </View>
    );
  }
}

export default Profile;