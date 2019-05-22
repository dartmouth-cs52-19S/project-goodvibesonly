/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import {
  StyleSheet, Text, View, Button, WebView,
} from 'react-native';
import { connect } from 'react-redux';
import { signin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPressed: false,
    };

    // this.renderAuth = this.renderAuth.bind(this);
  }

  onLoginPress = () => {
    console.log('login button pressed, do some axios call to our backend');
    this.setState({ loginPressed: true });
    // this.props.signin();
    // console.log(this.props.message);
  }

  renderMessage = () => {
    if (this.props.message !== undefined) {
      return <Text>{this.props.message.message}</Text>;
    } else {
      return <View />;
    }
  }

  renderAuth = () => {
    if (this.state.loginPressed) {
    // Adapted from: https://facebook.github.io/react-native/docs/webview.
    // This code creates a webview
      return (
        <WebView
          source={{ uri: 'https://github.com/' }}
          style={{ marginTop: 20 }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>welcome to vibes</Text>
          <Button title="login with spotify" onPress={this.onLoginPress} />
        </View>
      );
    }
  }

  // old render function
  /* <View style={styles.container}>
        { this.renderMessage() }
        {this.renderAuth()}
      </View>
  */

  render() {
    // console.log(this.props.message);
    const client_id = 'b4a7ad189bdb424aad1d1a4773a6ddf6'; // Your client id
    const redirect_uri = 'https://good-vibes-only.herokuapp.com/api/auth'; // Your redirect uri
    const scopes = 'user-read-private user-read-email';
    if (this.state.loginPressed) {
      // Adapted from: https://facebook.github.io/react-native/docs/webview.
      // This code creates a webview.
      // Also referenced https://stackoverflow.com/questions/35451139/react-native-webview-not-loading-any-url-react-native-web-view-not-working
      // from which I learned that my webview wasn't rendering because I initially had the webview nested inside a view
      return (
        <WebView
          source={{
            uri: `${'https://accounts.spotify.com/authorize/'
           + '?response_type=code'
           + '&client_id='}${client_id
            }${scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
            }&redirect_uri=${encodeURIComponent(redirect_uri)}`,
          }}
          style={{ marginTop: 20 }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>welcome to vibes</Text>
          <Button title="login with spotify" onPress={this.onLoginPress} />
        </View>
      );
    }
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
