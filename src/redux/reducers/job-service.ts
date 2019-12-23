import { REDUX } from './../../const/actions';
import { IJobService } from './../models/job-service';

let initState: IJobService = {
    nomalQuantity: 0,
    homeInDayQuantity: 0,
    homeTopQuantiy: 0,
    searchHighLightQuantity: 0,
    unlockProfileQuantity: 0,
}

export const JobService = (state: IJobService = initState, action: any): IJobService => {
    switch (action.type) {
        case REDUX.JOB_SERVICE.GET_JOB_SERVICE:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};