/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { connect } from 'react-redux';
import TabBar from '../navigation/TabBar';
import Login from './Login';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.renderScreen = this.renderScreen.bind(this);
  }

  renderScreen() {
    console.log('logged in: ', this.props.authenticated);
    if (this.props.authenticated) {
      return <TabBar />;
    } else {
      return <Login />;
    }
  }

  render() {
    return this.renderScreen();
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(Main);
