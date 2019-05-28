/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
// profile component

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Songbar from './Songbar';
import { fetchPlaylist } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      userId: '',
    };
    // this.viewPlaylist = this.viewPlaylist.bind(this);
    // this.onHomeClick = this.onHomeClick.bind(this);
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

  // onHomeClick() {
  //   console.log('onHomeClick');
  //   let i;
  //   for (i = 0; i < this.state.playlists.length; i++) {
  //     // these are all the names of my playlists!!
  //     console.log(this.state.playlists[i].name);
  //   }
  // }

  selectPlaylist = (playlist) => {
    // pass in video into this.props.navigation.state.params.video in navigated view
    this.props.fetchPlaylist(playlist._id);
    this.props.navigation.navigate('Playlist');
  }

  renderPlaylist = (playlist, key) => {
    // console.log(track);
    return (
      <TouchableOpacity key={key} style={styles.playlistButton1} onPress={() => { this.selectPlaylist(playlist); }}>
        <View>
          <Text style={styles.buttonText}>{playlist.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderAllPlaylists = () => {
    if (this.state.playlists === null) {
      return <Text>Loading</Text>;
    } else if (this.state.playlists.length === 0) {
      return <Text>No Playlists Yet</Text>;
    } else {
      return (
        this.state.playlists.map((playlist, key) => {
          return this.renderPlaylist(playlist, key);
        })
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>
            My Playlists...
          </Text>
        </View>
        <ScrollView style={styles.results}>
          {this.renderAllPlaylists()}
        </ScrollView>
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

const mapDispatchToProps = {
  fetchPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    flexGrow: 2,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  top: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 10,
    marginTop: 30,
  },
  playlistButton1: {
    flex: 0,
    justifyContent: 'center',
    width: 330,
    height: 50,
    margin: 15,
    backgroundColor: '#1DB5E5',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playlistButton2: {
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
  playlistButton3: {
    flex: 0,
    justifyContent: 'center',
    width: 330,
    height: 50,
    margin: 15,
    backgroundColor: '#F7EB58',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playlistButton4: {
    flex: 0,
    justifyContent: 'center',
    width: 330,
    height: 50,
    margin: 15,
    backgroundColor: '#907CFD',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  results: {
    height: '75%',
  },
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
