import { GET } from './../../const/method';
import { PENDING_JOBS } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { IPendingJobs } from "../models/pending-jobs";
import { EMPLOYER_HOST } from '../../environment/dev';


function* getListPendingJobsData(action: any) {
    let res = yield call(callPendingJobs, action);
    let data: IPendingJobs = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.PENDING_JOBS.GET_PENDING_JOBS,
        data
    });
}

function callPendingJobs(action: any) {
    try {
        let res = _requestToServer(
            GET, PENDING_JOBS,
            undefined,
            {
                pageIndex: action.body.pageIndex,
                pageSize: action.body.pageSize
            },
            undefined, EMPLOYER_HOST, false, false
        );

        return res;
    } catch (error) {
        throw error
    }
}

export function* PendingJobsWatcher() {
    yield takeEvery(
        REDUX_SAGA.PENDING_JOBS.GET_PENDING_JOBS,
        getListPendingJobsData
    )
}