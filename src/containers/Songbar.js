/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { getPlayState, sendPlay, sendPause } from '../actions';

class Songbar extends React.Component {
  componentDidMount() {
    this.props.getPlayState(this.props.token);
    setInterval(() => {
      this.props.getPlayState(this.props.token);
    }, 2000);
  }

  onPlay = () => {
    this.props.sendPlay(this.props.token);
  }

  onStop = () => {
    this.props.sendPause(this.props.token);
    clearTimeout(this.props.processID);
    if (this.props.fromPlaylist === true) {
      this.props.resetIndex();
    }
  }

  renderPlay() {
    if (this.props.play === 'true') {
      return (<Ionicons style={styles.button} name="ios-hand" onPress={this.onStop} />);
    } else {
      return (<View />);
    }
  }

  renderString(playstate) {
    if (playstate.length > 28) {
      return (
        <Text style={styles.text}>
          {' '}
          {playstate.substring(0, 28)}
          {'...'}
          {' '}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {' '}
          {playstate}
          {' '}
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.renderString(this.props.playstate)}
        </Text>
        {this.renderPlay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#000000',
    width: '96%',
    height: 50,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  button: {
    color: '#ffffff',
    fontSize: 30,
    marginRight: 20,
  },
  text: {
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function mapStateToProps(reduxState) {
  return {
    playstate: reduxState.player.playstate,
    token: reduxState.auth.token,
    play: reduxState.isplaying.play,
  };
}

const mapDispatchToProps = {
  getPlayState,
  sendPause,
  sendPlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Songbar);
