import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import './Map.scss';
import { connect } from 'react-redux';
import GeoCode from 'react-geocode';
import { REDUX } from '../../../../common/const/actions';
import { IAppState } from '../../../../redux/store/reducer';
import { IMapState } from '../../../../redux/models/mutil-box';

interface IMapContainerState {
    showingInfoWindow: boolean,
    activeMarker: any,
    selectedPlace: any,
    marker: {
        lat?: number, lng: number
    },
    location: string,
}

interface IMapContainerProps extends StateProps, DispatchProps {
    setMapState: Function;
    onChange: Function;
}

class MapContainer extends React.PureComponent<IMapContainerProps, IMapContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
            marker: {
                lat: 0, lng: 0
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
                localStorage.setItem('lat', lat);
                localStorage.setItem('lon', lng);
                this.setState({ location, marker });
                this.props.setMapState({ marker, location });
            },

            error => {
                console.error(error);
            }
        )
    }

    render() {
        let { showingInfoWindow, activeMarker } = this.state;
        let { mapState } = this.props;
        let { marker } = mapState;
        let { location } = mapState;
        return (
            <Map className='map-wraper'
                google={window["google"]}
                initialCenter={mapState.marker}
                zoom={15}
                onClick={this._setMapState}
            >
                <Marker
                    onClick={this._onMarkerClick}
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
    setMapState: (mapState: IMapState) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, mapState })
});

type StateProps = ReturnType<typeof mapStateTopProps>;
type DispatchProps = ReturnType<typeof mapStateTopProps>;

export default connect(mapStateTopProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28'
})(MapContainer))