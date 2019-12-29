import {IRatings} from './../../models/ratings';
import {REDUX} from '../../const/actions';

let initState: IRatings = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const Ratings = (state: IRatings = initState, action: any): IRatings => {
    switch (action.type) {
        case REDUX.LIST_RATE.GET_LIST_RATE:
            return {
                ...state,
                items: action.data.items,
                pageIndex: action.data.pageIndex,
                pageSize: action.data.pageSize,
                totalItems: action.data.totalItems
            };

        default:
            return state;
    }
};