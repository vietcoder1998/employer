import { IApplyJobs } from '../models/apply-job';
import { APPLY_JOB } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';
import { GET } from './../../common/const/method';

function* getListApplyJobsData(action: any) {
    let res = yield call(callApplyJobs, action);

    let data: IApplyJobs = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.APPLY_JOB.GET_APPLY_JOB,
        data
    });
}

function callApplyJobs(action: any) {
    if (action.id) {
        try {
            let res = _requestToServer(
                GET,
                APPLY_JOB + (action.id ? `/${action.id}/apply/candidates` : undefined),
                {
                    state: action.body ? action.body : null,
                },
                {
                    pageIndex: action.pageIndex ? action.pageIndex : 0,
                    pageSize: action.pageSize ? action.pageSize : 10
                },
                undefined,
                EMPLOYER_HOST,
                false,
                false,
            )

            return res
        } catch (e) {
            throw e
        }
    }

}

export function* ApplyJobsWatcher() {
    yield takeEvery(
        REDUX_SAGA.APPLY_JOB.GET_APPLY_JOB,
        getListApplyJobsData
    )
}