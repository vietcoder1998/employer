import { IAnnouTypes } from './../models/annou-types';
import {REDUX} from '../../common/const/actions';

let initState: IAnnouTypes = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const AnnouTypes = (state = initState, action: any) => {
    switch (action.type) {
        case REDUX.ANNOU_TYPES.GET_ANNOU_TYPES:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};