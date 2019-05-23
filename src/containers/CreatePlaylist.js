/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { createPlaylist } from '../actions';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#1DB5E5',
    fontFamily: '',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '-4px 4px 0px #000000',
  },
});

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

function mapStateToProps(reduxState) {
  return {
    message: reduxState.playlists.message,
  };
}

const mapDispatchToProps = {
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
