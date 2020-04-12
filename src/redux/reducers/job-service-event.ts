import { REDUX } from '../../const/actions';
import { IJobServiceEvent } from '../../models/job-service-event';

let initState: IJobServiceEvent = {
    nomalQuantity: 0,
    homeInDayQuantity: 0,
    homeTopQuantiy: 0,
}

export const JobServiceEvent = (state: IJobServiceEvent = initState, action: any): IJobServiceEvent => {
    switch (action.type) {
        case REDUX.EVENT_SCHOOLS.GET_EVENT_JOB_SERVICE:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};