import { REDUX } from '../../const/actions';
import { ISchoolBranches } from '../../models/school-branches';

let initState: ISchoolBranches = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
}

export const SchoolBranches = (state: ISchoolBranches = initState, action): ISchoolBranches => {
    switch (action.type) {
        case REDUX.CONNECT_SCHOOL.GET_SCHOOL_BRANCHES:
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