// add song component

import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

class AddSong extends Component {
  constructor(props) {
    super();
    this.state = {
        search: '',
    };
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
    }

  render() {
    return (
        <View>
            <View id="top">
                <Button title="back" onPress={this.onBackClick}/>
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
            <Button title="add" onPress={this.onAddClick}/>
        </View>
    );
  }
}

export default AddSong;