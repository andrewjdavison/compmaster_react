import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { typography } from 'material-ui/styles';

class GoogleMapsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            lat: props.lat,
            lng: props.lng,
        }
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }
    onMarkerClick = (props, marker, e) => {
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        });
    }
    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        const style = {
            width: '30vw',
            height: '30vh',
            'marginLeft': '0',
            'marginRight': '0'
        }
        let compData = this.props.competitionDetail.competition;

        console.log('Mapping: (',this.state.lat,',',this.state.lng,')');
        return (
            <div>
                <h1>Lat: {this.props.lat}</h1>
                <h1>Comp Lat: {compData.lat}</h1>
            <Map
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = { 14 }
                initialCenter = {{ lat: compData.lat,
                                   lng: compData.lng}}
            >
                <Marker
                    onClick = { this.onMarkerClick }
                    title = { 'Changing Colors Garage' }
                    position = {{ lat: -37.821365,
                                   lng: 144.9620743}}
                    name = { 'Changing Colors Garage' }
                />
                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow }
                >
                    <Paper>
                        <Typography
                            variant = 'headline'
                            component = 'h4'
                        >
                            Changing Colors Garage
                        </Typography>
                        <Typography
                            component = 'p'
                        >
                            98G Albe Dr Newark, DE 19702 <br />
                            302-293-8627
                        </Typography>
                    </Paper>
                </InfoWindow>
            </Map>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps)=> ({
    competitionDetail: state.competitionDetail,
    core: state.core,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
    };
};
const GoogleMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleMapsContainer);

export default GoogleApiWrapper({
        apiKey: "AIzaSyCXhtOn0IgnLwXxNr2nCQP5uLvgS3TY8og"
})(GoogleMapContainer)
