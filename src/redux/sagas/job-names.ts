import { noInfoHeader } from './../../services/auth';
import { JOB_NAMES } from './../../services/api/public.api';
import { IJobNames } from './../../models/job-names';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';

function* getListJobNameData(action: any) {
    let res = yield call(callJobName, action);
    let data: IJobNames = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.JOB_NAMES.GET_JOB_NAMES,
        data
    });
}

function callJobName(action: any) {
    try {
        let res = _requestToServer(
            GET,
            JOB_NAMES,
            null,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0,
            },
            noInfoHeader,
            PUBLIC_HOST,
            false,
            false
        )
        return res

    } catch (error) {
        throw error;
    }
}

export function* JobNameWatcher() {
    yield takeEvery(
        REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES,
        getListJobNameData
    )
}