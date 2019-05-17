/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  StyleSheet, Text, View, Button,
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
    console.log(this.props.message);
    return (
      <View style={styles.container}>
        <Text>welcome to vibes</Text>
        <Button title="login with spotify" onPress={this.onLoginPress} />
        {this.renderMessage()}
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
