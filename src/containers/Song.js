/* eslint-disable react/destructuring-assignment */
// add song component

import React, { Component } from 'react';
import {
  View, Text, Button, TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#1DB5E5',
    fontFamily: '',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '-4px 4px 0px #000000',
  },
});

class AddSong extends Component {
  constructor(props) {
    super();
    this.state = {
      search: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onBackClick() {
    console.log('onBackClick');
  }

  onAddClick() {
    console.log('onAddClick');
  }

  onSearchChange(event) {
    console.log('onSearchChange');
    this.setState({ search: event.target.value });
    console.log(this.state.search);
  }

  render() {
    return (
      <View>
        <View id="top">
          <Button title="back" onPress={this.onBackClick} style={styles.button} />
          <Text>
                    Add a Song
          </Text>
        </View>
        <View id="searchbar">
          <TextInput
            placeholder="Search for a song"
            onChangeText={this.onSearchChange}
          />
        </View>
        <View id="results">
          <Text>
                    Results list here
          </Text>
        </View>
        <Button title="add" onPress={this.onAddClick} style={styles.button} />
      </View>
    );
  }
}

export default AddSong;
