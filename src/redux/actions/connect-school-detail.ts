import { IConnectSchoolDetail } from './../models/connect-school-detail';
import { REDUX } from '../../common/const/actions';

export const getConnectSchoolDetail = (data: IConnectSchoolDetail) => ({
    type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL, 
    data
});