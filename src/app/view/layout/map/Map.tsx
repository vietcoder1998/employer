import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import './Map.scss';
import { connect } from 'react-redux';
import GeoCode from 'react-geocode';
import { REDUX } from '../../../../common/const/actions';
import { IAppState } from '../../../../redux/store/reducer';

interface MapContainerState {
    showingInfoWindow: boolean,
    activeMarker: any,
    selectedPlace: any,
    marker: {
        lat?: number, lng: number
    },
    location: string,
}

interface MapContainerProps extends StateProps, DispatchProps {
    setMapState: Function;
}

class MapContainer extends React.Component<MapContainerProps, MapContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
            marker: {
                lat: 120, lng: 112
            },
            location: ''
        };

    }

    componentDidMount() {
        GeoCode.setApiKey("AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28")
    }

    _onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    _setMapState = (t, map, coord) => {
        const { latLng } = coord;
        let { marker } = this.state;
        const lat = latLng.lat();
        const lng = latLng.lng();
        marker.lat = lat;
        marker.lng = lng;
        GeoCode.fromLatLng(marker.lat, marker.lng).then(
            response => {
                let { location } = this.state;
                location = response.results[0].formatted_address;
                localStorage.setItem('location', location);
                this.setState({ location, marker });
                this.props.setMapState(marker, location);
            },

            error => {
                console.error(error);
            }
        )
    }

    render() {
        let { marker, location, showingInfoWindow, activeMarker } = this.state;
        let { mapState } = this.props;
        console.log(mapState.marker);
        return (
            <Map className='map-wraper'
                google={window["google"]}
                initialCenter={mapState.marker}
                zoom={15}
                onClick={this._setMapState}
            >
                <Marker onClick={this._onMarkerClick}
                    name={location}
                    position={{ lat: marker.lat, lng: marker.lng }}
                />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}>
                    <div>
                        <h5>{this.state.selectedPlace.name}</h5>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

const mapStateTopProps = (state: IAppState) => ({
    mapState: state.MutilBox.mapState
})

const mapDispatchToProps = dispatch => ({
    setMapState: (marker, location) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, marker, location })
});

type StateProps = ReturnType<typeof mapStateTopProps>;
type DispatchProps = ReturnType<typeof mapStateTopProps>;

export default connect(mapStateTopProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28'
})(MapContainer))