import { IPendingJobs } from './../models/annoucements';
import { POST } from './../../common/const/method';
import { PENDING_JOBS_API } from './../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';


function* getListPendingJobsData(action) {
    let res = yield call(callPendingJobs, action);

    let data: IPendingJobs = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    }

    if (res.code === 200) {
        data = res.data
        yield put({
            type: REDUX.PENDING_JOBS.GET_PENDING_JOBS,
            data
        });
    }
}

function callPendingJobs(action) {

    return _requestToServer(
        POST,
        PENDING_JOBS_API,
        action.body ? action.body : null,
        {

            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10
        },
        undefined,
        EMPLOYER_HOST,
    )
}

export function* PendingJobsWatcher() {
    yield takeEvery(
        REDUX_SAGA.PENDING_JOBS.GET_PENDING_JOBS,
        getListPendingJobsData
    )
}