import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';

import { Link } from 'react-router-dom';

import {
    Typography,
    Button,
    Card,
    CardContent,
} from '@material-ui/core';

import {
    setUsername,
    setPassword,
    authenticateUser,
    resetAuth,
} from '../Actions/auth.js';

const styles = theme => ({
    flex: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        width: '100vw',
        
    },
    container: {
        margin: '0 auto',
        textAlign: 'center',
        width: '700px'
    },
    textField: {
        width:400,
        display: 'flex',
        margin: 'auto'
    },
    signinButton: {
        marginTop: 20,
    },
    passwordButton: {
    }

});

class Login extends Component {
    state = {
        componentId: 1,
        email: '',
        password: '',
    }

    componentWillMount(){
        console.log('GAID: '+process.env.REACT_APP_GAID);
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);
        this.props.resetAuth();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    handleSubmit = event => {
        event.preventDefault();
//        this.props.setPassword(this.state.password);
//        this.props.setUsername(this.state.email);
        this.props.authenticateUser({
            username: this.state.email,
            password: this.state.password
        });
    }


    render() {
        const { classes } = this.props;

        const unauthenticatedContent = (
            <div>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Sign in
                </Typography>
                <Typography variant="subheading" color="secondary" className={classes.flex}>
                    {this.props.auth.errors.summary}
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange('email')}
                        name="email"
                        value={this.state.email}
                        validators={['required','isEmail']}
                        errorMessages={["You must provide the email address you used when you signed up","This is not a valid email"]}
                        className={classes.textField}
                    />
                    <TextValidator
                        label="Password"
                        type="password"
                        onChange={this.handleChange('password')}
                        name='password'
                        value={this.state.password}
                        validators={['required']}
                        errorMessages={["You need to provide your password"]}
                        className = {classes.textField}
                    />
                    <Button className={classes.signinButton} variant="outlined" color="primary" type="submit">Let Me In</Button>

                    <Typography variant="caption" color="inherit" className={classes.flex}>
                        - OR -
                    </Typography>
                    <Link to='/passwordreset' style={{textDecoration: 'none', display: 'block'}}>
                        <Button className={classes.passwordButton} color="secondary" >Forgotten password</Button>
                    </Link>
                    <Typography variant="caption" color="inherit" className={classes.flex}>
                        - OR -
                    </Typography>
                    <Link to='/signup' style={{textDecoration: 'none', display: 'block'}}>
                        <Button className={classes.passwordButton} color="default" >Create a new account</Button>
                    </Link>

                </ValidatorForm>
            </div>
        );

        return (
            <div className={classes.root}>
                <Card className={classes.container}>
                    <CardContent>
                        {unauthenticatedContent}
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
//  <propname> : <(<args>) => dispatch(<action_name>(<args>)),
        setUsername: (username) => dispatch(setUsername(username)),
        setPassword: (password) => dispatch(setPassword(password)),
        authenticateUser: (data) => dispatch(authenticateUser(data)),
        resetAuth: (data) => dispatch(resetAuth(data)),
    };
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default withStyles(styles)(LoginContainer);