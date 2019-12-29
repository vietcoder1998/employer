import {IAnnouncements} from './../../models/announcements';
import {REDUX} from '../../const/actions';

let initState: IAnnouncements = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const Announcements = (state: IAnnouncements = initState, action: any): IAnnouncements => {
    switch (action.type) {
        case REDUX.ANNOUNCEMENTS.GET_ANNOUNCEMENTS:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};