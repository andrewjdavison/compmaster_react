import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';

import {
    get
} from '../coreutil.js';
import ValidatorForm from 'react-form-validator-core/lib/ValidatorForm';
import { TextValidator } from 'react-material-ui-form-validator';
import { 
    Button,
    Typography,
 } from "@material-ui/core";


const styles = theme => ({
    flex: {
        flex: 1,
    },
    heading: {
        flex: 1,
        margin:20,
    },
    subheading: {
        flex: 1,
        margin: 20,
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 18,
        margin: theme.spacing.unit*3,
    }),
    textField: {
        width: 400,
        display: 'flex',
        marginTop: 20,
        marginLeft: 20,
    },
    saveButton: {
        margin: 20,
    }
});

class PersonalDetails extends Component {
    state = {
        componentId: 1,
        errorMsg: undefined,
        authenticated: true,
        firstname: '',
        lastname: '',
        street1:'',
        street2:'',
        city:'',
        state:'',
        country:'',
        phone: '',
        club: '',
        clubBanner: '',

    }

    componentDidMount(){
    }

    componentWillMount(){
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

        // Lets load the user data again in case it's changed...
        const userId = this.props.auth.user.userid;
        const token = this.props.auth.token;
        this.setState({errorMsg: undefined})

        console.log("Token: "+token)

        get('/users/'+userId, token)
        .then((response)=>{
            console.log(response);
            if(response.error){
                throw response.error;
            }
            this.setState({
                firstname: response.body.users[0].firstName,
                lastname: response.body.users[0].lastName,
                phone: response.body.users[0].phone,
                street1: response.body.users[0].street1,
                street2: response.body.users[0].street2,
                city: response.body.users[0].city,
                state: response.body.users[0].state,
                country: response.body.users[0].country,
                club: response.body.users[0].club,
            })
        })
        .catch((err)=>{
            if(err.code === '401')
            {
                window.location='/signin';
            }
        })
    }

    handleChange = name => event => {
        if(name==='level' && event.target.value != ''){
            event.target.value = parseInt(event.target.value);
        }
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    handleSubmit = event => {
        event.preventDefault();

    }

    onSuggestionSelected = suggestion => {
        this.setState({suggestion});
    }


    render() {
        const { classes } = this.props;

        const unauthenticatedContent = (
            <h1>Unauthenticated View</h1>
        );
        const authenticatedContent = (
            <div>
                <Typography
                    variant="headline"
                    color="inherit"
                    className={classes.subheading}
                >
                    Your Name
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <MUIPlacesAutocomplete
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderTarget={() => (
                            <div 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: 16,
                                }}
                        
                            />
                        ) }
                        popoverProps={{
                            display: 'block',
                            position: 'relative',
                            zIndex: 2,

                        }}
                        textFieldProps={{label:"Address", className:classes.textField}}
                    />
                    <TextValidator
                        label="First Name"
                        onChange={this.handleChange('firstname')}
                        name="firstname"
                        value={this.state.firstname}
                        validator={['required']}
                        errorMessages={['This field is required']}
                        className={classes.textField}
                    />
                    <TextValidator
                        label="Last Name"
                        onChange={this.handleChange('lastname')}
                        name="lastname"
                        value={this.state.lastname}
                        validator={['required']}
                        errorMessages={['This field is required']}
                        className={classes.textField}
                    />
                    <Typography 
                        variant="headline"
                        color="inherit"
                        className={classes.subheading}
                    >
                        Your Address
                    </Typography>

                    <TextValidator
                        label="Street Address"
                        onChange={this.handleChange('street1')}
                        name="street1"
                        value={this.state.street1}
                        validator={[]}
                        errorMessages={[]}
                        className={classes.textField}
                    />
                    <TextValidator
                        label="(Extra street information)"
                        onChange={this.handleChange('street2')}
                        name="street2"
                        value={this.state.street2}
                        validator={[]}
                        errorMessages={[]}
                        className={classes.textField}
                    />
                    <TextValidator
                        label="City"
                        onChange={this.handleChange('city')}
                        name="city"
                        value={this.state.city}
                        validator={[]}
                        errorMessages={[]}
                        className={classes.textField}
                    />
                    <TextValidator
                        label="Country"
                        onChange={this.handleChange('country')}
                        name="country"
                        value={this.state.country}
                        validator={[]}
                        errorMessages={[]}
                        className={classes.textField}
                    />
                    <Typography 
                        variant="headline"
                        color="inherit"
                        className={classes.subheading}
                    >
                        Your Club
                    </Typography>
                    <TextValidator
                        label="Club"
                        onChange={this.handleChange('club')}
                        name="club"
                        value={this.state.club}
                        validator={[]}
                        errorMessages={[]}
                        className={classes.textField}
                    />
                    <Button 
                        className={classes.saveButton} 
                        variant="outlined" 
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </ValidatorForm>

           </div> 
        );

        return (
            <div>
                {this.state.authenticated ? authenticatedContent : unauthenticatedContent }
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
    };
}

const PersonalDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalDetails);

export default withStyles(styles)(PersonalDetailsContainer);