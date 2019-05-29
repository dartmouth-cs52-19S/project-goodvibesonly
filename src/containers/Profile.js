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
import { fetchPlaylist, fetchPlaylists } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }

  selectPlaylist = (playlist) => {
    this.props.fetchPlaylist(playlist._id);
    this.props.navigation.navigate('Playlist');
  }

  renderPlaylist = (playlist, key, i) => {
    const colors = ['#1DB5E5', '#E31688', '#F7EB58', '#907CFD'];
    const rotate = [
      styles.playlistButton,
      { backgroundColor: colors[(i % 4)] },
    ];
    // console.log(track);
    return (
      <TouchableOpacity key={key} style={rotate} onPress={() => { this.selectPlaylist(playlist); }}>
        <View>
          <Text style={styles.buttonText}>{playlist.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderAllPlaylists = () => {
    this.state.playlists = [];
    let i = 0;
    let j = 0;
    for (i = 0; i < this.props.all.length; i++) {
      if (this.props.all[i].author === this.props.userId) {
        this.state.playlists.push(this.props.all[i]);
      }
    }

    if (this.state.playlists === null) {
      return <Text style={styles.innertext}>Loading</Text>;
    } else if (this.state.playlists.length === 0) {
      return <Text style={styles.innertext}>No Playlists Yet</Text>;
    } else {
      return (
        this.state.playlists.map((playlist, key) => {
          j += 1;
          return this.renderPlaylist(playlist, key, j);
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
    all: reduxState.playlists.all,
  };
}

const mapDispatchToProps = {
  fetchPlaylist,
  fetchPlaylists,
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
  playlistButton: {
    flex: 0,
    justifyContent: 'center',
    width: 330,
    height: 50,
    margin: 15,
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
  innertext: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
