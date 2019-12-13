import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { CSSProperties } from 'react';
import './Map.scss';
import { connect } from 'react-redux';
import GeoCode from 'react-geocode';
import { REDUX } from '../../../../common/const/actions';
import { IAppState } from '../../../../redux/store/reducer';
import { IMapState } from '../../../../redux/models/mutil-box';
import mapConvert from '../../../../common/utils/map-convert';

GeoCode.setApiKey("AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28");

const dfStyle: CSSProperties = {
    width: 300,
    height: 300,
}

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
    style?: CSSProperties;
    disabled?: boolean;
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

    _onMarkerClick = (props, marker, e) => {
        if (!this.props.disabled) {
            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            });
        }
    }

    _setMapState = (t, map, coord) => {
        if (!this.props.disabled) {
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
    }

    getData = (event: string) => {
        mapConvert(event, 'AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28');
    }

    render() {
        let { showingInfoWindow, activeMarker } = this.state;
        let { mapState, style } = this.props;
        let { marker } = mapState;
        let { location } = mapState;
        return (
            <>
                {/* <Input onChange={(event: any) => this.getData(event.target.value)} /> */}
                <div className='map-wraper' style={style ? style : dfStyle} >
                    <Map
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
                </div >
            </>

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
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
        ? process.env.REACT_APP_GOOGLE_API_KEY :
        'AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28',
})(MapContainer))