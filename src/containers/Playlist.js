/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, Button,
} from 'react-native';

class Playlist extends Component {
  constructor(props) {
    super();
    this.state = {
      songs: [],
    };
  }

  onBackClick() {
    console.log('onBackClick');
    console.log(this.state.songs);
  }

  onAddClick() {
    console.log('onAddClick');
  }

  render() {
    return (
      <View>
        <View id="top">
          <Button title="back" onPress={this.onAddClick} />
          <Text>
                    Playlist Title
            {'\n'}
                    Location
          </Text>
        </View>
        <View id="songList">
          <Text>
                    Song 1
            {'\n'}
            {'\n'}
                    Song 2
            {'\n'}
            {'\n'}
                    Song 3
          </Text>
        </View>
        <View id="songBar">
          <Text>
                    Song Bar Here
          </Text>
        </View>
        <Button title="add" onPress={this.onAddClick} />
      </View>
    );
  }
}

export default Playlist;
