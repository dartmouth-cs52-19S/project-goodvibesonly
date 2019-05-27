/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
// profile component

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Songbar from './Songbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      userId: '',
    };
    this.viewPlaylist = this.viewPlaylist.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
  }

  componentDidMount() {
    // const USER_ID_URL = 'https://api.spotify.com/v1/me';

    // // get the user's username
    // axios.get(`${USER_ID_URL}`, { headers: { authorization: `Bearer ${this.props.token}` } })
    //   .then((response) => {
    //     this.setState({ userId: response.data.id });
    //     console.log(`userId from spotify pls work: ${this.state.userId}`);
    //   })
    //   .catch((error) => {
    //     console.log(`ERROR 1 ${error}`);
    //   });

    // const API_PLAYLIST_URL = 'https://api.spotify.com/v1/users';
    const API_PLAYLIST_URL = 'https://api.spotify.com/v1/me/playlists';
    const params = {
      limit: 15,
      offset: 0,
    };

    // get the playlists from the username
    axios.get(`${API_PLAYLIST_URL}`, { headers: { authorization: `Bearer ${this.props.token}` }, params })
      .then((response) => {
        this.setState({ playlists: response.data.items });
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  onHomeClick() {
    console.log('onHomeClick');
    let i;
    for (i = 0; i < this.state.playlists.length; i++) {
      // these are all the names of my playlists!!
      console.log(this.state.playlists[i].name);
    }
  }

  onUserClick() {
    console.log('onUserClick');
  }

  onSettingsClick() {
    console.log('onSettingsClick');
  }

  viewPlaylist() {
    this.props.navigation.navigate('Playlist');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>
            My Playlists...
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.onHomeClick} style={styles.playlistButton1}>
            <Text style={styles.buttonText}>Playlist 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton2}>
            <Text style={styles.buttonText}>Playlist 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton3}>
            <Text style={styles.buttonText}>Playlist 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.viewPlaylist} style={styles.playlistButton4}>
            <Text style={styles.buttonText}>Playlist 4</Text>
          </TouchableOpacity>
        </View>
        <Songbar />
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    userId: reduxState.auth.userId,
    token: reduxState.auth.token,
  };
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 30,
    textAlign: 'left',
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  playlistButton1: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#1DB5E5',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  playlistButton2: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#E31688',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  playlistButton3: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#F7EB58',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  playlistButton4: {
    flex: 0,
    width: 300,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#907CFD',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
