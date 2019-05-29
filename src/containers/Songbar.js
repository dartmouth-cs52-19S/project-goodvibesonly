/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { getPlayState, sendPlay, sendPause } from '../actions';

class Songbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isPlaying: false,
    };
  }

  componentDidMount() {
    this.props.getPlayState(this.props.token);
    setInterval(() => {
      this.props.getPlayState(this.props.token);
    }, 2000);
  }

  onPlay = () => {
    console.log('play press');
    // this.setState({ isPlaying: true });
    this.props.sendPlay(this.props.token);
  }

  onStop = () => {
    console.log('pause press');
    // this.setState({ isPlaying: false });
    this.props.sendPause(this.props.token);
    clearTimeout(this.props.processID);
    if (this.props.fromPlaylist === true) {
      this.props.resetIndex();
    }
  }

  renderPlay() {
    console.log(this.props.play);
    if (this.props.play === 'true') {
      return (<Ionicons style={styles.button} name="ios-hand" onPress={this.onStop} />);
    } else {
      // return (<Ionicons style={styles.button} name="ios-play" onPress={this.onPlay} />);
      return (<View />);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {' '}
          {this.props.playstate}
          {' '}
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
