import { IJobSuitableCandidates } from '../../models/job-suitable-candidate';
import { POST } from '../../const/method';
import { ADMIN_ACCOUNT } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListJobSuitableCandidatesData(action: any) {
    let res = yield call(callJobSuitableCandidates, action);
    let data: IJobSuitableCandidates = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res.code === 200) {
        data = res.data;
    };

    yield put({
        type: REDUX.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE,
        data
    });
};

function callJobSuitableCandidates(action: any) {
    try {
        let jid = '';

        if (action.jid) {
            jid = action.jid
        };

        let res = _requestToServer(
            POST,
            ADMIN_ACCOUNT + `/${jid}/candidates/recommended`,
            action.body ? action.body : {},
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 10
            },
            undefined,
            EMPLOYER_HOST,
            undefined,
            false,
            false
        );
        return res
    } catch (error) {
        throw error;
    }

};

export function* JobSuitableCandidatesWatcher() {
    yield takeEvery(
        REDUX_SAGA.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE,
        getListJobSuitableCandidatesData
    );
};