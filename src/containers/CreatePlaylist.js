/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    console.log('onAddClick');
    this.props.navigation.navigate('Playlist');
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
      <View style={styles.container}>
        <ImageBackground source={require('../img/Create.png')} style={styles.backgroundImage}>
          <View id="top">
            <Text style={styles.top}>
                    Create a Playlist
            </Text>
          </View>
          <View id="info" style={styles.info}>
            <TextInput
              placeholder="playlistname"
              onChange={this.onNameChange}
              style={styles.input}
            />
            <TextInput
              placeholder="playlistgenre"
              onChange={this.onGenreChange}
              style={styles.input}
            />
          </View>

          <View id="results">
            {/* <Text>
              Results list here
            </Text> */}
          </View>
          <TouchableOpacity onPress={this.onAddClick} style={styles.button}>
            <Text>add</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#1DB5E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 130,
    height: 40,
    padding: 10,
  },
  input: {
    height: 60,
    width: 200,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 30,
    textAlign: 'center',
  },
  info: {
    padding: 30,
  },
});

export default CreatePlaylist;
