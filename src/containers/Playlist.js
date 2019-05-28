/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  fetchPlaylist, sendPlaySong, sendPlayPlaylist, fetchLocation,
} from '../actions';
import Songbar from './Songbar';

class Playlist extends Component {
  constructor(props) {
    super();
    this.state = {
      songs: [],
    };

    this.fillInLocation = this.fillInLocation.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSongClick = this.onSongClick.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
  }

  componentDidMount() {
    console.log('component did mount called');
    console.log('current id', this.props.currentId);
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

  onPlay(playlistid) {
    this.props.sendPlayPlaylist(this.props.token, playlistid);
  }

  fillInLocation() {
    console.log('current playlist', this.props.current.location);

    if (this.props.current.location) {
      console.log(this.props.current.location[0]);
      console.log(this.props.current.location[1]);
      console.log(`${this.props.current.location[0]}, ${this.props.current.location[1]}`);

      this.props.fetchLocation(`${this.props.current.location[0]}, ${this.props.current.location[1]}`);
      return this.props.location;
    }
  }

  // eslint-disable-next-line consistent-return
  renderSongs() {
    if (this.props.current.songs) {
      let key_value = 0;
      return (
        <ScrollView style={styles.allSongs}>
          { this.props.current.songs.map((song) => {
            if (song) {
              key_value += 1;
              return (
                // Referenced https://stackoverflow.com/questions/43017807/react-native-onpress-binding-with-an-argument to figure out how to pass an argument to my onPress function
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
        </ScrollView>
      );
    }
  }
  // comment

  render() {
    // console.log('current playlist', this.props.current);
    // console.log(this.songs);
    // console.log('current playlist', this.props.current);
    // console.log('current id', this.props.currentId);
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.top}>
            <Text style={styles.topfont}>
              {this.props.current.title}
            </Text>
            <Ionicons style={styles.button} name="ios-play" onPress={() => this.onPlay(this.props.currentId)} />
          </View>
          <Text style={styles.loc}>
            {this.fillInLocation()}
          </Text>
        </View>
        {this.renderSongs()}
        <TouchableOpacity onPress={this.onAddClick} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>add a song</Text>
        </TouchableOpacity>
        <Songbar />
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
    location: reduxState.playlists.location,
  };
}

const mapDispatchToProps = {
  fetchPlaylist, sendPlaySong, sendPlayPlaylist, fetchLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    width: 330,
    marginTop: 30,
  },
  allSongs: {
    width: 330,
    marginTop: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#E31688',
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    padding: 5,
  },
  topfont: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  loc: {
    textAlign: 'left',
    marginTop: 5,
    fontWeight: 'bold',
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
    marginBottom: 5,
  },
  bottomButton: {
    flex: 0,
    width: 130,
    height: 40,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#1DB5E5',
    shadowColor: 'black',
    shadowOffset: { height: 3, width: -3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  button: {
    color: 'black',
    fontSize: 40,
    marginRight: 5,
  },
});
