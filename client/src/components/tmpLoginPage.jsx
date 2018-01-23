import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card, { CardText } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {
  setUsername,
  setPassword,
  authenticateUser
} from '../actions/auth.js';


function onSubmit(){
}


class LoginForm extends Component {
  componentWillMount(){

  }

  render(){
    return (
      <Card className="container">
        <form action="/" onSubmit={this.props.authenticateUser}>
          <h2 className="card-heading">Login</h2>

          {this.props.auth.errors.summary && <p className="error-message">{this.props.auth.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.props.auth.errors.email}
              onChange={this.props.setUsername}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.props.setPassword}
              errorText={this.props.auth.errors.password}
            />
          </div>
          <div className="button-line">
            <Button raised type="submit" label="Log in" primary />
          </div>
          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    );
  }
};


const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) =>{
  return {
    setUsername: (event) => dispatch(setUsername(event.target.value)),
    setPassword: (event) => dispatch(setPassword(event.target.value)),
    authenticate: (username, password) => dispatch(authenticateUser(username, password)),
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginContainer;
