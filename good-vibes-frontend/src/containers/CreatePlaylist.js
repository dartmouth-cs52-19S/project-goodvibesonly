// create playlist component

import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
        name: '',
        genre: '',
    };
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
    }

    onNameChange(event) {
        console.log('onGenreChange');
        this.setState({ genre: event.target.value });
    }

  render() {
    return (
        <View>
            <View id="top">
                <Button title="back" onPress={this.onBackClick}/>
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
            <Button title="add" onPress={this.onAddClick}/>
        </View>
    );
  }
}

export default CreatePlaylist;