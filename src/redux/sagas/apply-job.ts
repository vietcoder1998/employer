import { IApplyJobs } from '../models/apply-job';
import { POST } from '../../common/const/method';
import { APPLY_JOB } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListApplyJobsData(action: any) {
    let res = yield call(callApplyJobs, action);

    let data: IApplyJobs = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res.code === 200) {
        data.items = res.data.items;
        data.pageIndex = res.data.pageIndex;
        data.pageSize = res.data.pageSize;
        data.totalItems = res.data.totalItems;
        yield put({
            type: REDUX.APPLY_JOB.GET_APPLY_JOB,
            data
        });
    }
}

function callApplyJobs(action: any) {
    if (action.id) {
        return _requestToServer(
            POST,
            APPLY_JOB  + action.id ? `/${action.id}/apply/candicates` : undefined,
            action.body ? action.body : null,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 10
            },
            undefined,
            EMPLOYER_HOST,
            undefined,
            false
        )
    }
}

export function* ApplyJobsWatcher() {
    yield takeEvery(
        REDUX_SAGA.APPLY_JOB.GET_APPLY_JOB,
        getListApplyJobsData
    )
}