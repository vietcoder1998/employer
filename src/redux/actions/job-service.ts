import { IJobService } from './../models/job-service';
import { REDUX } from './../../common/const/actions';
export const getListJobService = (data: IJobService) =>({type: REDUX.JOB_SERVICE.GET_JOB_SERVICE})