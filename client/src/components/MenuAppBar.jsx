import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

//import MenuIcon from 'material-ui-icons/Menu';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
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
    const { classes } = this.props;
    const { userIsAManager,auth, manager, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <div className={classes.root}>
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
          <AppBar position="static">
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
        <div className="App-frame">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);

