/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView,
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
    const colors = ['#1DB5E5', '#E31688', '#F7EB58', '#907CFD'];
    const rotate = [
      styles.playlistButton,
      { backgroundColor: colors[(key % 4)] },
    ];
    // console.log(`styles.playlistButton${(key % 4) + 1}`);
    return (
      <TouchableOpacity key={key} style={rotate} onPress={() => { this.selectPlaylist(playlist); }}>
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

  // Pair1 is the user location in form { lat, lng }, pair2 is the playlist
  // location in form [lat, lng]
  distanceBetweenCoords = (pair1, pair2) => {
    console.log('pair1', pair1);
    console.log('pair2', pair2);

    const dlat = pair2[0] - pair1.lat;
    console.log('dlat', dlat);
    const dlon = pair2[1] - pair1.lng;
    console.log('dlon', dlon);

    const a = (Math.sin(dlat / 2.0) ** 2.0) + Math.cos(pair1.lat) * Math.cos(pair2[0]) * (Math.sin(dlon / 2.0) ** 2.0);
    console.log('a', a);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    console.log('c', c);
    const d = 6371.0 * c;
    console.log('d', d);

    return d * 1000.0;
  }

  render() {
    if (this.props.location !== null) {
      console.log('location', this.props.location);
    }

    if (this.props.all !== null && this.props.location !== null) {
      // console.log('all playlists', this.props.all);
      console.log('distance calc', this.distanceBetweenCoords(this.props.location, this.props.all[0].location));
    }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>Playlists Near Me...  </Text>
          <TouchableOpacity onPress={this.onRefreshPress}>
            <Text style={styles.topText2}>↺</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.bottom}>
          {this.renderAllPlaylists()}
        </ScrollView>
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
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  buttonText: {
    margin: 5,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 22,
  },
  bottom: {
    height: '75%',
  },
  listView: {
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
