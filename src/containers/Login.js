/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { signin } from '../actions';

class Login extends React.Component {
  onLoginPress = () => {
    console.log('login button pressed, do some axios call to our backend');
    this.props.signin();
    console.log(this.props.message);
  }

  renderMessage = () => {
    if (this.props.message !== undefined) {
      return <Text>{this.props.message.message}</Text>;
    } else {
      return <View />;
    }
  }

  render() {
    // console.log(this.props.message);
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../img/Login.png')} style={styles.backgroundImage}>
          <Text>welcome to vibes</Text>
          <TouchableOpacity onPress={this.onLoginPress} style={styles.button}>
            <Text>login with spotify</Text>
          </TouchableOpacity>
          {this.renderMessage()}
        </ImageBackground>
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
    width: 175,
    height: 40,
    padding: 10,

  },
});

// connecting currentPost prop to posts.current in global redux state
function mapStateToProps(reduxState) {
  return {
    message: reduxState.auth.message,
  };
}

const mapDispatchToProps = {
  signin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
