import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import {
    Typography
} from '@material-ui/core';

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

class Home extends Component {
    state = {
        componentId: 1,
    }

    componentWillMount(){
        console.log('GAID: '+process.env.REACT_APP_GAID);
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Home page
                </Typography>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
//  <propname> : <(<args>) => dispatch(<action_name>(<args>)),
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default withStyles(styles)(HomeContainer);