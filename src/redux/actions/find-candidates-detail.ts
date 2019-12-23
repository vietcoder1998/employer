import { IFindCandidateDetail } from './../models/find-candidates-detail';
import { REDUX } from '../../const/actions';

export const getFindCandidateDetail = (data?: IFindCandidateDetail) => ({
    type: REDUX.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, 
    data
});