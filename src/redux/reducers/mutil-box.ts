import { TYPE } from './../../common/const/type';
import { IMutilBox } from './../models/mutil-box';
import { REDUX } from './../../common/const/actions';

let initState: IMutilBox = {
    drawerState: {
        title: "",
        open_drawer: false,
        children: null,
        type_drawer: null,
    },
    modalState: {
        title: null,
        msg: null,
        open_modal: false,
        type_modal: null,
        children: null,
    },
    mapState: {
        marker: {
            lat: 21.038693,
            lng: 105.782235,
        },
        location: "Hà Nội"
    },
    loading: false,
};

export const MutilBox = (state: typeof initState = initState, action: any) => {
    switch (action.type) {
        case REDUX.HANDLE_DRAWER:
            return {
                ...state,
                drawerState: {
                    open_drawer:
                        action.drawerState &&
                            action.drawerState.open_drawer ?
                            action.drawerState.open_drawer :
                            !state.drawerState.open_drawer
                },
            };

        case REDUX.HANDLE_MODAL:
            return {
                ...state,
                modalState: {
                    open_modal:
                        action.modalState &&
                            action.modalState.open_modal ?
                            action.modalState.open_modal :
                            !state.modalState.open_modal,

                    msg:
                        action.modalState &&
                            action.modalState.msg ?
                            action.modalState.msg :
                            "",
                    type_modal: action.modalState && action.modalState.type_modal
                },
            };

        case REDUX.MAP.SET_MAP_STATE:
            localStorage.setItem("location", action.mapState.location)
            localStorage.setItem("lat", action.mapState.marker.lat)
            localStorage.setItem("lon", action.mapState.marker.lng);
            return {
                ...state,
                mapState: {
                    ...action.mapState,
                    marker:
                        action.mapState &&
                            action.mapState.marker ?
                            action.mapState.marker :
                            {
                                lat: 21.038693,
                                lng: 105.782235,
                            }
                }
            };

        case TYPE.HANDLE:
            return {
                ...state,
                loading: action.loading
            }

        default:
            return state;
    }
}