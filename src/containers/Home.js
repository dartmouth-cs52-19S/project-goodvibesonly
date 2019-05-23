/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../actions';
import Songbar from './Songbar';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      errorMessage: null,
    };

    this.showPlaylist = this.showPlaylist.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }

    // eventually should fetch playlists there
    // this.props.fetchPlaylists();
  }

  getLocation = () => {
    Permissions.askAsync(Permissions.LOCATION).then((response) => {
      // if location services permissions are on, start watching position
      // else, set error message state
      if (response.status === 'granted') {
        console.log('in granted ask async');
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 30000,
          distanceInterval: 10,
        }, this.setLocation);
      } else {
        console.log('permission denied');
        this.setState({ errorMessage: 'app does not have location permissions' });
      }
    });
  }

  setLocation = (location) => {
    this.setState({ location });
  }

  onRefreshPress = () => {
    console.log('refresh pressed', this.state.errorMessage);

    // if no permissions errors, get the location data
    if (this.state.errorMessage === null) {
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      }).then((location) => {
        console.log('refresh', location);
        this.setState({ location });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  showPlaylist() {
    // pass in video into this.props.navigation.state.params.video in navigated view
    this.props.navigation.navigate('Playlist');
  }

  renderPlaylistsInRange = () => {
    // will check playlists in this.props.all and render the ones in range of
    // this.state.location
    // OR
    // will show all the Playlists
    // Playlist page will determine if user is in range (affects adding songs only)
    // OR
    // we can have both options, just in different sections
  }

  render() {
    if (this.state.location !== null) {
      console.log(this.state.location);
    }
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>Playlists Near Me...  </Text>
          <TouchableOpacity onPress={this.onRefreshPress}>
            <Text style={styles.topText}>↺</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.showPlaylist} style={styles.playlistButton1}>
            <Text style={styles.buttonText}>Playlist 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showPlaylist} style={styles.playlistButton2}>
            <Text style={styles.buttonText}>Playlist 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showPlaylist} style={styles.playlistButton3}>
            <Text style={styles.buttonText}>Playlist 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showPlaylist} style={styles.playlistButton4}>
            <Text style={styles.buttonText}>Playlist 4</Text>
          </TouchableOpacity>
        </View>
        <Songbar />
      </View>
    );
  }
}

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

function mapStateToProps(reduxState) {
  return {
    all: reduxState.playlists.all,
  };
}

const mapDispatchToProps = {
  fetchPlaylists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
