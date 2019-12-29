import { ISchoolDetail } from './../../models/school-detail';
import {REDUX} from '../../const/actions';

let initState: ISchoolDetail = {};

export const SchoolsDetail = (state: ISchoolDetail = initState, action: any): ISchoolDetail => {
    switch (action.type) {
        case REDUX.CONNECT_SCHOOL.GET_SCHOOL_DETAIL:
            return {
                ...action.data
            };

        default:
            return state;
    }
};