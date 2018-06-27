import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

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

class Security extends Component {
    state = {
        componentId: 1,
        authenticated: true,
    }

    componentWillMount(){
        ReactGA.initialize(process.env.REACT_APP_GAID);
        ReactGA.pageview(window.location.pathname);

    }

    handleChange = name => event => {
        if(name==='level' && event.target.value != ''){
            event.target.value = parseInt(event.target.value);
        }
        this.setState({
            [name]: event.target.value.trim()
        });
    }

    render() {
        const { classes } = this.props;

        const unauthenticatedContent = (
            <h1>Unauthenticated View</h1>
        );
        const authenticatedContent = (
            <h1>Authenticated View</h1>
        );

        return (
            <div>
                {this.state.authenticated ? authenticatedContent : unauthenticatedContent }
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

const SecurityContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Security);

export default withStyles(styles)(SecurityContainer);