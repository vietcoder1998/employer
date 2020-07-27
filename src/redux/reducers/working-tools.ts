import { IWorkingTools} from '../../models/working-tools';
import { REDUX } from '../../const/actions';

let initState: IWorkingTools = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
}

export const WorkingTools = (state: IWorkingTools = initState, action): IWorkingTools => {
    switch (action.type) {
        case REDUX.WORKINGTOOLS.GET_WORKINGTOOLS:
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