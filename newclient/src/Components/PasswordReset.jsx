import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import {
    Card,
    CardContent,
    Typography,
    Button
} from '@material-ui/core';

import {
    resetPassword
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    container: {
        margin: '0 auto',
        textAlign: 'center',
        width: '700px',
    },
    recaptcha: {
        margin: 'auto',
        padding: '20px',
        display: 'inline-block',

    },
    recaptchawrapper: {
        textAlign: 'center',
    },
    emailField: {

        width:400
    }
});

class PasswordReset extends Component {
    state = {
        componentId: 1,
        email: '',
        recaptcha: undefined,
        resetSent: false,
    }


    componentWillMount(){
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

    }

    recaptchaCallback = value =>{
        console.log('Done!');
        console.log('Recaptcha value is ' + value)
        this.setState({recaptcha:value});
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    handleSubmit = event => {
        console.log('Submit');
        // Only do this if the captcha value has been set
        if(this.state.recaptcha){
            this.props.resetPassword(this.state.email,this.state.recaptcha )
        }
        this.setState({resetSent:true});
        ReactGA.event({
            category: 'User',
            action: 'ResetPassword'
        });
    }

    render() {
        const { classes } = this.props;

        const sentContent = (
            <div>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Your new password has been sent...
                </Typography>
                <Typography variant="body1" color="inherit" className={classes.flex}>
                    We have sent a new temporary password to the email you provided. Please use it to log in ASAP and change your password to something secure.
                </Typography>
            </div>
        );

        const unsentContent = (
            <div>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Reset Password
                </Typography>
                <Typography variant='body1' color="inherit" className={classes.flex}>
                    Provide your email address, and we find it we will send you a new temporary password. You should log in and change your password as soon as you can.
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <TextValidator
                        label="Email"
                        onChange = {this.handleChange('email')}
                        name="email"
                        value={this.state.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                        className={classes.emailField}
                    />
                    <div className={classes.racaptchawrapper}>
                        <ReCAPTCHA
                            className={classes.recaptcha}
                            ref="recaptcha"
                            sitekey="6LfpPBgTAAAAACWOilGtD_4VG4wnk83celglNGH2"
                            onChange={this.recaptchaCallback}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </ValidatorForm>
            </div>

        );

        return (
            <div>
                <Card className={classes.container}>
                    <CardContent>
                        {this.state.resetSent?sentContent:unsentContent}
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
//  <propname> : <(<args>) => dispatch(<action_name>(<args>)),
        resetPassword: (email, recaptcha) => dispatch(resetPassword(email,recaptcha))
    };
}

const PasswordResetContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordReset);

export default withStyles(styles)(PasswordResetContainer);