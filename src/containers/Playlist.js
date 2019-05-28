/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaylist, fetchSong } from '../actions';
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
<<<<<<< HEAD
    // Actual method call
    this.props.fetchPlaylist(this.props.currentId);

    // Hardcoded call
    // this.props.fetchPlaylist('5ce9c6668d16c400342d7241');
=======
>>>>>>> beb37e79bea72363143a176032c6df74a44a7f41
  }

  onBackClick() {
    console.log('onBackClick');
    console.log(this.state.songs);
  }

  onAddClick() {
    console.log('onAddClick');
    this.props.navigation.navigate('Song');
  }

  onSongClick() {
    console.log('onSongClick');
  }

  renderSongs() {
    // grab song list from API
    // loop through song list and grab the following
    // need song ID to pass back later for on song click
    // need song title + song artists
    // render all of the above
    // console.log(this.props.current.songs);
    /*
    console.log('A SONG ID:');
    this.props.fetchSong('5Qel1sTrU4LM8HlJSPT2jd', this.props.token);
    console.log(this.props.artist);
    console.log(this.props.name);
    */

    if (this.props.current.songs) {
      this.props.current.songs.map((song) => {
        // console.log(song.songid);
        this.props.fetchSong(song.songid, this.props.token);

        // console.log(this.props.artist);
        // console.log(this.props.name);

        return (
          <TouchableOpacity onPress={this.onSongClick} style={styles.song}>
            <Text style={styles.songTitle}>
              {this.props.name}
            </Text>
            <Text style={styles.artistTitle}>
              {this.props.artist}
            </Text>
          </TouchableOpacity>
        );
      });
    }

    // console.log(this.props.current.songs[0]);
  }
  /*

.songid

  { this.props.all.map((post) => {
    return (
      <div>
        <NavLink className="link" to={`/posts/${post.id}`}>
          { Talked about the posts page with Alexis Harris in office hours and she recommended wrapping each post in a NavLink }
          <div className="post">
            <div className="coverURL" dangerouslySetInnerHTML={{ __html: marked(`![](${post.cover_url})` || '') }} />
            <div className="title" dangerouslySetInnerHTML={{ __html: marked(post.title || '') }} />
            <div className="tags" dangerouslySetInnerHTML={{ __html: marked(post.tags || '') }} />
          </div>
        </NavLink>

        <div className="border" />
      </div>
    );
  }) }
*/

  render() {
    // console.log('current playlist', this.props.current);
    // console.log(this.songs);
    console.log('current playlist', this.props.current);
    console.log('current id', this.props.currentId);
    return (
      <View style={styles.container}>
        <Text style={styles.top}>
          Formal Playlist
        </Text>
        <Text style={styles.loc}>
          10 West Wheelock, Hanover NH 03755
        </Text>
        <View style={styles.allSongs}>
          {this.renderSongs()}
        </View>
        <Songbar />
        <TouchableOpacity onPress={this.onAddClick} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>add a song</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/*
<View style={styles.song}>

            <Text style={styles.songTitle}>
            Knee Deep (feat. Jimmy Buffett)
            </Text>

            <TouchableOpacity onPress={this.onSongClick}>
              <Text style={styles.songTitle}> Playlist 1</Text>
            </TouchableOpacity>

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
*/

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
  fetchPlaylist, fetchSong,
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
