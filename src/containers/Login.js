import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

export default class Login extends React.Component {
  onLoginPress = () => {
    console.log('login button pressed, do some axios call to our backend');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>welcome to vibes</Text>
        <Button title="login with spotify" onPress={this.onLoginPress} />
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
