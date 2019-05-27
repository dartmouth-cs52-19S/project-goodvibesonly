/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, WebView, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { authenticate } from '../actions';

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
    console.log('in nav state change');
    const { url } = newNavState;
    console.log(url);
    if (!url) return;


    if (url.includes('?message=authSuccess')) {
      console.log('entered frontend');
      const tokenStartIndex = url.indexOf('token') + 6;
      const data = url.substring(tokenStartIndex, url.length);
      const dataArr = data.split('?');
      const token = dataArr[0];
      console.log('token', token);

      const userid = dataArr[1].substring(7, dataArr[1].length);
      console.log('userid', userid);

      this.props.authenticate(token, userid);
      this.webview.stopLoading();
    }
  }

  render() {
    const client_id = 'b4a7ad189bdb424aad1d1a4773a6ddf6'; // Your client id
    const redirect_uri = 'https://good-vibes-only.herokuapp.com/api/auth'; // Your redirect uri
    const scopes = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state';
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
          <ImageBackground source={require('../img/background.png')} style={styles.backgroundImage}>
            <Image source={require('../img/VibesLogo.png')} style={styles.logo} />
            <Text style={styles.title}>welcome to vibes</Text>
            <TouchableOpacity onPress={this.onLoginPress} style={styles.button}>
              <Text style={styles.buttontext}>login with spotify</Text>
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
    justifyContent: 'flex-start',
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
    shadowColor: 'black',
    shadowOffset: { height: 5, width: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: '20%',
  },
  title: {
    marginBottom: 15,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 32,
  },
  buttontext: {
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 16,
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
  authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
