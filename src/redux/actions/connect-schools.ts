import { IFindCandidates } from '././../../models/find-candidates';
import { REDUX } from '../../const/actions';

export const getConnectSchoolDetail = (data?: IFindCandidates) => ({
    type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL, 
    data
});