/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaylist, fetchSong, sendPlaySong } from '../actions';
import Songbar from './Songbar';

class Playlist extends Component {
  constructor(props) {
    super();
    this.state = {
      songs: [],
    };

    this.onAddClick = this.onAddClick.bind(this);
    this.onSongClick = this.onSongClick.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
  }

  componentDidMount() {
    console.log('component did mount called');
    console.log('current id', this.props.currentId);
    // Actual method call
    this.props.fetchPlaylist(this.props.currentId);

    // Hardcoded call
    // this.props.fetchPlaylist('5ce9c6668d16c400342d7241');
  }

  onBackClick() {
    console.log('onBackClick');
    console.log(this.state.songs);
  }

  onAddClick() {
    console.log('onAddClick');
    this.props.navigation.navigate('Song');
  }

  onSongClick(songid) {
    console.log('onSongClick');
    console.log(songid);
    this.props.sendPlaySong(this.props.token, songid);
  }

  renderSongs() {
    /*
    console.log('A SONG ID:');
    this.props.fetchSong('5Qel1sTrU4LM8HlJSPT2jd', this.props.token);
    */

    if (this.props.current.songs) {
      // console.log(song.name);
      // console.log(song.artist);
      // this.props.fetchSong(song.songid, this.props.token);
      let key_value = 0;
      return (
        <View style={styles.allSongs}>
          { this.props.current.songs.map((song) => {
            if (song) {
              key_value += 1;
              return (
                // Referenced https://stackoverflow.com/questions/43017807/react-native-onpress-binding-with-an-argument to figure out how to pass an argument to my onPress function
                // Also referenced: https://stackoverflow.com/questions/34576332/warning-each-child-in-an-array-or-iterator-should-have-a-unique-key-prop-che/43791255 to fix a warning error that was popping up due to non-unique keys
                <TouchableOpacity onPress={() => this.onSongClick(song.songid)} key={key_value}>
                  <Text style={styles.songTitle}>
                    {song.name}
                  </Text>
                  <Text style={styles.artistTitle}>
                    {song.artist}
                  </Text>
                </TouchableOpacity>

              );
            }
          })
      }
        </View>
      );
    }
  }

  render() {
    // console.log('current playlist', this.props.current);
    // console.log(this.songs);
    console.log('current playlist', this.props.current);
    console.log('current id', this.props.currentId);
    return (
      <View style={styles.container}>
        <Text style={styles.top}>
          {this.props.current.title}
        </Text>
        <Text style={styles.loc}>
          TODO: FILL IN LOCATION INFORMATION
        </Text>

        {this.renderSongs()}

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
    token: reduxState.auth.token,
    artist: reduxState.song.artist,
    name: reduxState.song.name,
  };
}

const mapDispatchToProps = {
  fetchPlaylist, fetchSong, sendPlaySong,
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
