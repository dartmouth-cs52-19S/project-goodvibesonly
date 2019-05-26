/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// add song component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../actions';

class AddSong extends Component {
  constructor(props) {
    super();
    this.state = {
      search: '',
      results: null,
    };
  }

  onAddClick = () => {
    console.log('onAddClick');
    this.props.navigation.pop();
  }

  onSearchChange = (text) => {
    console.log('onSearchChange');
    this.setState({ search: text });
  }

  onSearchClick = () => {
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
        this.setState({ results: response.data.tracks.items });
      })
      .catch((error) => {
        console.log('`spotify api error`');
      });
  }

  render() {
    if (this.state.results !== null) {
      console.log(this.state.results);
    }
    return (
      <View>
        <ImageBackground source={require('../img/Create.png')} style={styles.backgroundImage}>
          <View id="top">
            <Text style={styles.top}>
              Add a Song
            </Text>
          </View>
          <View id="searchbar" style={styles.info}>
            <TextInput
              placeholder="Search for a song"
              onChangeText={this.onSearchChange}
              style={styles.input}
            />
            <TouchableOpacity onPress={this.onSearchClick} style={styles.searchButton}>
              <Image
                source={require('../img/search.png')}
              />
            </TouchableOpacity>
          </View>
          <View id="results">
            {/* <Text>
                    Results list here
            </Text> */}
          </View>
          <TouchableOpacity onPress={this.onAddClick} style={styles.button}>
            <Text>add</Text>
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
    shadowRadius: 1,
  },
  info: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function mapStateToProps(reduxState) {
  return {
    token: reduxState.auth.token,
  };
}

const mapDispatchToProps = {
  fetchPlaylists,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
