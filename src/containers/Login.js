/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, WebView,
} from 'react-native';
import { connect } from 'react-redux';
import { signin, authenticate } from '../actions';

class Login extends React.Component {
  webview = null;

  constructor(props) {
    super(props);

    this.state = {
      loginPressed: false,
    };
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

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('?message=authSucces')) {
      const tokenIndex = url.indexOf('token') + 6;
      const token = url.substring(tokenIndex, url.length);
      this.props.authenticate(token);
      this.webview.stopLoading();
    }
  }

  render() {
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
          ref={ref => (this.webview = ref)}
          source={{
            uri: `${'https://accounts.spotify.com/authorize/'
           + '?response_type=code'
           + '&client_id='}${client_id
            }${scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
            }&redirect_uri=${encodeURIComponent(redirect_uri)}`,
          }}
          style={{ marginTop: 20 }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
      );
    } else {
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
    authenticated: reduxState.auth.authenticated,
    token: reduxState.auth.token,
  };
}

const mapDispatchToProps = {
  signin,
  authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
