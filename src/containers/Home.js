/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { fetchPlaylists, updateLocation, fetchPlaylist } from '../actions';
import Songbar from './Songbar';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      hasNearby: false,
    };

    setInterval(this.props.fetchPlaylists, 60000);
    setInterval(this.checkNearby, 2000);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }

    this.props.navigation.dispatch(StackActions.popToTop());
  }

  checkNearby = () => {
    this.setState({ hasNearby: false });
    if (this.props.all !== null && this.props.location !== null && this.props.all.length > 0) {
      this.props.all.map((p) => {
        if (this.distanceBetweenCoords(this.props.location, p.location) < 30) {
          return this.setState({ hasNearby: true });
        }
        return '';
      });
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

    this.props.fetchPlaylists();
  }

  selectPlaylist = (playlist) => {
    // pass in video into this.props.navigation.state.params.video in navigated view
    this.props.fetchPlaylist(playlist._id);
    this.props.navigation.navigate('Playlist');
  }

  renderPlaylist = (playlist, key, id) => {
    const colors = ['#1DB5E5', '#E31688', '#F7EB58', '#907CFD'];
    const rotate = [
      styles.playlistButton,
      { backgroundColor: colors[(key % 4)] },
    ];
    // console.log(`styles.playlistButton${(key % 4) + 1}`);
    return (
      <TouchableOpacity key={id} style={rotate} onPress={() => { this.selectPlaylist(playlist); }}>
        <View>
          <Text style={styles.buttonText}>{playlist.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderAllPlaylists = () => {
    if (this.props.all === null || this.props.location === null) {
      return <Text>Loading</Text>;
    } else if (this.props.all.length === 0) {
      return <Text>No Playlists Yet</Text>;
    } else if (this.state.hasNearby === false) {
      return <Text>No Playlists Nearby...</Text>;
    } else {
      return (
        this.props.all.map((playlist, key) => {
          if (this.distanceBetweenCoords(this.props.location, playlist.location) < 30) {
            return this.renderPlaylist(playlist, key, playlist.id);
          } else {
            return <View key={playlist.id} />;
          }
        })
      );
    }
  }

  toRadians = (deg) => {
    return deg * Math.PI / 180.0;
  }

  // Pair1 is the user location in form { lat, lng }, pair2 is the playlist
  // location in form [lat, lng]
  distanceBetweenCoords = (pair1, pair2) => {
    const dlat = this.toRadians(pair2[0] - pair1.lat);
    const dlon = this.toRadians(pair2[1] - pair1.lng);

    const a = (Math.sin(dlat / 2.0) ** 2.0) + Math.cos(this.toRadians(pair1.lat)) * Math.cos(this.toRadians(pair2[0])) * (Math.sin(dlon / 2.0) ** 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = 6371e3 * c;

    return d;
  }

  render() {
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
