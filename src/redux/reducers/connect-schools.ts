import {IConnectSchools} from './../../models/connect-schools';
import {REDUX} from '../../const/actions';

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
                ...action.data
            };

        default:
            return state;
    }
};