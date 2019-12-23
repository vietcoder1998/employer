import {INotis} from '../models/notis';
import {REDUX} from '../../const/actions';

let initState: INotis = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const Notis = (state: INotis = initState, action: any): INotis => {
    switch (action.type) {
        case REDUX.NOTI.GET_NOTI:
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