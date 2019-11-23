import { IEmBranches } from '../models/em-branches';
import { POST } from '../../common/const/method';
import { EM_BRANCHES } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListEmBranchesData(action: any) {
    let res = yield call(callEmBranches, action);
    let data: IEmBranches = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res.code === 200) {
        console.log(res.data)
        data = res.data;
        yield put({
            type: REDUX.EM_BRANCHES.GET_EM_BRANCHES,
            data
        });
    };
};

function callEmBranches(action: any) {
    let body = {};
    if (action.body) {
        body = action.body
    };

    return _requestToServer(
        POST,
        EM_BRANCHES,
        body,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10
        },
        undefined,
        EMPLOYER_HOST,
    );
};

export function* EmBranchesWatcher() {
    yield takeEvery(
        REDUX_SAGA.EM_BRANCHES.GET,
        getListEmBranchesData
    );
};