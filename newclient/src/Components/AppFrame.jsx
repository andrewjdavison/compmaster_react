import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    ListItem,
    ListItemIcon,
    Drawer
} from '@material-ui/core';

import Login from './Login.jsx';
import Home from './Home.jsx';
import PasswordReset from './PasswordReset.jsx';
import Signup from './Signup.jsx';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import { ConnectedRouter } from 'connected-react-router';

import {signout} from '../Actions/auth.js';


import {history} from '../reduxStore';

const drawerWidth=240;

const styles = theme => ({
    flex: {
        flex: 1,
    },
    root:{ 
       flexGrow: 1,
       zIndex: 1,
       overflow: 'hidden',
       position: 'relative',
       display: 'flex',
       maxHeight:'100vh',
    },
    appBar: {
        zIndex: theme.zIndex.drawer+1,
    },
    appPages: {
        flexGrow: 1,
//        backgroundColor: 'pink',
        padding: theme.spacing.unit*3,
        minWidth: 0, //So the Typeography noWrap works
        overflowY: 'auto',
        marginTop: 60,
        overflowX: 'hidden',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        marginTop:70
    },
    container: {
        display: 'inline-flex',
        marginTop:70
    },
    barPadding: {
        minHeigh: '60px',
    }

});

class AppFrame extends Component {
    state = {
        componentId: 1,
    }

    componentWillMount(){

    }

    handleChange = name => event => {
        if(name==='level' && event.target.value !== ''){
            event.target.value = +event.target.value;
        }
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    onClick = dest => event => {
        switch(dest){
            case 'signin': 
                window.location = '/signin';
                break;
            case 'signout':
                window.location = '/home';
                this.props.signout();
                break;
            default:
                break;
        }
    }

    render() {
        const { classes, auth } = this.props;

        const unauthenticatedButtons = (
            <div>
                <Button color="inherit">Find a Competition</Button>
                <Button color="inherit">Find Results</Button>
                <Button onClick={this.onClick('signin')} color="inherit">Sign Up or Sign In</Button>
            </div>
        );
        const authenticatedButtons = (
            <div>
                <Button color="inherit">Find a Competition</Button>
                <Button color="inherit">Find Results</Button>
                <Button onClick={this.onClick('signout')} color="inherit">Sign Out</Button>
            </div>
        );

        const entrantMenu = (
            <div>
                <Link to='/home' style={{textDecoration: 'none', display: 'block'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        Home
                    </ListItem>
                </Link>
                <Link to='/signin' style={{textDecoration: 'none', display:'block'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        Sign In
                    </ListItem>
                </Link>
            </div>
        );

        console.log(this.props.auth);

        return (
            <div className={classes.root}>
                <AppBar position='absolute' className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            CompMaster
                        </Typography>
                        {auth.authenticated?authenticatedButtons:unauthenticatedButtons}
                    </Toolbar>
                </AppBar>
                <div className={classes.barPadding} />
                    {auth.authenticated && (
                    <Drawer
                        variant='permanent'
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor='left'
                    >
                        {entrantMenu}
                    </Drawer>
                    )}
                    <main className={classes.appPages}>
                        <ConnectedRouter history={history}>
                            <Switch>
                                <Route exact path='/home' component={Home} />
                                <Route exact path='/signin' component={Login} />
                                <Route exact path='/passwordreset' component={PasswordReset} />
                                <Route exact path='/signup' component={Signup} />
                            </Switch>
                        </ConnectedRouter>
                    </main>
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
        signout: () => dispatch(signout()),
    };
}

const AppFrameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFrame);

export default withStyles(styles)(AppFrameContainer);