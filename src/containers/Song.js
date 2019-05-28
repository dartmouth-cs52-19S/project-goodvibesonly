/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// add song component

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ListView,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addToPlaylist } from '../actions';


class AddSong extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedTrack: null,
      search: '',
      results: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  onAddClick = () => {
    console.log('onAddClick');
    console.log('playlist id', this.props.playlistId);
    console.log('track id', this.state.selectedTrack.id);
    console.log('artist', this.state.selectedTrack.artists);

    // Real call
    this.props.addToPlaylist(this.props.playlistId, this.state.selectedTrack.id, this.state.selectedTrack.name, this.state.selectedTrack.artists[0].name);

    // Hardcoded call
    // this.props.addToPlaylist('5ce9c6668d16c400342d7241', this.state.selectedTrack.id);
    this.props.navigation.pop();
  }

  onSearchChange = (text) => {
    console.log('onSearchChange');
    this.setState({ search: text });

    const API_TRACK_URL = 'https://api.spotify.com/v1/search';

    const params = {
      q: text,
      type: 'track',
      market: 'US',
      limit: 5,
    };

    console.log('bout to do search api call');
    axios.get(`${API_TRACK_URL}`, { headers: { authorization: `Bearer ${this.props.token}` }, params })
      .then((response) => {
        this.setState(prevState => ({
          dataSource: prevState.dataSource.cloneWithRows(response.data.tracks.items),
          results: true,
        }));
      })
      .catch((error) => {
        console.log('`spotify api error`');
      });
  }

  selectTrack = (track) => {
    this.setState({
      search: track.name,
      selectedTrack: track,
    });
  }

  renderTrack = (track) => {
    // console.log(track);
    return (
      <TouchableHighlight onPress={() => { this.selectTrack(track); }}>
        <View>
          <Text>{track.name}</Text>
          <Text>{track.artists[0].name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderListView = () => {
    if (this.state.results !== null) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderTrack}
          style={styles.listView}
        />
      );
    } else {
      return <View />;
    }
  }

  render() {
    if (this.state.results !== null) {
      console.log(this.state.results);
    }

    console.log('playlist id', this.props.playlistId);
    return (
      <View>
        <ImageBackground source={require('../img/background.png')} style={styles.backgroundImage}>
          <View id="top">
            <Text style={styles.top}>
              Add a Song
            </Text>
          </View>
          <View id="searchbar" style={styles.info}>
            <TextInput
              placeholder="Search for a song"
              value={this.state.search}
              onChangeText={this.onSearchChange}
              style={styles.input}
            />
          </View>
          <View id="results" style={styles.results}>
            {this.renderListView()}
          </View>
          <Ionicons name="ios-search" onPress={this.onAddClick} size={20} />
        </ImageBackground>
      </View>
    );
  }
}

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
  searchButton: {
    backgroundColor: '#1DB5E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 40,
    height: 40,
    padding: 10,
  },
  input: {
    height: 60,
    width: 200,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 30,
    textAlign: 'center',
    backgroundColor: 'white',
    shadowColor: '#E31688',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  info: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  results: {
    height: 200,
  },
  listView: {
    flex: 2,
    flexDirection: 'column',
  },
});

function mapStateToProps(reduxState) {
  return {
    token: reduxState.auth.token,
    userId: reduxState.auth.userId,
    playlistId: reduxState.playlists.currentId,
  };
}

const mapDispatchToProps = {
  addToPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
