import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import {
    get
} from '../coreutil.js';

import {
    Paper,
    Tabs,
    Tab
} from '@material-ui/core';

import {
    AccountBox,
    Assessment,
    Assignment,
    Fingerprint,
    Share,
} from '@material-ui/icons';

import Entries from './Entries';
import Results from './Results';
import PersonalDetails from './PersonalDetails';
import Security from './Security.jsx';
import Social from './Social.jsx';

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
    }
});

class Profile extends Component {
    state = {
        componentId: 1,
        authenticated: true,
        component: (<PersonalDetails />),
        selectedTab: 'PersonalDetails',
        userData: undefined,
        errorMsg: undefined,

    }

    componentWillMount(){
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

        // Lets load the user data again in case it's changed...
        const userId = this.props.auth.user.userid;
        const token = this.props.auth.token;

        this.setState({errorMsg: undefined,});

        console.log("Token: "+token)

        get('/users/'+userId, token)
        .then((response)=>{
            console.log(response);
            if(response.error){
                throw response.error;
            }
            this.setState({userData: response.body.users[0]})
        })
        .catch((err)=>{
            if(err.code==='401'){
                window.location= '/signin';
            }
            this.setState({errorMsg: 'There was an error loading data. PLease try again shortly'});
        })

    }

    handleChange = name => event => {
        if(name==='level' && event.target.value != ''){
            event.target.value = parseInt(event.target.value);
        }
        console.log(name);
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    handleTabChange = (event,tabSelected) => {
        console.log('Target: ', event.target.component);
        console.log('Arg: ', tabSelected);
        console.log('State: '+ this.state.selectedTab)
        this.setState({selectedTab: tabSelected});
        switch(tabSelected){
            case 'Entries':
                this.setState({component: (<Entries />)});
                break;
            case 'Results':
                this.setState({component: (<Results />)});
                break;
            case 'Security':
                this.setState({component: (<Security />)});
                break;
            case 'Social':
                this.setState({component: (<Social />)});
                break;
            case 'PersonalDetails':
            default:
                this.setState({component: (<PersonalDetails />)});
                break;
        }
    }

    render() {
        const { classes } = this.props;

        const unauthenticatedContent = (
            <h1>Unauthenticated View</h1>
        );
        const authenticatedContent = (
            <div>
                <Paper style={{width: '100%'}}>
                    <Tabs 
                        value={this.state.selectedTab}
                        onChange={this.handleTabChange}
                        fullWidth
                        scrollable
                        scrollButtons='auto'
                        indicatorColor  ='primary'
                        textColor='primary' 
                    >
                        <Tab icon={<AccountBox />} value='PersonalDetails' label="PERSONAL DETAILS"/>
                        <Tab icon={<Assignment />} value='Entries' label="ENTRIES"/>
                        <Tab icon={<Assessment />} value='Results' label="RESULTS"/>
                        <Tab icon={<Fingerprint />} value='Security' label="SECURITY"/>
                        <Tab icon={<Share />} value='Social' label="SOCIAL"/>
                    </Tabs>

                    {this.state.component}
                </Paper>
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

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default withStyles(styles)(ProfileContainer);