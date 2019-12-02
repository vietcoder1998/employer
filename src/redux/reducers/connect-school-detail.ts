import { IConnectSchoolDetail } from './../models/connect-school-detail';
import {REDUX} from '../../common/const/actions';

let initState: IConnectSchoolDetail = {};

export const ConnectSchoolsDetail = (state: IConnectSchoolDetail = initState, action: any): IConnectSchoolDetail => {
    switch (action.type) {
        case REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL:
            return {
                ...action.state
            };

        default:
            return state;
    }
};