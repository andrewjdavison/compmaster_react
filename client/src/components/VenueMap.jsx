import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const LoadingContainer = (props) => (
    <div>Loading Container</div>

);

const style= {
    width: '100%',
    height: '100%',
};


export class MapElement extends Component{
    render(){
        let compData = this.props.competitionDetail.competition;

        return (
            <Map
                google={this.props.google}
                style={style}
                zoom={14}
                center={{
                    lat: compData.lat,
                    lng: compData.lng
                }}
            >
                <Marker
                    position={{
                        lat: compData.lat,
                        lng: compData.lng
                    }}
                />
            </Map>
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

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapElement);

export default GoogleApiWrapper({
    apiKey: "AIzaSyCXhtOn0IgnLwXxNr2nCQP5uLvgS3TY8og",
})(MapContainer);


