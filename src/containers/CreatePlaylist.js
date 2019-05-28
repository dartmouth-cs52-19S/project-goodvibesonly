/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image, Button,
} from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { createPlaylist, fetchPlaylists } from '../actions';

class CreatePlaylist extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
      errorMessage: null,
      results: null,
      selected: '',
      genreFound: true,
    };
  }

  onBackClick = () => {
    console.log('onBackClick');
  }

  onAddClick = (playlist) => {
    console.log('onAddClick');
    Permissions.askAsync(Permissions.LOCATION).then((response) => {
      // if location services permissions are on, start watching position
      // else, set error message state
      if (response.status === 'granted') {
        console.log('in granted ask async');
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }).then((location) => {
          // console.log('creating playlist with location', location);
          // uri of selected playlist goes in below line
          this.props.createPlaylist(this.state.selected, this.state.name, this.props.userId, location.coords.latitude, location.coords.longitude);
          this.props.fetchPlaylists();
          this.props.navigation.navigate('Playlist');
        }).catch((error) => {
          console.log('error in onAddClick');
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
    const lower = text.toLowerCase();
    this.setState({ genre: lower });
    console.log(lower);
    console.log(this.state.genre);
  }

  onPlaylistPress = (id) => {
    console.log('on Playlist Press');
    this.setState({ selected: id });
  }

  // eslint-disable-next-line consistent-return
  resultsRender = () => {
    if (this.state.results !== null) {
      return this.state.results.map((song, key) => {
        // eslint-disable-next-line react/no-array-index-key
        return (<Button title={song.name} key={key} onPress={() => this.onPlaylistPress(song.id)} />);
      });
    }
    if (this.state.genreFound === false) {
      return (<Text>This genre is not found!</Text>);
    }
  }

  onGenreSearchClick = () => {
    const API_PLAYLIST_URL = 'https://api.spotify.com/v1/browse/categories';

    const params = {
      country: 'US',
      limit: 5,
    };

    console.log('bout to do genre search api call');
    axios.get(`${API_PLAYLIST_URL}/${this.state.genre}/playlists`, { headers: { authorization: `Bearer ${this.props.token}` }, params })
      .then((response) => {
        this.setState({ results: response.data.playlists.items });
      })
      .catch((error) => {
        this.setState({ genreFound: false });
      });
  }

  render() {
    if (this.state.results !== null) {
      console.log(this.state.results);
    }
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
          <TouchableOpacity onPress={this.onGenreSearchClick} style={styles.searchButton}>
            <Image
              source={require('../img/search.png')}
            />
          </TouchableOpacity>

          <View id="results">
            {

              this.resultsRender()
            }
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
    token: reduxState.auth.token,
  };
}

const mapDispatchToProps = {
  createPlaylist,
  fetchPlaylists,
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
    shadowRadius: 0,
  },
  info: {
    padding: 30,
  },
});
