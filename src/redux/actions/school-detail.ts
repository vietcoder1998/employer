import { ISchoolDetail } from './../../models/school-detail';
import { REDUX } from '../../const/actions';

export const getSchoolDetail = (data?: ISchoolDetail) => ({
    type: REDUX.CONNECT_SCHOOL.GET_SCHOOL_DETAIL, 
    data
});