import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { CSSProperties } from 'react';
import './Map.scss';
import { connect } from 'react-redux';
import GeoCode from 'react-geocode';
import { REDUX } from '../../../../const/actions';
import { IAppState } from '../../../../redux/store/reducer';
import { IMapState } from '../../../../models/mutil-box';
import Autocomplete from 'react-google-autocomplete';
import IApiMap from '../../../../models/google-map-api';
import { notification, Form } from 'antd';

GeoCode.setApiKey("AIzaSyDAC_NI2xITI6n6hky-5CAiemtWYCsrO28");

const dfStyle: CSSProperties = {
    width: '550px',
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
    opensearch?: string;
    disableMarker?: boolean;
    onChange: Function;
    setMapState: (mapState?: IMapState) => any;
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
                    this.setState({ location, marker });
                    this.props.setMapState({ marker, location });
                },

                error => {
                    console.error(error);
                }
            )
        }
    }

    render() {
        let { showingInfoWindow, activeMarker } = this.state;
        let { mapState, style, opensearch, disableMarker } = this.props;
        let { marker } = mapState;
        let { location } = mapState;
        return (
            <>
           
                <Autocomplete
                    style={{
                        width: '100%',
                        margin: '10px 0px',
                        display: opensearch ? 'block' : 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: '1px solid #e5e5e5'

                    }}
                    placeholder={'Nhập địa chỉ tìm kiếm'}
                    onPlaceSelected={(place?: IApiMap) => {
                        try {
                           place.geometry ?
                            this.props.setMapState({
                                location: place.formatted_address,
                                marker: {
                                    lat: place.geometry.location.lat(),
                                    lng: place.geometry.location.lng(),
                                }
                            }) : notification.warning({message: "Google Map thông báo", description: "We take your address"}); 
                        } catch(err) {
                            throw err
                        }
                        
                    }}
                    types={['geocode']}
                    componentRestrictions={{ country: "vn" }}
                />
               
                <div className='map-wraper' style={style ? style : dfStyle} >
                    <Map
                        google={window["google"]}
                        initialCenter={mapState.marker}
                        center={mapState.marker}
                        zoom={15}
                        onClick={disableMarker ? null : this._setMapState}
                    >
                        <Marker
                            onClick={disableMarker ? null : this._onMarkerClick}
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
})(MapContainer))