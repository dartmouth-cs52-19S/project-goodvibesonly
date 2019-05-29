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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addToPlaylist, fetchPlaylist } from '../actions';


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
      addClicked: false,
    };
  }

  onAddClick = () => {
    console.log('onAddClick');
    this.setState({ addClicked: true });

    if (this.state.selectedTrack !== null) {
    // Real call
      this.props.addToPlaylist(this.props.playlistId, this.state.selectedTrack.id, this.state.selectedTrack.name, this.state.selectedTrack.artists[0].name, this.state.selectedTrack.duration_ms);
      this.props.fetchPlaylist(this.props.playlistId);
      this.props.navigation.pop();
    }
  }

  onSearchChange = (text) => {
    console.log('onSearchChange');
    this.setState({ search: text });
  }

  onSearchPress = () => {
    this.setState({ addClicked: false });
    const API_TRACK_URL = 'https://api.spotify.com/v1/search';

    const params = {
      q: this.state.search,
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
      addClicked: false,
    });
  }

  renderTrack = (track) => {
    // console.log(track);
    return (
      <TouchableOpacity onPress={() => { this.selectTrack(track); }}>
        <View>
          <Text>{track.name}</Text>
          <Text>{track.artists[0].name}</Text>
        </View>
      </TouchableOpacity>
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

  renderFormValidation = () => {
    if (this.state.selectedTrack === null && this.state.addClicked) {
      return <Text>Please search for and select a song.</Text>;
    } else {
      return <View />;
    }
  }

  render() {
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
            <Ionicons style={styles.icon} name="ios-search" onPress={this.onSearchPress} size={30} />
          </View>
          <ScrollView id="results" style={styles.results}>
            {this.renderListView()}
          </ScrollView>
          {this.renderFormValidation()}
          <TouchableOpacity onPress={this.onAddClick} style={styles.button}>
            <Text style={styles.buttontext}>add</Text>
          </TouchableOpacity>
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
    marginTop: 30,
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
  fetchPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
