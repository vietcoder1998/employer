import {IApplyJobs} from '../models/apply-job';
import {REDUX} from '../../common/const/actions';

let initState: IApplyJobs = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const ApplyJobs = (state: IApplyJobs = initState, action: any): IApplyJobs => {
    switch (action.type) {
        case REDUX.APPLY_JOB.GET_APPLY_JOB:
            return {
                ...state,
                items: action.data.items,
                pageIndex: action.data.pageIndex,
                pageSize: action.data.pageSize,
                totalItems: action.data.totalItems
            };

        default:
            return state;
    }
};