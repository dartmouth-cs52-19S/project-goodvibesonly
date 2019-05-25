/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import { createPlaylist } from '../actions';

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
      errorMessage: null,
    };
  }

  onBackClick = () => {
    console.log('onBackClick');
  }

  onAddClick = () => {
    console.log('onAddClick');
    Permissions.askAsync(Permissions.LOCATION).then((response) => {
      // if location services permissions are on, start watching position
      // else, set error message state
      if (response.status === 'granted') {
        console.log('in granted ask async');
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }).then((location) => {
          console.log('creating playlist with location', location);
          this.props.createPlaylist('37i9dQZF1DXcBWIGoYBM5M', this.state.name, this.props.userId, location.coords.latitude, location.coords.longitude);
          this.props.navigation.navigate('Playlist');
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('permission denied');
        this.setState({ errorMessage: 'app does not have location permissions' });
      }
    });
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

    console.log(this.state.errorMessage);

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
    userId: reduxState.auth.userId,
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
    backgroundColor: 'white',
    textAlign: 'center',
    shadowColor: '#E31688',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  info: {
    padding: 30,
  },
});
