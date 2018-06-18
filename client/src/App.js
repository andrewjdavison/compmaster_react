import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {red, purple, green} from 'material-ui/colors';
import { BrowserRouter, Route } from 'react-router-dom';
//import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

import LoginPage from './components/LoginPage.jsx';

import LogoutPage from './containers/LogoutPage.jsx';
import MenuAppBar from './components/MenuAppBar.jsx';
import SelectCompetitionPage from './components/SelectCompetitionPage.jsx';
import CompetitionDetailPage from  './components/CompetitionDetailPage.jsx';
import CompetitionEditorPage from './components/CompetitionEditorPage.jsx';

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';


import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

export default class App extends Component {
  render() {
    return (

      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <MenuAppBar>
                <Route exact path="/" component={ HomePage }/>
                <Route path='/login' component={ LoginPage }/>
                <Route path='/signup' component={ SignUpPage }/>
                <Route path='/logout' component={ LogoutPage }/>
                <Route path='/selectcomp' component={ SelectCompetitionPage }/>
                <Route path='/compdetails/:id' component={ CompetitionDetailPage }/>
                <Route path='/compedit/:id' component={ CompetitionEditorPage }/>

            </MenuAppBar>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}


