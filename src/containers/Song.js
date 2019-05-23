/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// add song component

import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground,
} from 'react-native';

class AddSong extends Component {
  constructor(props) {
    super();
    this.state = {
      search: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    console.log('onAddClick');
    this.props.navigation.pop();
  }

  onSearchChange(event) {
    console.log('onSearchChange');
    this.setState({ search: event.target.value });
    console.log(this.state.search);
  }

  render() {
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
              onChange={this.onSearchChange}
              style={styles.input}
            />
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
  input: {
    height: 60,
    width: 200,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 30,
    textAlign: 'center',
  },
  info: {
    padding: 30,
  },
});

export default AddSong;
