import { IApplyJobs } from './../models/apply-job';
import { REDUX } from '../../const/actions';

export const getAnnouncementDetail = (data?: IApplyJobs) => ({
    type: REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES, 
    data
});