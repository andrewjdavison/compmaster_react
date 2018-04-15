import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Moment from 'react-moment';
import 'moment-timezone';
import 'typeface-roboto';
import TextField from 'material-ui/TextField';
import VenueMap from './VenueMap.jsx';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';

import Button from 'material-ui/Button';



import PlacesAutocomplete,
  {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  }  from 'react-places-autocomplete';

//import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import {
  setCompName,
  setCompAddress,
  resetStore,
  competitionDetailFetchData,
} from '../actions/competitionDetail.js';

import {setPage} from '../actions/core.js';

const styles = theme => ({
  flex: {
    flex: 1,
  },

  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit*3,
  }),

  nameField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },

  addressField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  mapBuild: {
    margin: theme.spacing.unit,
  },
  mapBuilder: {
    display:'inline-block',
  },
  addressInput: {
    display: 'inline-block',
  },

});


class CompetitionEditorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {address: 'San Fransisco, CA'};
    this.onChange = (address) => this.setState({ address})
  }

  componentWillMount(){
    // Add the googlemapsapi
    /*
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCXhtOn0IgnLwXxNr2nCQP5uLvgS3TY8og&libraries=places";
    script.async = true;

    document.body.appendChild(script);
    */

    // Set the page URI in case we get redirected to authenticate
    let uri = this.props.location.pathname;
    this.props.setPage(uri);

    // Load the competition data fresh in case anything has changed
    let compId = this.props.match.params.id;
    this.props.fetchCompetitionDetail(compId);


  };

  handleAddressSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }

  getCoords = (lat, lng) => {
    console.log(lat, lng);
  }

  handleChange = name => event => {
    console.log(name);
    console.log(event.target.value);
    this.props.setCompName(event.target.value);
  }

  handleAddressChange = name =>  event => {
    console.log('Address', event.target.value);
    this.props.setCompAddress(event.target.value);
  }

  onSuggestionSelected = suggestion => {
    console.log('Selected Suggestion:', suggestion);
    this.props.setCompAddress(suggestion.description, suggestion.place_id);
  }



  render() {
    let compData=this.props.competitionDetail.competition;
    const {classes} = this.props;
    const addressFieldStyle = classes.addressField;

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const textFieldProps = {
      label: 'Competition Address',
      className: classes.addressField,
      value: compData.address1,
      onChange: this.handleAddressChange(),
    }


    return (


      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Grid container>
            <Grid item xs={12} sm={8} lg={8}>
              <Card raised className={this.props.classes.card}>
                <Grid container>
                  <Grid item xs={12} sm={4} lg={4}>
                    <TextField
                      id="name"
                      label="Name"
                      className={classes.nameField}
                      value={this.props.competitionDetail.competition.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                    />
                    <div>
                      <div className={classes.addressInput}>
                        <MUIPlacesAutocomplete
                        textFieldProps={textFieldProps}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderTarget={() => (<div />)}
                        />
                      </div>
                      <div className={classes.mapBuilder}>
                        <VenueMap />
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
              <div>
                </div>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => ({
  competitionDetail: state.competitionDetail,
  core: state.core,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCompName: (name) => {dispatch(setCompName(name)) },
    setCompAddress: (address, placeId) => {dispatch(setCompAddress(address, placeId)) },
    fetchCompetitionDetail: (id)=>dispatch(competitionDetailFetchData(id)),
    resetStore: ()=>dispatch(resetStore()),
    setPage: (uri)=>dispatch(setPage(uri)),
  };
};

const CompetitionEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionEditorForm);

export default withStyles(styles)(CompetitionEditorContainer);
