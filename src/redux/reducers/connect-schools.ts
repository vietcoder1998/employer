import {IConnectSchools} from '../models/connect-schools';
import {REDUX} from '../../common/const/actions';

let initState: IConnectSchools = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const ConnectSchools = (state: IConnectSchools = initState, action: any): IConnectSchools => {
    switch (action.type) {
        case REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL:
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