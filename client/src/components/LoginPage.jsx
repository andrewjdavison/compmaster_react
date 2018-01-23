import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import SelectCompetitionTile from './SelectCompetitionTile.jsx';
import  {
          setUsername,
          setPassword,
          authenticateUser,
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
  componentWillMount(){
  }

  render(){
    return (
      <div>
        <Card className="container">
          <CardContent>
            <form acion="/" onSubmit={this.props.authenticateUser}>
              <h2 className="card-heading">Login</h2>

              {this.props.auth.errors.summary && <p className="error-message">{this.props.auth.errors.summary}</p>}

              <div className="field-line">
                <TextField
                  label="Email"
                  name="email"
                  onChange={this.props.setUsername}
                />
              </div>
              <div className="field-line">
                <TextField
                  label="Password"
                  onChange={this.props.setPassword}
                />
              </div>
              <div className="button-line">
                <Button raised type="submit" color="primary">Sign In</Button>
              </div>

            </form>
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
    setUsername: (event) => dispatch(setUsername(event.target.value)),
    setPassword: (event) => dispatch(setPassword(event.target.value)),
    authenticateUser: (event) => dispatch(authenticateUser(event)),
  };

};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginContainer);
