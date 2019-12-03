import { IApplyJobs } from './../models/apply-job';
import { REDUX } from '../../common/const/actions';

export const getAnnouncementDetail = (data: IApplyJobs) => ({
    type: REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES, 
    data
});