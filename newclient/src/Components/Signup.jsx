import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { Typography, Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextValidator from 'react-material-ui-form-validator/lib/TextValidator';

import { Link } from 'react-router-dom';

import {
    Card,
    CardContent
} from '@material-ui/core';

import {
    resetAuth,
    createUser
} from '../Actions/auth.js';

import ReCAPTCHA from 'react-google-recaptcha';

const styles = theme => ({
    flex: {
        flex: 1,
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 18,
        margin: theme.spacing.unit*3,
    }),
    firstTextField: {
        width: 400,
        display: 'flex',
        margin: 'auto',
        marginTop:40 
    },
    textField: {
        width: 400,
        display: 'flex',
        margin: 'auto'
    },
    container: {
        margin: '0 auto',
        textAlign: 'center',
        width: 700
    },
    signinButton: {

    },
    signupButton: {
        marginTop: 20

    },
    recaptcha: {
        margin: 'auto',
        padding: '20px',
        display: 'inline-block',
    },
    recaptchawrapper: {
        textAlign: 'center',
    }
});

class Signup extends Component {
    state = {
        componentId: 1,
        email: '',
        recaptcha: undefined,
        password: '',
        confirmPassword:'',
    }

    recaptchaCallback = value => {
        console.log('Setting recaptcha value');
        this.setState({recaptcha:value});
    }

    componentWillMount(){
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if(value !== this.state.password) {
                return false;
            }
            return true;
        });

        this.props.resetAuth();

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('Submitting...');
        if(this.state.recaptcha){
            console.log('calling createUser');
            this.props.createUser(this.state.email, this.state.password, this.state.recaptcha);
        }
        ReactGA.event({
            category: 'User',
            action: 'CreateUser'
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.container}>
                    <CardContent>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Sign Up for CompMaster
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
                                errorMessages={['You need to provide your email address for us to validate you']}
                                className={classes.firstTextField}
                            />
                            <TextValidator
                                label="Password"
                                onChange={this.handleChange('password')}
                                name="password"
                                type="password"
                                validators={['required']}
                                errorMessages={['Password is required']}
                                value={this.state.password}
                                className={classes.textField}
                            />
                            <TextValidator
                                label="Confirm Password"
                                onChange={this.handleChange('confirmPassword')}
                                name="confirmPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={["passwords don't match",'You must confirm your password']}
                                value={this.state.confirmPassword}
                                className={classes.textField}
                            />
                            <div className={classes.recaptchawrapper}>
                                <ReCAPTCHA
                                    ref="recaptcha"
                                    className={classes.recaptcha}
                                    sitekey="6LfpPBgTAAAAACWOilGtD_4VG4wnk83celglNGH2"
                                    onChange={this.recaptchaCallback}
                                />
                            </div>
                            <Button className={classes.signupButton} variant="outlined" color="primary" type="submit">Sign me up</Button>
                            <Typography variant="caption" color="inherit" className={classes.flex}>
                                - OR -
                            </Typography>
                            <Link to='/signin' style={{textDecoration: 'none', display: 'block'}}>
                                <Button className={classes.signinButton} color="secondary" >Sign In</Button>
                            </Link>
                        </ValidatorForm>
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
        createUser: (email,password,recaptcha) => dispatch(createUser(email,password,recaptcha)),
        resetAuth: () => dispatch(resetAuth()),
    };
}

const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

export default withStyles(styles)(SignupContainer);