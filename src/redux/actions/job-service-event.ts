import { IJobServiceEvent } from '../../models/job-service-event';
import { REDUX } from '../../const/actions';
export const getJobServiceEvent = (data?: IJobServiceEvent) =>
    ({ type: REDUX.EVENT_SCHOOLS.GET_EVENT_JOB_SERVICE, data })