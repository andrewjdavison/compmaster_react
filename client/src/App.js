import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import LoginPage from './containers/LoginPage.jsx';

import './App.css';

class App extends Component {
  render() {
    return (

      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <BrowserRouter>
          <Base>
            <switch>
              <Route exact path="/" component={ HomePage }/>
              <Route path='/login' component={ LoginPage }/>
              <Route path='/signup' component={ SignUpPage }/>

            </switch>
          </Base>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

