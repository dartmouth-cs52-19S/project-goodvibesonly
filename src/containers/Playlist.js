/* eslint-disable react/destructuring-assignment */
// playlist component

import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';

class Playlist extends Component {
  constructor(props) {
    super();
    this.state = {
      songs: [],
    };
  }

  onBackClick() {
    console.log('onBackClick');
    console.log(this.state.songs);
  }

  onAddClick() {
    console.log('onAddClick');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Button title="back" onPress={this.onAddClick} />
        </View>
        <Text>
                    Playlist Title
          {'\n'}
                    Location
        </Text>
        <View style={styles.container3}>
          <Text>
                    Song 1
            {'\n'}
            {'\n'}
                    Song 2
            {'\n'}
            {'\n'}
                    Song 3
          </Text>
        </View>
        <View id="songBar">
          <Text>
                    Song Bar Here
          </Text>
        </View>
        <Button title="add" onPress={this.onAddClick} />
      </View>
    );
  }
}

export default Playlist;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
