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

import { DateTimePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

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
    borderStyle: 'solid',
    borderWidth: '2',
    borderColor: 'black',
    minHeight: '200px',
    width: '100%',
    position: 'relative',
    marginRight: '10px',
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
    geocodeByAddress(this.props.competitionDetail.competition.address1)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.setCompLatLng(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  handleAddressSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.props.competitionDetail.competition.address1)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.setCompLatLng(latLng);
      })
      .catch(error => console.error('Error', error));
  }

  getCoords = (lat, lng) => {
    console.log(lat, lng);
  }

  handleChange = name => event => {
    this.props.setCompName(event.target.value);
  }

  handleAddressChange = name =>  event => {
    this.props.setCompAddress(event.target.value);
  }

  onSuggestionSelected = suggestion => {
    this.props.setCompAddress(suggestion.description, suggestion.place_id);
    geocodeByAddress(suggestion.description)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.setCompLatLng(latLng);
      })
      .catch(error => console.error('Error', error));

  }

  handleDateChange = (date) => {
    console.log(date);
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

    let date=undefined;


    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Grid container>
            <Grid item xs={12} sm={8} lg={8}>
              <Card raised className={this.props.classes.card}>
                <Grid container>
                  <Grid item xs={12} sm={8} lg={8}>
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
                    </div>
                    <div>
                      <DateTimePicker
                        label="Start date"
                        onChange={this.handleDateChange}
                        value={date}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} s={4} lg={4}>
                      <div className={classes.mapBuilder}>
                        <VenueMap />
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
