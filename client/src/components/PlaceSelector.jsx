import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoogleApiWrapper } from 'google-maps-react';

export class PlacesElement extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <MUIPlacesAutocomplete
        textFieldProps = {this.props.textFieldProps}
        onSuggestionSelected = {this.props.onSuggestionSelected}
        renderTarget={() => (<div />)}
      />
    );
  }

};
