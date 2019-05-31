/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// create playlist component

import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
// import { StackActions } from 'react-navigation';
import { createPlaylist, fetchPlaylists, fetchPlaylist } from '../actions';

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
      playlistSelected: false,
      loading: false,
      // search: '',
    };
  }

  onBackClick = () => {
    console.log('onBackClick');
  }

  resetState = () => {
    this.setState({
      name: '',
      genre: '',
      errorMessage: null,
      results: null,
      selected: '',
      genreFound: true,
      playlistSelected: false,
      loading: false,
    });
  }

  waitForCreatePlaylist = (location) => {
    return new Promise((resolve, reject) => {
      this.props.createPlaylist(this.state.selected, this.state.name, this.props.userId, location.coords.latitude, location.coords.longitude);
      resolve();
    });
  }

  onAddClick = (playlist) => {
    // console.log('onAddClick');
    if (this.state.playlistSelected && this.state.name.trim !== '') {
      this.setState({ loading: true });
    }

    Permissions.askAsync(Permissions.LOCATION).then((response) => {
      // if location services permissions are on, start watching position
      // else, set error message state
      if (response.status === 'granted') {
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }).then((location) => {
          console.log('creating playlist with location', location);
          // uri of selected playlist goes in below line
          if (this.state.playlistSelected && this.state.name.trim !== '') {
            // await this.props.createPlaylist(this.state.selected, this.state.name, this.props.userId, location.coords.latitude, location.coords.longitude);
            // this.waitForCreatePlaylist(location).then(() => {
            //   this.resetState();
            //   this.props.fetchPlaylists();
            //   console.log('CREATE PLAYLIST id to fetch', this.props.currentId);
            //   this.props.fetchPlaylist(this.props.currentId);
            //   this.props.navigation.navigate('Playlist', { id: this.props.currentId });
            // });
            this.props.createPlaylist(this.state.selected, this.state.name, this.props.userId, location.coords.latitude, location.coords.longitude).then((playlistId) => {
              this.resetState();
              this.props.fetchPlaylists();
              console.log('CREATE PLAYLIST id to fetch', playlistId);
              this.props.fetchPlaylist(playlistId);
              this.props.navigation.navigate('Playlist', { id: playlistId });
            });
          }
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
    this.setState({ name: text });
  }

  onGenreChange = (text) => {
    const lower = text.toLowerCase();
    this.setState({ genre: lower, playlistSelected: false });
    console.log(this.state.genre);
  }

  onPlaylistPress = (id, name) => {
    // console.log('on Playlist Press');
    this.setState({ selected: id, genre: name, playlistSelected: true }, () => {
      // console.log(`on Playlist Press name ${name}`);
      // console.log(`on Playlist Press genre ${this.state.genre}`);
    });

    // this.setState({
    //   selected: id,
    //   genre: name,
    // });
  }

  // eslint-disable-next-line consistent-return
  resultsRender = () => {
    if (this.state.results !== null) {
      return this.state.results.map((song, key) => {
        // eslint-disable-next-line react/no-array-index-key
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TouchableOpacity key={key} onPress={() => this.onPlaylistPress(song.id, song.name)}>
            <Text style={styles.buttonText}>{song.name}</Text>
          </TouchableOpacity>
        );
      });
    }
    if (this.state.genreFound === false) {
      return (<Text style={styles.buttonText}>This genre is not found!</Text>);
    }
  }

  onGenreSearchClick = () => {
    const API_PLAYLIST_URL = 'https://api.spotify.com/v1/browse/categories';

    const params = {
      country: 'US',
      limit: 5,
    };

    // console.log('bout to do genre search api call');
    axios.get(`${API_PLAYLIST_URL}/${this.state.genre}/playlists`, { headers: { authorization: `Bearer ${this.props.token}` }, params })
      .then((response) => {
        this.setState({ results: response.data.playlists.items });
      })
      .catch((error) => {
        this.setState({ genreFound: false });
      });
  }

  renderLoading = () => {
    if (this.state.loading) {
      return <Text style={styles.loadingMsg}>Creating playlist...</Text>;
    } else {
      return <View />;
    }
  }

  renderFormValidation = () => {
    if (!this.state.playlistSelected || this.state.name === '') {
      return <Text>Please search for and select a genre.</Text>;
    } else {
      return <View />;
    }
  }

  render() {
    if (this.state.results !== null) {
      // console.log(this.state.results);
    }
    if (this.props.message !== undefined) {
      console.log('message', this.props.message);
    }

    console.log('loading', this.state.loading);

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../img/background.png')} style={styles.backgroundImage}>
          <View id="top">
            <Text style={styles.top}>
                    Create a Playlist
            </Text>
          </View>
          <View id="info" style={styles.info}>
            <TextInput
              placeholder="playlist name"
              onChangeText={this.onNameChange}
              value={this.state.name}
              style={styles.input}
            />
            <View style={styles.iconinput}>
              <TextInput
                placeholder="playlist genre"
                onChangeText={this.onGenreChange}
                style={styles.inputinside}
                value={this.state.genre}
              />
              <Ionicons style={styles.icon} name="ios-search" onPress={this.onGenreSearchClick} size={30} />
            </View>
            <ScrollView id="results" style={styles.results}>
              {
                this.resultsRender()
              }
            </ScrollView>
          </View>
          <TouchableOpacity onPress={this.onAddClick} style={styles.button}>
            <Text style={styles.buttontext}>add</Text>
          </TouchableOpacity>
          {this.renderLoading()}
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
    currentId: reduxState.playlists.currentId,
  };
}

const mapDispatchToProps = {
  createPlaylist,
  fetchPlaylists,
  fetchPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);

const styles = StyleSheet.create({
  top: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '20%',
    marginBottom: 0,
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
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#1DB5E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 130,
    height: 40,
    padding: 10,
    marginTop: 30,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: '#000000',
    borderWidth: 3,
    marginTop: 25,
    marginBottom: 0,
    backgroundColor: 'white',
    textAlign: 'center',
    shadowColor: '#E31688',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  inputinside: {
    flex: 1,
    height: 60,
    borderColor: '#000000',
    borderWidth: 3,
    marginTop: 40,
    backgroundColor: 'white',
    textAlign: 'center',
    shadowColor: '#E31688',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    zIndex: 3,
  },
  playlistButton: {
    flex: 0,
    justifyContent: 'center',
    width: 330,
    height: 50,
    margin: 15,
    backgroundColor: '#E31688',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 22,
  },
  info: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconinput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 'auto',
    height: 60,
    paddingLeft: 5,
    paddingRight: 9,
    paddingTop: 12,
    marginTop: 40,
    color: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    shadowColor: '#E31688',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    zIndex: 1,
  },
  results: {
    backgroundColor: 'white',
    width: '100%',
  },
  loadingMsg: {
    paddingTop: 20,
    fontWeight: 'bold',
  },
});
