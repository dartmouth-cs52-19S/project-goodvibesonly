/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { createPlaylist } from '../actions';

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
    };
  }

  onBackClick = () => {
    console.log('onBackClick');
  }

  onAddClick = () => {
    console.log('onAddClick');
    console.log('name state var', this.state.name);
    // this.props.navigation.navigate('Playlist');
    this.props.createPlaylist('37i9dQZF1DXcBWIGoYBM5M', this.state.name);
  }

  onNameChange = (text) => {
    console.log('onSearchChange');
    this.setState({ name: text });
    console.log(text);
  }

  onGenreChange = (text) => {
    console.log('onGenreChange');
    this.setState({ genre: text });
    console.log(text);
    console.log(this.state.genre);
  }

  render() {
    if (this.props.message !== undefined) {
      console.log('message', this.props.message);
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../img/Create.png')} style={styles.backgroundImage}>
          <View id="top">
            <Text style={styles.top}>
                    Create a Playlist
            </Text>
          </View>
          <View id="info">
            <TextInput
              placeholder="playlistname"
              onChangeText={this.onNameChange}
              style={styles.input}
            />
            <TextInput
              placeholder="playlistgenre"
              onChangeText={this.onGenreChange}
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

function mapStateToProps(reduxState) {
  return {
    message: reduxState.playlists.message,
  };
}

const mapDispatchToProps = {
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);

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
