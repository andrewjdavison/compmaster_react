import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';

import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';


import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import SelectCompetitionTile from './SelectCompetitionTile.jsx';
import  {
          setUsername,
          setPassword,
          authenticateUser,
          resetAuth,
        } from '../actions/auth.js';



const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit*3,
  }),
  subtitle: {
    fontSize: 14,
    color: theme.palette.text.secondary
  },
});

function onSubmit(){

};

const errors = {

};

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.props.auth.authRequest={
      password: '',
      username: '',
    };

    this.state = {
      submitted: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.resetAuth();

  }

  handleEmailChange(event){
    console.log(this.props.auth.authRequest.username);
    const email = event.target.value;
    this.props.setUsername(email);
  }

  handlePwdChange(event){
    console.log(this.props.auth.authRequest.password);
    const password= event.target.value;
    this.props.setPassword(password);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('Submitting request for Username: '+this.props.auth.authRequest.username);
    this.props.authenticateUser(this.props.auth.authRequest);
  }

  render(){
    const {submitted} = this.state;
    return (
      <div>
        <Card className="container">
          <CardContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
              <h2 className="card-heading">Login</h2>

              {this.props.auth.errors.summary && <p className="error-message">{this.props.auth.errors.summary}</p>}

              <div className="field-line">
                <TextValidator
                  label="Email"
                  onChange={this.handleEmailChange}
                  name="email"
                  value={this.props.auth.authRequest.username}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </div>
              <div className="field-line">
                <TextValidator
                  label='Enter your password'
                  name="password"
                  type="password"
                  onChange={this.handlePwdChange}
                  value={this.props.auth.authRequest.password}
                  validators={['required']}
                  errorMessages={['You must provide you password']}
                />
              </div>
              <div className="button-line">
                <Button raised type="submit" color="primary">Sign In</Button>
              </div>

            </ValidatorForm>
          </CardContent>
          <CardActions>
            <Typography className={this.props.classes.subtitle}>Don't have an account? </Typography><Button dense>Create one now</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (event) => { console.log(event);dispatch(setUsername(event)) },
    setPassword: (password) => dispatch(setPassword(password)),
    authenticateUser: (data) => dispatch(authenticateUser(data)),
    resetAuth: (data)=> dispatch(resetAuth(data)),
  };

};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginContainer);
