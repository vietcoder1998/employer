import { IJobSuitableCandidates } from '../../models/job-suitable-candidate';
import { REDUX } from '../../const/actions';

let initState: IJobSuitableCandidates = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    loading: true
}

export const JobSuitableCandidates = (state: IJobSuitableCandidates = initState, action: any): IJobSuitableCandidates => {
    switch (action.type) {
        case REDUX.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE:
            return {
                ...action.data,
            }
        case REDUX.JOB_SUITABLE_CANDIDATE.LOADING_JOB_SUITABLE_CANDIDATE:
                return {
                    ...state, loading: action.loading
                }
        default:
            return state;
    }
}