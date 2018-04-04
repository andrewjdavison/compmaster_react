import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
//import List from 'material-ui/List';
//import Hidden from 'material-ui/Hidden';

//import MenuIcon from 'material-ui-icons/Menu';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

//import Drawer from 'material-ui/Drawer';
//import { mainCompItems } from './DrawerItems.jsx';

const drawerWidth=240;

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: '0',
    [theme.breakpoints.up('md')]:{
      width: `calc(100%)px'`,
    },
  },
  NavIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')] : {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit*3,
    height: `calc(100%-56px)`,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100%-64px)`,
      marginTop: 64,
    },
  },

  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class MenuAppBar extends React.Component {
  state = {
    userIsAManager: false,
    auth: false,
    manager: false,
    anchorEl: null,
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };


  handleRequestSignIn = (event ) => {
    this.setState({auth: true});
  };

  handleRequestSignOut = (event) => {
    this.setState({auth: false});
  };

  handleChange = (event,checked) => {
    this.setState({manager: checked});
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    //    const { classes, theme } = this.props;
    const { classes } = this.props;
    const { userIsAManager,auth, manager, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    /*
    const drawer = (
      <div>
        <div className={classes.drawerHeader}/>
        <Divider />
        <List>{mainCompItems}</List>
        <Divider />
      </div>
    );
    */

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {userIsAManager?(
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={manager} onChange={this.handleChange} aria-label="Manager Mode" />
                }
                label={manager ? "Manager Mode":"Entrant Mode"}
              />
            </FormGroup> ) : (
            <div />
            )
          }
          <AppBar className={classes.appBar}  position="static">
            <Toolbar>
              {/*
              <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              */}
              <Typography type="title" color="inherit" className={classes.flex}>
                CompMaster
              </Typography>
              <Button color="contrast" href='/selectcomp'>Select a Competition</Button>
              <Button color="contrast">Find Results</Button>
              {auth ? (
                  <div>
                    <IconButton aria-owns={open? 'menu-appbar': null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="constrast"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onRequestClose={this.handleRequestClose}
                    >
                      <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                      <Divider />
                      <MenuItem onClick={this.handleRequestSignOut}>Sign Out</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button color="contrast" href='/login'>Sign In or Sign Up</Button>
                )
              }
            </Toolbar>
          </AppBar>
        </div>
        <main className = {classes.content }>
            {this.props.children}
        </main>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MenuAppBar);

