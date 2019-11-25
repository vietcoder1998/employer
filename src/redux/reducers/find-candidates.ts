import {IFindCandidates} from '../models/find-candidates';
import {REDUX} from '../../common/const/actions';

let initState: IFindCandidates = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const FindCandidates = (state: IFindCandidates = initState, action: any): IFindCandidates => {
    switch (action.type) {
        case REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES:
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