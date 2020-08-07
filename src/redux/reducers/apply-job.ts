import { REDUX } from '../../const/actions';
import update from 'react-addons-update';

let initState = {
    items: [],
    listAccepted: [],
    listPending: [],
    listRejected: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const ApplyJobs = (state = initState, action: any) => {
    switch (action.type) {
        case REDUX.APPLY_JOB.GET_APPLY_JOB:
            let listAccepted = [];
            let listPending = [];
            let listRejected = [];
            action.data.items.forEach((item) => {
                switch (item.state) {
                    case 'ACCEPTED':
                        listAccepted.push(item);
                        break;
                    case 'PENDING':
                        listPending.push(item);
                        break;
                    case 'REJECTED':
                        listRejected.push(item);
                        break;
                    default:
                        break;
                }
            })
            return update(state, {
                listAccepted: {
                    $set: listAccepted
                },
                listPending: {
                    $set: listPending
                },
                listRejected: {
                    $set: listRejected
                },
                items: { $set: action.data.items },
                pageIndex: { $set: action.data.pageIndex },
                pageSize: { $set: action.data.pageSize },
                totalItems: { $set: action.data.totalItems }
            })

        default:
            return state;
    }
};