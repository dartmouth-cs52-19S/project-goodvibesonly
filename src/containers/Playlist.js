/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaylist } from '../actions';
import Songbar from './Songbar';

class Playlist extends Component {
  constructor(props) {
    super();
    this.state = {
      songs: [],
    };

    this.onAddClick = this.onAddClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlaylist(this.props.currentId);
  }

  onBackClick() {
    console.log('onBackClick');
    console.log(this.state.songs);
  }

  onAddClick() {
    console.log('onAddClick');
    this.props.navigation.navigate('Song');
  }

  render() {
    console.log('current playlist', this.props.current);
    return (
      <View style={styles.container}>
        <Text style={styles.top}>
          Formal Playlist
        </Text>
        <Text style={styles.loc}>
          10 West Wheelock, Hanover NH 03755
        </Text>
        <View style={styles.allSongs}>
          <View style={styles.song}>
            <Text style={styles.songTitle}>
            Knee Deep (feat. Jimmy Buffett)
            </Text>
            <Text style={styles.artistTitle}>
            Zac Brown Band
            </Text>
          </View>
          <View style={styles.song}>
            <Text style={styles.songTitle}>
            Rivers and Roads
            </Text>
            <Text style={styles.artistTitle}>
            The Head and the Heart
            </Text>
          </View>
          <View style={styles.song}>
            <Text style={styles.songTitle}>
            Take It Easy - 2013 Remaster
            </Text>
            <Text style={styles.artistTitle}>
            Eagles
            </Text>
          </View>
        </View>
        <Songbar />
        <TouchableOpacity onPress={this.onAddClick} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>add a song</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentId: reduxState.playlists.currentId,
    current: reduxState.playlists.current,
  };
}

const mapDispatchToProps = {
  fetchPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allSongs: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  top: {
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
    shadowRadius: 0,
    fontWeight: 'bold',
    fontSize: 30,
    padding: 5,
  },
  loc: {
    textAlign: 'left',
  },
  song: {
    backgroundColor: 'white',
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  artistTitle: {
    fontSize: 10,
  },
  bottomButton: {
    flex: 0,
    width: 300,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 15,
    backgroundColor: '#1DB5E5',
    shadowColor: 'black',
    shadowOffset: { height: 3, width: -3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  bottomButtonText: {
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
  },
});
