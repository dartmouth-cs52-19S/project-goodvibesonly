/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { fetchPlaylists, updateLocation, fetchPlaylist } from '../actions';
import Songbar from './Songbar';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }
  }

  getLocation = () => {
    Permissions.askAsync(Permissions.LOCATION).then((response) => {
      // if location services permissions are on, start watching position
      // else, set error message state
      if (response.status === 'granted') {
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 30000,
          distanceInterval: 10,
        }, this.setLocation);
      } else {
        this.setState({ errorMessage: 'app does not have location permissions' });
      }
    });
  }

  setLocation = (location) => {
    this.props.updateLocation(location.coords.latitude, location.coords.longitude);
  }

  onRefreshPress = () => {
    // if no permissions errors, get the location data
    if (this.state.errorMessage === null) {
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      }).then((location) => {
        this.setLocation(location);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

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
          <Text style={styles.buttonText}>{playlist.title}</Text>
        </View>
      </TouchableOpacity>
    );
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

  renderAllPlaylists = () => {
    if (this.props.all === null) {
      return <Text>Loading</Text>;
    } else if (this.props.all.length === 0) {
      return <Text>No Playlists Yet</Text>;
    } else {
      return (
        this.props.all.map((playlist, key) => {
          return this.renderPlaylist(playlist, key);
        })
      );
    }
  }

  render() {
    if (this.props.location !== null) {
      console.log('location', this.props.location);
    }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>Playlists Near Me...  </Text>
          <TouchableOpacity onPress={this.onRefreshPress}>
            <Text style={styles.topText2}>↺</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.results}>
          {this.renderAllPlaylists()}
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
    fontWeight: 'bold',
    flexGrow: 2,
  },
  topText2: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 22,
  },
  bottom: {
    flexGrow: 4,
  },
  results: {
    height: 400,
  },
  listView: {
    flex: 2,
    flexDirection: 'column',
  },
});

function mapStateToProps(reduxState) {
  return {
    all: reduxState.playlists.all,
    token: reduxState.auth.token,
    location: reduxState.user.location,
    current: reduxState.playlists.current,
    currentId: reduxState.playlists.currentId,
  };
}

const mapDispatchToProps = {
  fetchPlaylists,
  updateLocation,
  fetchPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
