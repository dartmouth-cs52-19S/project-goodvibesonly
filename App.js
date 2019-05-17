import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Profile from './src/containers/Profile';
import Playlist from './src/containers/Playlist';
import Login from './src/containers/Login';

import reducers from './src/reducers';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

// These tabs are not the final ones, just to test each screen
const TabNavigator = createBottomTabNavigator({
  Playlist,
  Profile,
  Login,
});

const AppContainer = createAppContainer(TabNavigator);
