import { IFindCandidates } from './../models/find-candidates';
import { REDUX } from '../../common/const/actions';

export const getAnnouncementDetail = (data: IFindCandidates) => ({
    type: REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES, 
    data
});