/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getPlayState, sendPlay, sendPause } from '../actions';

class Songbar extends React.Component {
  onStatePress = () => {
    console.log('state button press');
    console.log('sending token from songbar ', this.props.token);
    this.props.getPlayState(this.props.token);
    console.log(this.props.playstate);
  }

  onPlay = () => {
    console.log('play press');
    this.props.sendPlay(this.props.token);
    console.log(this.props.isPlaying);
  }

  onPause = () => {
    console.log('pause press');
    this.props.sendPause(this.props.token);
    console.log(this.props.isPlaying);
  }

  render() {
    if (this.props.playstate !== '') {
      console.log(this.props.playstate);
    }

    return (
      <View style={styles.container}>
        <Button title="state" onPress={this.onStatePress} />
        <Button title="play" onPress={this.onPlay} />
        <Button title="pause" onPress={this.onPause} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});

function mapStateToProps(reduxState) {
  return {
    playstate: reduxState.player.playstate,
    isPlaying: reduxState.player.isPlaying,
    token: reduxState.auth.token,
  };
}

const mapDispatchToProps = {
  getPlayState,
  sendPause,
  sendPlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Songbar);
