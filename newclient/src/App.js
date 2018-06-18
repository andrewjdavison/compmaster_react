import React, { Component } from 'react';
import 'typeface-roboto';

import {
  AppFrame,
} from './Components';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    maxHeight: '100vh',
    scrollBehaviour: 'unset',
    overflow: 'hidden',
  }
});

class App extends Component {
  render() {
    return (
      <AppFrame />
    );
  }
}

export default withStyles(styles)(App);
