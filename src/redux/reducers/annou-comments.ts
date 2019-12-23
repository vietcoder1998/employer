import { IAnnouComments } from './../models/annou-comments';
import {REDUX} from '../../const/actions';

let initState: IAnnouComments = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const AnnouComments = (state = initState, action: any) => {
    switch (action.type) {
        case REDUX.ANNOU_COMMENTS.GET_ANNOU_COMMENTS:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};