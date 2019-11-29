import { REDUX } from './../../common/const/actions';
import { TYPE } from './../../common/const/type';
let initState = {
    open: false,
    open_modal: false,
    title: "",
    type_modal: "",
    children: "",
    msg: "",
    mapState: {
        marker: {
            lat: 21.038693,
            lng: 105.782235,
        },
        location: null
    }

};

export const MutilBox = (state: typeof initState = initState, action: any) => {
    switch (action.type) {
        case TYPE.HANDLE:
            return {
                ...state,
                open: !state.open
            };

        case TYPE.OPEN:
            return {
                ...state,
                msg: action.msg,
                open_modal: !state.open_modal,
                type_modal: action.type_modal,
                title: action.title,
                children: action.children
            };

        case REDUX.MAP.SET_MAP_STATE:
            return {
                ...state,
                mapState: {
                    marker: action.marker,
                    location: action.location
                }
            };

        default:
            return state;
    }
}