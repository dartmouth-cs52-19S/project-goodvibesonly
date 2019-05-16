/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  View, Text, Button, TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#1DB5E5',
    fontFamily: '',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '-4px 4px 0px #000000',
  },
});

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
  }

  onBackClick() {
    console.log('onBackClick');
  }

  onAddClick() {
    console.log('onAddClick');
  }

  onNameChange(event) {
    console.log('onSearchChange');
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  }

  onGenreChange(event) {
    console.log('onGenreChange');
    this.setState({ genre: event.target.value });
    console.log(this.state.genre);
  }

  render() {
    return (
      <View>
        <View id="top">
          <Button title="back" onPress={this.onBackClick} style={styles.button} />
          <Text>
                    Create a Playlist
          </Text>
        </View>
        <View id="info">
          <TextInput
            placeholder="playlistname"
            onChangeText={this.onNameChange}
          />
          <TextInput
            placeholder="playlistgenre"
            onChangeText={this.onGenreChange}
          />
        </View>

        <View id="results">
          <Text>
                    Results list here
          </Text>
        </View>
        <Button title="add" onPress={this.onAddClick} style={styles.button} />
      </View>
    );
  }
}

export default CreatePlaylist;
