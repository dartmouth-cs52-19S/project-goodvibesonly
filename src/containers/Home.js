/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  Platform, StyleSheet, Text, View, Button,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../actions';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
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
        <Text>Playlists Near Me</Text>
        <Text>Music Bar goes here eventually</Text>
        <Button onPress={this.onRefreshPress} title="Refresh Loc Manually" />
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
