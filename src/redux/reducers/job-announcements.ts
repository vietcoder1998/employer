import { IJobAnnouncements } from '../models/job-announcements';
import { REDUX } from '../../common/const/actions';

let initState: IJobAnnouncements = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
}

export const JobAnnouncements = (state: IJobAnnouncements = initState, action: any): IJobAnnouncements => {
    switch (action.type) {
        case REDUX.JOB_ANNOUNCEMENTS.GET_JOB_ANNOUNCEMENTS:
            return {
                ...state,
                items: action.data.items,
                pageIndex: action.data.pageIndex,
                pageSize: action.data.pageSize,
                totalItems: action.data.totalItems
            }

        default:
            return state;
    }
}