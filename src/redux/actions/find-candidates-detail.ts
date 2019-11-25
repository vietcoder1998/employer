import { IFindCandidateDetail } from './../models/find-candidates-detail';
import { REDUX } from '../../common/const/actions';

export const getAnnouncementDetail = (data: IFindCandidateDetail) => ({
    type: REDUX.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, 
    data
});