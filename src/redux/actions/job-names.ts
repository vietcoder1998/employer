import {IJobNames} from '../models/job-names';
import {REDUX} from '../../common/const/actions';

export const getJobName = (data?: IJobNames) => ({
    type: REDUX.JOB_NAMES.GET_JOB_NAMES,
    data
});

export const getSingleJobName = (data?: any) => ({
    type: REDUX.JOB_NAMES.GET_SINGLE_JOB_NAME,
});