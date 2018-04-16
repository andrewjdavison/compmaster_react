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

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import {
  setCompName,
  setCompAddress,
  setCompLatLng,
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
  map: {
    height: '100%',
  },

});


class CompetitionEditorForm extends Component {
  constructor(props) {
    super(props);
    this.props.setCompLatLng({lat:37, lng:40});

    this._loadingElement = <div>LOADING</div>;
    this._containerElement = <div className={styles.root} />;
    this._mapElement = <div className={{height: `100%`}} />;
  }

  componentWillMount(){

    // Set the page URI in case we get redirected to authenticate
    let uri = this.props.location.pathname;
    this.props.setPage(uri);

    // Load the competition data fresh in case anything has changed
    let compId = this.props.match.params.id;
    this.props.fetchCompetitionDetail(compId);
    this.props.setCompLatLng({lat:37, lng:40});



  };

  handleAddressSubmit = (event) => {
    event.preventDefault();

    console.log('Looking up ', this.props.competitionDetail.competition.address1);
    geocodeByAddress(this.props.competitionDetail.competition.address1)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        this.props.setCompLatLng(latLng);
        console.log(this.props.competitionDetail.competition);
      })
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

    const textFieldProps = {
      label: 'Competition Address',
      className: classes.addressField,
      value: compData.address1,
      onChange: this.handleAddressChange(),
    }

      /*
    const SearchGoogleMap = withScriptjs(
      withGoogleMap((props) =>
        <div><h2>map</h2>
          <GoogleMap
            defaultZoom={14}
            defaultCenter={{lat:-34.397, lng:150.644}}
          >


          </GoogleMap>
        </div>
      )
    );
    */


    const SearchGoogleMap =
        withScriptjs(
          withGoogleMap((props) =>
            <div><h2>map</h2>
              <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat:-34.397, lng:150.644}}
              >


              </GoogleMap>
            </div>
          )
      )



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
                        <h1>break</h1>
                        <Button
                          raised
                          color="primary"
                          onClick={this.handleAddressSubmit}
                        >
                          Make a Google Map
                        </Button>
                      </div>
                      <div className={classes.mapBuilder}>

                        <SearchGoogleMap
                          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCXhtOn0IgnLwXxNr2nCQP5uLvgS3TY8og"
                          loadingElement={this._loadingElement}
                          containerElement={this._containerElement}
                          mapElement = {this._mapElement}
                        >


                        </SearchGoogleMap>

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
    setCompLatLng: (latLng) => {dispatch(setCompLatLng(latLng)) },
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
