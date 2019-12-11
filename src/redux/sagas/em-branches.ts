import { IEmBranchesFilter } from './../models/em-branches';
import { IEmBranches } from '../models/em-branches';
import { POST } from '../../common/const/method';
import { EM_BRANCHES_API } from '../../services/api/private.api';
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

    if (res) {
        data = res.data;
    };

    yield put({
        type: REDUX.EM_BRANCHES.GET_EM_BRANCHES,
        data
    });
};

function callEmBranches(action: any) {
    let body: IEmBranchesFilter = {
        headquarters: null,
        regionID: null
    };

    if (action.body) {
        body = action.body
    };

    try {
        let res = _requestToServer(
            POST,
            EM_BRANCHES_API + '/query',
            body,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0
            },
            undefined,
            EMPLOYER_HOST,
            false,
            false
        );

        return res;
    } catch (error) {
        return
    }

    return 
};

export function* EmBranchesWatcher() {
    yield takeEvery(
        REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES,
        getListEmBranchesData
    );
};